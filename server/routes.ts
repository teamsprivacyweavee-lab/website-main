import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertInquirySchema, insertJobApplicationSchema, insertChatConversationSchema, insertChatMessageSchema } from "@shared/schema";
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import {
  sendInquiryEmail,
  sendJobApplicationEmail,
  sendTestEmail,
  getEmailConfig,
  sendInquiryConfirmationEmail, // <-- add
  sendJobApplicationConfirmationEmail // <-- add
} from './services/email';
import {
  isWhatsAppConfigured,
  sendInquiryWhatsAppNotification,
  sendJobApplicationWhatsAppNotification,
  sendTestWhatsAppMessage
} from './services/whatsapp';
import multer from 'multer';

// Cookie consent logging interface
interface CookieConsentLog {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  timestamp: number;
  expiresAt: number;
  userAgent: string;
  ipAddress: string;
  referrer: string;
  url: string;
}

// Get the directory path in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed'));
    }
  }
});

// Middleware to check if user is authenticated and is an admin
const isAdmin = (req: Request, res: Response, next: any) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden' });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Email test route (admin-only)
  app.post('/api/admin/test-email', isAdmin, async (req, res, next) => {
    try {
      const { emailType } = req.body;

      if (emailType !== 'inquiry' && emailType !== 'job-application') {
        return res.status(400).json({
          success: false,
          message: 'Invalid email type. Use "inquiry" or "job-application".'
        });
      }

      const result = await sendTestEmail(emailType);

      res.json({
        success: result,
        message: result
          ? 'Test email sent successfully'
          : 'Failed to send test email. Check server logs for details.'
      });
    } catch (error) {
      next(error);
    }
  });

  // Email configuration status route (admin-only)
  app.get('/api/admin/email-config', isAdmin, (req, res) => {
    res.json(getEmailConfig());
  });

  // WhatsApp configuration status route (admin-only)
  app.get('/api/admin/whatsapp-config', isAdmin, (req, res) => {
    const requiredEnvVars = [
      'TWILIO_ACCOUNT_SID',
      'TWILIO_AUTH_TOKEN',
      'TWILIO_PHONE_NUMBER',
      'WHATSAPP_RECIPIENT_NUMBER'
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

    res.json({
      configured: isWhatsAppConfigured(),
      accountSid: process.env.TWILIO_ACCOUNT_SID || '',
      phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
      recipientNumber: process.env.WHATSAPP_RECIPIENT_NUMBER || '',
      missingVariables: missingVars
    });
  });

  // WhatsApp test route (admin-only)
  app.post('/api/admin/test-whatsapp', isAdmin, async (req, res, next) => {
    try {
      const result = await sendTestWhatsAppMessage();

      res.json({
        success: result,
        message: result
          ? 'Test WhatsApp message sent successfully'
          : 'Failed to send test WhatsApp message. Check server logs for details.'
      });
    } catch (error) {
      next(error);
    }
  });

  // Client Inquiry Endpoints
  app.post('/api/inquiries', async (req, res, next) => {
    try {
      // Validate request body
      const validatedData = insertInquirySchema.parse(req.body);

      // Create inquiry
      const inquiry = await storage.createInquiry(validatedData);

      // Send email notification
      let emailSent = false;
      try {
        emailSent = await sendInquiryEmail(inquiry);
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Continue with the response even if email fails
      }
      // Send confirmation email to the user (do not block response)
      try {
        await sendInquiryConfirmationEmail(inquiry.email, inquiry.firstName);
      } catch (confirmationError) {
        console.error('Failed to send confirmation email to user:', confirmationError);
      }

      // Send WhatsApp notification
      let whatsappSent = false;
      try {
        whatsappSent = await sendInquiryWhatsAppNotification(inquiry);
      } catch (whatsappError) {
        console.error('Failed to send WhatsApp notification for inquiry:', whatsappError);
        // Continue with the response even if WhatsApp fails
      }

      // Add the notification statuses to the response
      res.status(201).json({
        ...inquiry,
        _meta: {
          emailNotificationSent: emailSent,
          whatsappNotificationSent: whatsappSent
        }
      });
    } catch (error) {
      next(error);
    }
  });

  // Job Application Endpoints
  app.post('/api/job-applications', async (req, res, next) => {
    try {
      // Prepare application data. Frontend already sends 'resumePath'.
      const applicationData = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        position: req.body.position,
        experience: req.body.experience,
        message: req.body.message,
        resumePath: req.body.resumePath, // <--- CORRECTED: Use resumePath from request body
        applicationType: req.body.applicationType || 'job', // Default to 'job'
      };

      // Validate the data using your Zod schema (insertJobApplicationSchema expects 'resumePath')
      const validatedData = insertJobApplicationSchema.parse(applicationData);

      // Save the validated data in DB using your storage abstraction
      const jobApplication = await storage.createJobApplication(validatedData);

      // Send email notification - catch errors but don't fail the request
      let emailSent = false;
      try {
        // Pass jobApplication which includes the resumePath to the email service
        emailSent = await sendJobApplicationEmail(jobApplication);
      } catch (emailError) {
        console.error('Failed to send job application email notification:', emailError);
      }
      // Send confirmation email to the applicant (do not block response)
      try {
        await sendJobApplicationConfirmationEmail(jobApplication.email, jobApplication.fullName?.split(' ')[0]);
      } catch (confirmationError) {
        console.error('Failed to send confirmation email to applicant:', confirmationError);
      }

      // Send WhatsApp notification - catch errors similarly
      let whatsappSent = false;
      try {
        // Pass jobApplication.resumePath (which is the link) to WhatsApp notification
        whatsappSent = await sendJobApplicationWhatsAppNotification(jobApplication, jobApplication.resumePath || "No resume link provided");
      } catch (whatsappError) {
        console.error('Failed to send WhatsApp notification for job application:', whatsappError);
      }

      // Respond with saved data + notification statuses
      res.status(201).json({
        ...jobApplication,
        _meta: {
          emailNotificationSent: emailSent,
          whatsappNotificationSent: whatsappSent,
        },
      });
    } catch (error) {
      next(error); // Pass errors to your error handling middleware
    }
  });

  // Job Listings Endpoints
  app.get('/api/job-listings', async (req, res, next) => {
    try {
      const jobListings = await storage.getActiveJobListings();
      res.json(jobListings);
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/job-listings/:id', async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const jobListing = await storage.getJobListing(id);

      if (!jobListing) {
        return res.status(404).json({ message: 'Job listing not found' });
      }

      res.json(jobListing);
    } catch (error) {
      next(error);
    }
  });

  // Admin Endpoints - protected by isAdmin middleware
  app.get('/api/admin/inquiries', isAdmin, async (req, res, next) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json(inquiries);
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/admin/job-applications', isAdmin, async (req, res, next) => {
    try {
      const applications = await storage.getJobApplications();
      res.json(applications);
    } catch (error) {
      next(error);
    }
  });

  // Download resume file
  app.get('/api/admin/job-applications/:id/resume', isAdmin, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const application = await storage.getJobApplication(id);

      // Note: If resumePath is a URL, res.download() might not work as expected
      // for external URLs. It's typically for local file paths.
      // If it's an external link, you might want to redirect or just provide the link.
      if (!application || !application.resumePath) {
        return res.status(404).json({ message: 'Resume not found or is an external link not directly downloadable this way' });
      }

      // Assuming resumePath could be a local path for resumes uploaded via chatbot,
      // but for links, this needs careful handling.
      // If it's always an external URL from the form, perhaps return the URL:
      // return res.json({ resumeUrl: application.resumePath });
      // Or redirect:
      // return res.redirect(application.resumePath);

      // For now, keeping res.download if it's intended for future local file path storage
      res.download(application.resumePath);
    } catch (error) {
      next(error);
    }
  });

  // Chatbot API routes

  // Create or retrieve a chat conversation
  app.post('/api/chat/conversations', async (req, res, next) => {
    try {
      let { sessionId } = req.body;

      // Generate a random session ID if not provided
      if (!sessionId) {
        sessionId = `chat_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      }

      // Check if conversation with this session ID already exists
      let conversation = await storage.getChatConversationBySessionId(sessionId);

      // If not, create a new conversation
      if (!conversation) {
        const validatedData = insertChatConversationSchema.parse({
          sessionId,
          userEmail: req.body.userEmail,
          userName: req.body.userName,
          category: req.body.category || 'general',
        });

        conversation = await storage.createChatConversation(validatedData);
      }

      res.json(conversation);
    } catch (error) {
      next(error);
    }
  });

  // Get chat history for a conversation
  app.get('/api/chat/conversations/:id/messages', async (req, res, next) => {
    try {
      const conversationId = parseInt(req.params.id);
      const messages = await storage.getChatMessagesByConversationId(conversationId);
      res.json(messages);
    } catch (error) {
      next(error);
    }
  });

  // Send a message in a conversation
  app.post('/api/chat/conversations/:id/messages', upload.single('attachment'), async (req, res, next) => {
    try {
      const conversationId = parseInt(req.params.id);

      // Make sure the conversation exists
      const conversation = await storage.getChatConversation(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }

      // Prepare message data
      const messageData: {
        conversationId: number;
        sender: string;
        content: string;
        isApplicationRequest: boolean;
        metadata?: any;
        attachmentUrl?: string;
        attachmentType?: string;
      } = {
        conversationId,
        sender: req.body.sender,
        content: req.body.content,
        isApplicationRequest: req.body.isApplicationRequest === 'true',
        metadata: req.body.metadata ? JSON.parse(req.body.metadata) : undefined,
      };

      // If a file was uploaded, add its details
      if (req.file) {
        messageData.attachmentUrl = req.file.path; // This will be a local file path
        messageData.attachmentType = req.file.mimetype;
      }

      // Validate and create the message
      const validatedData = insertChatMessageSchema.parse(messageData);
      const message = await storage.createChatMessage(validatedData);

      // If this is a job application request, create a job application entry
      if (message.isApplicationRequest && message.metadata) {
        // Type guard to ensure metadata has the expected properties
        const metadata = message.metadata as Record<string, any>;

        // Convert metadata to a JobApplication format
        const applicationData = {
          fullName: metadata.fullName || conversation.userName || 'Unknown',
          email: metadata.email || conversation.userEmail || 'unknown@example.com',
          phone: metadata.phone || 'Not provided',
          position: metadata.position || 'Position via chatbot',
          experience: metadata.experience || 'Not specified',
          message: message.content,
          resumePath: message.attachmentUrl || null, // This will be the local file path if uploaded
        };

        // Create the job application
        try {
          const jobApplication = await storage.createJobApplication(applicationData);

          // Send email notification
          try {
            await sendJobApplicationEmail(jobApplication); // jobApplication.resumePath will be the local path
          } catch (emailError) {
            console.error('Failed to send job application email from chatbot:', emailError);
          }

          // Update message metadata with job application ID
          message.metadata = {
            ...message.metadata,
            jobApplicationId: jobApplication.id,
          };
        } catch (jobAppError) {
          console.error('Failed to create job application from chatbot:', jobAppError);
        }
      }

      // Update the conversation's last message timestamp
      await storage.updateChatConversation(conversationId, {
        lastMessageAt: new Date(),
      });

      // If this is from the user, generate a bot response
      if (message.sender === 'user') {
        // Process the message to determine the appropriate bot response
        // This is where we would integrate with an NLP or ML service
        // For now, we'll just provide a simple hard-coded response service
        try {
          const botResponse = await generateBotResponse(message.content, conversation);

          const botMessageData = {
            conversationId,
            sender: 'bot',
            content: botResponse,
          };

          const botMessage = await storage.createChatMessage(insertChatMessageSchema.parse(botMessageData));

          return res.status(201).json({
            userMessage: message,
            botResponse: botMessage
          });
        } catch (botError) {
          console.error('Error generating bot response:', botError);
          // Continue without bot response
        }
      }

      res.status(201).json(message);
    } catch (error) {
      // If there was an upload and an error occurred, clean up
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Error deleting uploaded file after error:", err);
        });
      }
      next(error);
    }
  });

  // Admin route to view all chat conversations
  app.get('/api/admin/chat/conversations', isAdmin, async (req, res, next) => {
    try {
      const conversations = await storage.getChatConversations(); // Assuming this method exists or will be added
      res.json(conversations);
    } catch (error) {
      next(error);
    }
  });

  // Cookie consent logging endpoint
  app.post('/api/cookie-consent', async (req, res, next) => {
    try {
      const consentData: CookieConsentLog = {
        ...req.body,
        ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
        timestamp: Date.now()
      };

      // Log the consent to console for now (you can extend this to save to database)
      console.log('Cookie consent logged:', {
        essential: consentData.essential,
        analytics: consentData.analytics,
        functional: consentData.functional,
        marketing: consentData.marketing,
        timestamp: new Date(consentData.timestamp).toISOString(),
        ipAddress: consentData.ipAddress,
        userAgent: consentData.userAgent,
        referrer: consentData.referrer,
        url: consentData.url
      });

      // TODO: Save to database if needed
      // await storage.logCookieConsent(consentData);

      res.status(200).json({
        success: true,
        message: 'Cookie consent logged successfully'
      });
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);

  // Simple chatbot response generator
  async function generateBotResponse(messageText: string, conversation: any) {
    // Convert message to lowercase for easier matching
    const lowerMessage = messageText.toLowerCase();

    // Check specifically for internship-related questions
    if (lowerMessage.includes('internship') ||
      lowerMessage.includes('intern') ||
      lowerMessage.includes('student position') ||
      lowerMessage.includes('summer job')) {

      return "We offer exciting internship opportunities for students and recent graduates! Our internship program provides hands-on experience in data privacy, AI development, and cybersecurity. Internships typically run for 3-6 months, with both summer and year-round opportunities available.\n\n" +
        "Current internship openings include:\n" +
        "- Privacy Engineering Intern\n" +
        "- Data Science Intern\n" +
        "- Marketing & Communications Intern\n\n" +
        "Would you like to apply for an internship position? I can help you submit your application right away!";
    }

    // Check for general career-related questions
    else if (lowerMessage.includes('job') ||
      lowerMessage.includes('career') ||
      lowerMessage.includes('position') ||
      lowerMessage.includes('work') ||
      lowerMessage.includes('employment') ||
      lowerMessage.includes('application')) {

      // Get active job listings
      const jobListings = await storage.getActiveJobListings();

      if (jobListings.length > 0) {
        let response = "We have several open positions at PrivacyWeave:\n\n";

        jobListings.forEach((job, index) => {
          response += `${index + 1}. ${job.title} (${job.location})\n`;
        });

        response += "\nYou can visit our careers page to apply, or I can help you submit an application right now. Would you like to apply for a position?";
        return response;
      } else {
        return "We're always looking for talented individuals to join our team! While we may not have specific positions listed right now, we'd be happy to consider your application. Would you like to submit your resume and information?";
      }
    }

    // Check for company-related questions
    else if (lowerMessage.includes('company') ||
      lowerMessage.includes('about') ||
      lowerMessage.includes('privacyweave') ||
      lowerMessage.includes('who are you')) {
      return "PrivacyWeave is a leading data privacy automation company. We specialize in AI-driven privacy solutions that help organizations protect user data, comply with regulations, and build trust. Our platform leverages advanced machine learning to automate privacy tasks, reduce compliance costs, and provide analytics for better decision-making.";
    }

    // Check for service-related questions
    else if (lowerMessage.includes('service') ||
      lowerMessage.includes('product') ||
      lowerMessage.includes('offering') ||
      lowerMessage.includes('solution') ||
      lowerMessage.includes('what do you do')) {
      return "PrivacyWeave offers a comprehensive suite of data privacy solutions:\n\n" +
        "1. Privacy Management: Automated data mapping, consent management, and privacy policy generation\n" +
        "2. AI Privacy Framework: Privacy-preserving AI development tools and compliance checks\n" +
        "3. Data Encryption: End-to-end encryption solutions for sensitive data\n" +
        "4. Compliance Automation: Automated GDPR, CCPA, and other regulatory compliance\n" +
        "5. Privacy Analytics: Insights and reporting on privacy practices\n\n" +
        "Would you like more information about any specific service?";
    }

    // Check if the user wants to apply
    else if (lowerMessage.includes('apply') ||
      lowerMessage.includes('submit') ||
      lowerMessage.includes('resume') ||
      lowerMessage.includes('cv')) {
      return "I'd be happy to help you apply! Please provide the following information:\n\n" +
        "1. Your full name\n" +
        "2. Email address\n" +
        "3. Phone number\n" +
        "4. Position you're interested in\n" +
        "5. Years of experience\n\n" +
        "You can also upload your resume or CV, and I'll make sure it gets to our hiring team.";
    }

    // Default response
    else {
      return "Thank you for reaching out to PrivacyWeave! I'm here to help with any questions about our company, services, or career opportunities. How can I assist you today?";
    }
  }

  return httpServer;
}

