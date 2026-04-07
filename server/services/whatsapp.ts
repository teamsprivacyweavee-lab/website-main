import twilio from 'twilio';
import { Inquiry, JobApplication } from '@shared/schema';
import { log } from '../vite';

/**
 * Check if WhatsApp notification service is properly configured
 */
export const isWhatsAppConfigured = (): boolean => {
  const requiredEnvVars = [
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
    'TWILIO_PHONE_NUMBER',
    'WHATSAPP_RECIPIENT_NUMBER'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    log(`WhatsApp service is not fully configured. Missing: ${missingVars.join(', ')}`, 'whatsapp');
    return false;
  }
  
  return true;
};

/**
 * Initialize the Twilio client
 */
const getTwilioClient = (): any | null => {
  if (!isWhatsAppConfigured()) {
    return null;
  }
  
  try {
    return twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );
  } catch (error) {
    log(`Error initializing Twilio client: ${(error as Error).message}`, 'whatsapp');
    return null;
  }
};

/**
 * Send a WhatsApp message for a new inquiry
 */
export const sendInquiryWhatsAppNotification = async (inquiry: Inquiry): Promise<boolean> => {
  if (!isWhatsAppConfigured()) {
    log('WhatsApp notification not sent: service not configured', 'whatsapp');
    return false;
  }
  
  const client = getTwilioClient();
  if (!client) return false;
  
  try {
    const message = await client.messages.create({
      body: `*New Inquiry/Demo Request*\n\n*Name:* ${inquiry.firstName} ${inquiry.lastName}\n*Company:* ${inquiry.company}\n*Email:* ${inquiry.email}\n*Message:* ${inquiry.message}`,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${process.env.WHATSAPP_RECIPIENT_NUMBER}`
    });
    
    log(`WhatsApp notification sent for inquiry: ${message.sid}`, 'whatsapp');
    return true;
  } catch (error) {
    log(`Error sending WhatsApp notification for inquiry: ${(error as Error).message}`, 'whatsapp');
    return false;
  }
};

/**
 * Send a WhatsApp message for a new job application
 */
export const sendJobApplicationWhatsAppNotification = async (application: JobApplication, resumeUrl?: string): Promise<boolean> => {
  if (!isWhatsAppConfigured()) {
    log('WhatsApp notification not sent: service not configured', 'whatsapp');
    return false;
  }
  
  const client = getTwilioClient();
  if (!client) return false;
  
  try {
    // Create message body
    let messageBody = `*New ${application.applicationType === 'internship' ? 'Internship' : 'Job'} Application*\n\n*Name:* ${application.fullName}\n*Position:* ${application.position}\n*Email:* ${application.email}\n*Phone:* ${application.phone}\n*Experience:* ${application.experience}`;
    
    // Add education details for internship applications
    if (application.applicationType === 'internship' && 'education' in application) {
      messageBody += `\n*Education:* ${(application as any).education}`;
      messageBody += `\n*University:* ${(application as any).university}`;
      messageBody += `\n*Graduation Year:* ${(application as any).graduationYear}`;
      messageBody += `\n*Availability:* ${(application as any).availabilityDate}`;
    }
    
    // Add message if provided
    if (application.message) {
      messageBody += `\n\n*Message:*\n${application.message}`;
    }
    
    // Add resume link if available
    if (resumeUrl) {
      messageBody += `\n\n*Resume Link:* ${resumeUrl}`;
    }
    
    const message = await client.messages.create({
      body: messageBody,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${process.env.WHATSAPP_RECIPIENT_NUMBER}`
    });
    
    log(`WhatsApp notification sent for job application: ${message.sid}`, 'whatsapp');
    return true;
  } catch (error) {
    log(`Error sending WhatsApp notification for job application: ${(error as Error).message}`, 'whatsapp');
    return false;
  }
};

/**
 * Send a test WhatsApp message
 */
export const sendTestWhatsAppMessage = async (): Promise<boolean> => {
  if (!isWhatsAppConfigured()) {
    log('Test WhatsApp notification not sent: service not configured', 'whatsapp');
    return false;
  }
  
  const client = getTwilioClient();
  if (!client) return false;
  
  try {
    const message = await client.messages.create({
      body: `*Test Notification from PrivacyWeave*\n\nThis is a test message to verify that WhatsApp notifications are working correctly. If you received this, the service is configured properly!`,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${process.env.WHATSAPP_RECIPIENT_NUMBER}`
    });
    
    log(`Test WhatsApp notification sent: ${message.sid}`, 'whatsapp');
    return true;
  } catch (error) {
    log(`Error sending test WhatsApp notification: ${(error as Error).message}`, 'whatsapp');
    return false;
  }
};