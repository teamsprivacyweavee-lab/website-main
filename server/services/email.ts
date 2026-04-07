import * as nodemailer from 'nodemailer';
import { Inquiry, JobApplication } from '@shared/schema';

/**
 * Check if email is properly configured
 */
export const isEmailConfigured = (): boolean => {
  return !!(process.env.EMAIL_SERVICE &&
    process.env.EMAIL_USER &&
    process.env.EMAIL_PASSWORD);
};

/**
 * Get the current email configuration
 */
export const getEmailConfig = () => {
  const configured = isEmailConfigured();

  const recipients = getRecipients();

  return {
    configured,
    service: process.env.EMAIL_SERVICE || 'Not configured',
    user: process.env.EMAIL_USER
      ? `${process.env.EMAIL_USER.slice(0, 3)}...${process.env.EMAIL_USER.split('@')[1] || ''}`
      : 'Not configured',
    recipients,
    missingVariables: [
      !process.env.EMAIL_SERVICE && 'EMAIL_SERVICE',
      !process.env.EMAIL_USER && 'EMAIL_USER',
      !process.env.EMAIL_PASSWORD && 'EMAIL_PASSWORD'
    ].filter(Boolean) as string[]
  };
};

/**
 * Send a test email of the specified type
 */
export const sendTestEmail = async (type: 'inquiry' | 'job-application'): Promise<boolean> => {
  if (type === 'inquiry') {
    // Create a test inquiry
    const testInquiry: Inquiry = {
      id: 0,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      company: 'Test Company',
      industry: 'technology',
      message: 'This is a test email sent from the admin panel.',
      createdAt: new Date()
    };

    return await sendInquiryEmail(testInquiry);
  } else if (type === 'job-application') {
    // Create a test job application
    const testApplication: JobApplication = {
      id: 0,
      fullName: 'Test Applicant',
      email: 'test@example.com',
      phone: '+91-1234567890',
      position: 'Test Position',
      experience: '1',
      message: 'This is a test job application email sent from the admin panel.',
      resumePath: null,
      createdAt: new Date()
    };

    return await sendJobApplicationEmail(testApplication);
  }

  return false;
};

// Define proper nodemailer transport config type
interface TransportConfig {
  service?: string;
  host?: string;
  port?: number;
  secure?: boolean;
  auth: {
    user: string;
    pass: string;
  };
  tls?: {
    rejectUnauthorized: boolean;
  };
  debug?: boolean;
  logger?: boolean;
}

// Email configuration
const getTransporter = () => {
  let transporterConfig: TransportConfig;

  // Use service specific configuration based on service name
  if (process.env.EMAIL_SERVICE?.toLowerCase() === 'gmail') {
    transporterConfig = {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASSWORD || ''
      },
      // Gmail-specific options for better deliverability
      tls: {
        rejectUnauthorized: false // More lenient TLS requirements
      }
    };
  } else if (process.env.EMAIL_SERVICE?.toLowerCase() === 'outlook' ||
    process.env.EMAIL_SERVICE?.toLowerCase() === 'hotmail') {
    transporterConfig = {
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASSWORD || ''
      }
    };
  } else if (process.env.EMAIL_SERVICE?.toLowerCase() === 'yahoo') {
    transporterConfig = {
      host: 'smtp.mail.yahoo.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASSWORD || ''
      }
    };
  } else {
    // Default generic configuration
    transporterConfig = {
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASSWORD || ''
      }
    };
  }

  // Add debug options for troubleshooting
  if (process.env.NODE_ENV !== 'production') {
    transporterConfig.debug = true;
    transporterConfig.logger = true;
  }

  const transporter = nodemailer.createTransport(transporterConfig as any);

  // Show connection configuration
  if (process.env.NODE_ENV !== 'production') {
    console.log('Email configuration:');
    console.log(`- Service: ${process.env.EMAIL_SERVICE}`);
    console.log(`- User: ${process.env.EMAIL_USER}`);
    console.log(`- Password: ${process.env.EMAIL_PASSWORD ? '[PROVIDED]' : '[MISSING]'}`);

    // Log detailed configuration (excluding sensitive data)
    const safeConfig = { ...transporterConfig };
    if (safeConfig.auth) {
      safeConfig.auth = { ...safeConfig.auth, pass: '[REDACTED]' };
    }
    console.log('- Detailed config:', JSON.stringify(safeConfig, null, 2));
  }

  return transporter;
};

// Recipients list from environment variables, fallback to defaults if not specified
const defaultRecipients = ['teams@privacyweave.in'];
const getRecipients = (): string[] => {
  if (process.env.EMAIL_RECIPIENTS) {
    return process.env.EMAIL_RECIPIENTS.split(',').map(email => email.trim());
  }
  return defaultRecipients;
};

/**
 * Send email for a new inquiry/demo request
 */
export const sendInquiryEmail = async (inquiry: Inquiry): Promise<boolean> => {
  try {
    // Verify we have email credentials before attempting to send
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('Email credentials not configured, skipping notification');
      return false;
    }

    const transporter = getTransporter();

    console.log(`Attempting to send inquiry email notification for ${inquiry.company}`);

    // Create email content
    const subject = `New Demo Request: ${inquiry.company}`;
    const text = `
      New Demo Request Received:
      
      First Name: ${inquiry.firstName}
      Last Name: ${inquiry.lastName}
      Email: ${inquiry.email}
      Company: ${inquiry.company}
      Industry: ${inquiry.industry}
      
      Message:
      ${inquiry.message}
      
      Submitted on: ${new Date(inquiry.createdAt || new Date()).toLocaleString()}
    `;

    const html = `
      <h2>New Demo Request Received</h2>
      
      <p><strong>First Name:</strong> ${inquiry.firstName}</p>
      <p><strong>Last Name:</strong> ${inquiry.lastName}</p>
      <p><strong>Email:</strong> ${inquiry.email}</p>
      <p><strong>Company:</strong> ${inquiry.company}</p>
      <p><strong>Industry:</strong> ${inquiry.industry}</p>
      
      <h3>Message:</h3>
      <p>${inquiry.message.replace(/\n/g, '<br>')}</p>
      
      <p><em>Submitted on: ${new Date(inquiry.createdAt || new Date()).toLocaleString()}</em></p>
    `;

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: getRecipients().join(', '),
      subject,
      text,
      html
    });

    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending inquiry email:', error);

    // More detailed error information for debugging
    if (error instanceof Error) {
      console.error(`Error type: ${error.name}`);
      console.error(`Error message: ${error.message}`);
      console.error(`Error stack: ${error.stack}`);
    }

    return false;
  }
};

/**
 * Send email for a new job application
 */
export const sendJobApplicationEmail = async (application: JobApplication): Promise<boolean> => {
  try {
    // Verify we have email credentials before attempting to send
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('Email credentials not configured, skipping notification');
      return false;
    }

    const transporter = getTransporter();

    console.log(`Attempting to send job application email notification for ${application.position}`);

    // Create email content
    const subject = `New Career Application: ${application.position}`;
    const text = `
      New Job Application Received:
      
      Full Name: ${application.fullName}
      Email: ${application.email}
      Phone: ${application.phone}
      Position: ${application.position}
      Experience: ${application.experience} years
      
      Message:
      ${application.message || 'No cover letter provided'}
      
      Resume: ${application.resumePath ? 'Attached' : 'Not provided'}
      
      Submitted on: ${new Date(application.createdAt || new Date()).toLocaleString()}
    `;

    const html = `
      <h2>New Job Application Received</h2>
      
      <p><strong>Full Name:</strong> ${application.fullName}</p>
      <p><strong>Email:</strong> ${application.email}</p>
      <p><strong>Phone:</strong> ${application.phone}</p>
      <p><strong>Position:</strong> ${application.position}</p>
      <p><strong>Experience:</strong> ${application.experience} years</p>
      
      <h3>Cover Letter:</h3>
      <p>${application.message ? application.message.replace(/\n/g, '<br>') : 'No cover letter provided'}</p>
      
      <p><strong>Resume:</strong> ${application.resumePath ? 'Attached' : 'Not provided'}</p>
      
      <p><em>Submitted on: ${new Date(application.createdAt || new Date()).toLocaleString()}</em></p>
    `;

    // Prepare email options
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL_USER,
      to: getRecipients().join(', '),
      subject,
      text,
      html
    };

    // Add attachment if resume exists
    if (application.resumePath) {
      mailOptions.attachments = [
        {
          filename: `${application.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
          path: application.resumePath
        }
      ];
    }

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending job application email:', error);

    // More detailed error information for debugging
    if (error instanceof Error) {
      console.error(`Error type: ${error.name}`);
      console.error(`Error message: ${error.message}`);
      console.error(`Error stack: ${error.stack}`);
    }

    return false;
  }
};

/**
 * Send confirmation email to the user after submitting a contact/inquiry form
 */
export const sendInquiryConfirmationEmail = async (toEmail: string, firstName?: string) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('Email credentials not configured, skipping confirmation email');
    return false;
  }
  const transporter = getTransporter();
  const subject = 'Thanks for Requesting a Demo - PrivacyWeave';
  const text = `Hi${firstName ? ' ' + firstName : ''},\n\nThanks for requesting the demo. Our team will review it and get back to you soon.\n\nBest,\nPrivacyWeave Team`;
  const html = `<p>Hi${firstName ? ' ' + firstName : ''},</p><p>Thanks for requesting the demo. Our team will review it and get back to you soon.</p><p>Best,<br/>PrivacyWeave Team</p>`;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject,
      text,
      html,
    });
    return true;
  } catch (error) {
    console.error('Error sending inquiry confirmation email:', error);
    return false;
  }
};

/**
 * Send confirmation email to the user after submitting a job/intern application
 */
export const sendJobApplicationConfirmationEmail = async (toEmail: string, firstName?: string) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('Email credentials not configured, skipping confirmation email');
    return false;
  }
  const transporter = getTransporter();
  const subject = 'Thanks for Applying at PrivacyWeave';
  const text = `Hi${firstName ? ' ' + firstName : ''},\n\nThanks for applying at PrivacyWeave. We will review your application and get back to you soon.\n\nBest,\nPrivacyWeave Team`;
  const html = `<p>Hi${firstName ? ' ' + firstName : ''},</p><p>Thanks for applying at PrivacyWeave. We will review your application and get back to you soon.</p><p>Best,<br/>PrivacyWeave Team</p>`;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject,
      text,
      html,
    });
    return true;
  } catch (error) {
    console.error('Error sending job application confirmation email:', error);
    return false;
  }
};