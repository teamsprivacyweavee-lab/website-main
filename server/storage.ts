import { users, type User, type InsertUser, inquiries, type Inquiry, type InsertInquiry, jobApplications, type JobApplication, type InsertJobApplication, jobListings, type JobListing, type InsertJobListing, chatConversations, type ChatConversation, type InsertChatConversation, chatMessages, type ChatMessage, type InsertChatMessage } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPg from "connect-pg-simple";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { Pool } from '@neondatabase/serverless';

const MemoryStore = createMemoryStore(session);
const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
  getInquiry(id: number): Promise<Inquiry | undefined>;
  

  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
  updateJobApplication(id: number, updates: Partial<JobApplication>): Promise<JobApplication | undefined>;
  getJobApplications(): Promise<JobApplication[]>;
  getJobApplication(id: number): Promise<JobApplication | undefined>;
  
  createJobListing(listing: InsertJobListing): Promise<JobListing>;
  getJobListings(): Promise<JobListing[]>;
  getActiveJobListings(): Promise<JobListing[]>;
  getJobListing(id: number): Promise<JobListing | undefined>;

  // Chat conversation operations
  createChatConversation(conversation: InsertChatConversation): Promise<ChatConversation>;
  getChatConversation(id: number): Promise<ChatConversation | undefined>;
  getChatConversationBySessionId(sessionId: string): Promise<ChatConversation | undefined>;
  updateChatConversation(id: number, updates: Partial<ChatConversation>): Promise<ChatConversation | undefined>;
  
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessagesByConversationId(conversationId: number): Promise<ChatMessage[]>;
  
  // Session store
  sessionStore: any;
}

// Database implementation
export class DatabaseStorage implements IStorage {
  sessionStore: any;
  
  constructor() {
    // Initialize the PostgreSQL session store
    this.sessionStore = new PostgresSessionStore({
      conObject: {
        connectionString: process.env.DATABASE_URL,
      },
      createTableIfMissing: true,
    });
    
    // Seed job listings
    this.seedJobListings().catch(error => {
      console.error('Failed to seed job listings:', error);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // The timestamp fields are handled automatically by the defaultNow() in the schema
    const [user] = await db
      .insert(users)
      .values({ ...insertUser, role: "user" })
      .returning();
    return user;
  }
  
  // Inquiry operations
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db
      .insert(inquiries)
      .values(insertInquiry)
      .returning();
    return inquiry;
  }
  
  async getInquiries(): Promise<Inquiry[]> {
    return await db
      .select()
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt));
  }
  
  async getInquiry(id: number): Promise<Inquiry | undefined> {
    const [inquiry] = await db
      .select()
      .from(inquiries)
      .where(eq(inquiries.id, id));
    return inquiry;
  }
  
  // Job application operations
  // Job application operations
  async createJobApplication(insertApplication: InsertJobApplication): Promise<JobApplication> {
    const [application] = await db
      .insert(jobApplications)
      .values({
        ...insertApplication,
        resumePath: insertApplication.resumePath ?? null, // Use actual resumePath if provided
        message: insertApplication.message || null,
      })
      .returning();
    return application;
  }

  
  async getJobApplications(): Promise<JobApplication[]> {
    return await db
      .select()
      .from(jobApplications)
      .orderBy(desc(jobApplications.createdAt));
  }
  
  async getJobApplication(id: number): Promise<JobApplication | undefined> {
    const [application] = await db
      .select()
      .from(jobApplications)
      .where(eq(jobApplications.id, id));
    return application;
  }
  
  async updateJobApplication(id: number, updates: Partial<JobApplication>): Promise<JobApplication | undefined> {
    const [updatedApplication] = await db
      .update(jobApplications)
      .set(updates)
      .where(eq(jobApplications.id, id))
      .returning();
    return updatedApplication;
  }
  
  // Job listings operations
  async createJobListing(insertListing: InsertJobListing): Promise<JobListing> {
    const [listing] = await db
      .insert(jobListings)
      .values({
        ...insertListing,
        isActive: insertListing.isActive ?? true,
      })
      .returning();
    return listing;
  }
  
  async getJobListings(): Promise<JobListing[]> {
    return await db
      .select()
      .from(jobListings)
      .orderBy(desc(jobListings.createdAt));
  }
  
  async getActiveJobListings(): Promise<JobListing[]> {
    return await db
      .select()
      .from(jobListings)
      .where(eq(jobListings.isActive, true))
      .orderBy(desc(jobListings.createdAt));
  }
  
  async getJobListing(id: number): Promise<JobListing | undefined> {
    const [listing] = await db
      .select()
      .from(jobListings)
      .where(eq(jobListings.id, id));
    return listing;
  }

  // Chat conversation operations
  async createChatConversation(insertConversation: InsertChatConversation): Promise<ChatConversation> {
    const [conversation] = await db
      .insert(chatConversations)
      .values(insertConversation)
      .returning();
    return conversation;
  }

  async getChatConversation(id: number): Promise<ChatConversation | undefined> {
    const [conversation] = await db
      .select()
      .from(chatConversations)
      .where(eq(chatConversations.id, id));
    return conversation;
  }

  async getChatConversationBySessionId(sessionId: string): Promise<ChatConversation | undefined> {
    const [conversation] = await db
      .select()
      .from(chatConversations)
      .where(eq(chatConversations.sessionId, sessionId));
    return conversation;
  }

  async updateChatConversation(id: number, updates: Partial<ChatConversation>): Promise<ChatConversation | undefined> {
    const [updatedConversation] = await db
      .update(chatConversations)
      .set({
        ...updates,
        lastMessageAt: new Date(),
      })
      .where(eq(chatConversations.id, id))
      .returning();
    return updatedConversation;
  }

  // Chat message operations
  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db
      .insert(chatMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getChatMessagesByConversationId(conversationId: number): Promise<ChatMessage[]> {
    return await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.conversationId, conversationId))
      .orderBy(chatMessages.timestamp);
  }
  
  // Seed job listings
  async seedJobListings() {
    // Check if we have any job listings
    const existingListings = await db.select().from(jobListings);

    // If no listings exist, create them
    if (existingListings.length === 0) {
      const listings: InsertJobListing[] = [
        {
          title: "AI/ML Engineer (0-1 Year Experience)",
          description: "Join our innovative team to develop and implement AI/ML solutions for data privacy and compliance automation. You'll work on cutting-edge privacy-preserving AI models and contribute to our machine learning pipeline for data classification and policy automation.",
          requirements: "Bachelor's degree in Computer Science, AI, or related field. Basic knowledge of Python and machine learning libraries (TensorFlow, PyTorch, or scikit-learn). Understanding of fundamental ML concepts and algorithms. Eagerness to learn privacy-enhancing technologies. Strong analytical and problem-solving skills. Collaborative mindset and ability to work in cross-functional teams.",
          type: "Full-time",
          location: "Coimbatore",
          experience: "Entry Level (0-1 Year)",
          isActive: true,
          listingCategory: "Technology", // Add a valid value for listing_category
        },
        {
          title: "Full Stack Developer (0-1 Year Experience)",
          description: "Develop responsive web applications and APIs for our privacy automation platform. You'll help build intuitive interfaces for privacy management tools and contribute to developing scalable backend services that power our data governance solutions.",
          requirements: "Bachelor's degree in Computer Science or related technical field. Knowledge of JavaScript/TypeScript, HTML, and CSS. Familiarity with React or similar frontend frameworks. Basic understanding of Node.js and RESTful API concepts. Willingness to learn and adapt to new technologies. Passion for creating user-friendly interfaces. Basic understanding of database concepts.",
          type: "Full-time",
          location: "Coimbatore",
          experience: "Entry Level (0-1 Year)",
          isActive: true,
          listingCategory: "Development", // Add a valid value for listing_category
        },
        {
          title: "Cybersecurity & Encryption Specialist (0-1 Year Experience)",
          description: "Help implement end-to-end encryption and security protocols for our privacy-focused applications. You'll work on data protection mechanisms, assist in security assessment of our systems, and help implement encryption standards that ensure our clients' data remains secure.",
          requirements: "Bachelor's degree in Computer Science, Cybersecurity, or related field. Knowledge of fundamental encryption algorithms and techniques. Basic understanding of network security principles. Interest in privacy regulations (GDPR, CCPA, etc.). Familiarity with security tools and practices. Strong attention to detail. Excellent analytical and problem-solving skills. Eagerness to learn modern security frameworks.",
          type: "Full-time",
          location: "Coimbatore",
          experience: "Entry Level (0-1 Year)",
          isActive: true,
          listingCategory: "Cybersecurity", // Add a valid value for listing_category
        },
      ];

      for (const listing of listings) {
        await this.createJobListing(listing);
      }
    }
  }
}

// Keep the in-memory storage as a backup
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private inquiries: Map<number, Inquiry>;
  private jobApplications: Map<number, JobApplication>;
  private jobListings: Map<number, JobListing>;
  private chatConversations: Map<number, ChatConversation>;
  private chatMessages: Map<number, ChatMessage>;
  private userIdCounter: number;
  private inquiryIdCounter: number;
  private jobApplicationIdCounter: number;
  private jobListingIdCounter: number;
  private chatConversationIdCounter: number;
  private chatMessageIdCounter: number;
  sessionStore: any;

  constructor() {
    this.users = new Map();
    this.inquiries = new Map();
    this.jobApplications = new Map();
    this.jobListings = new Map();
    this.chatConversations = new Map();
    this.chatMessages = new Map();
    
    this.userIdCounter = 1;
    this.inquiryIdCounter = 1;
    this.jobApplicationIdCounter = 1;
    this.jobListingIdCounter = 1;
    this.chatConversationIdCounter = 1;
    this.chatMessageIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // Prune expired entries every 24h
    });
    
    // Seed with sample job listings
    this.seedJobListings();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { 
      ...insertUser, 
      id, 
      role: "user",
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }
  
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.inquiryIdCounter++;
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id, 
      createdAt: new Date() 
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
  
  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  
  async getInquiry(id: number): Promise<Inquiry | undefined> {
    return this.inquiries.get(id);
  }
  
  async createJobApplication(insertApplication: InsertJobApplication): Promise<JobApplication> {
    const id = this.jobApplicationIdCounter++;
    const application: JobApplication = { 
      ...insertApplication, 
      id, 
      resumePath: insertApplication.resumePath || null, // ← FIXED HERE
      message: insertApplication.message || null,
      applicationType: insertApplication.applicationType || 'job',
      education: insertApplication.education || null,
      university: insertApplication.university || null,
      graduationYear: insertApplication.graduationYear || null,
      availabilityDate: insertApplication.availabilityDate || null,
      createdAt: new Date() 
    };
    this.jobApplications.set(id, application);
    return application;
  }
  
  async getJobApplications(): Promise<JobApplication[]> {
    return Array.from(this.jobApplications.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  
  async getJobApplication(id: number): Promise<JobApplication | undefined> {
    return this.jobApplications.get(id);
  }
  
  async updateJobApplication(id: number, updates: Partial<JobApplication>): Promise<JobApplication | undefined> {
    const application = this.jobApplications.get(id);
    if (!application) return undefined;
    
    const updatedApplication = { ...application, ...updates };
    this.jobApplications.set(id, updatedApplication);
    return updatedApplication;
  }
  
  async createJobListing(insertListing: InsertJobListing): Promise<JobListing> {
    const id = this.jobListingIdCounter++;
    const listing: JobListing = { 
  ...insertListing, 
  id,
  isActive: insertListing.isActive ?? true,
  listingCategory: insertListing.listingCategory ?? null, // Ensure it's never undefined
  createdAt: new Date() 
};
    this.jobListings.set(id, listing);
    return listing;
  }
  
  async getJobListings(): Promise<JobListing[]> {
    return Array.from(this.jobListings.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  
  async getActiveJobListings(): Promise<JobListing[]> {
    return Array.from(this.jobListings.values())
      .filter(listing => listing.isActive)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async getJobListing(id: number): Promise<JobListing | undefined> {
    return this.jobListings.get(id);
  }

  // Chat conversation operations
  async createChatConversation(insertConversation: InsertChatConversation): Promise<ChatConversation> {
    const id = this.chatConversationIdCounter++;
    const now = new Date();
    
    // Create conversation with explicitly set properties to satisfy type checking
    const conversation: ChatConversation = {
      id,
      sessionId: insertConversation.sessionId,
      userEmail: insertConversation.userEmail || null,
      userName: insertConversation.userName || null,
      startedAt: now,
      lastMessageAt: now,
      category: insertConversation.category || null,
      status: 'active'
    };
    
    this.chatConversations.set(id, conversation);
    return conversation;
  }

  async getChatConversation(id: number): Promise<ChatConversation | undefined> {
    return this.chatConversations.get(id);
  }

  async getChatConversationBySessionId(sessionId: string): Promise<ChatConversation | undefined> {
    return Array.from(this.chatConversations.values()).find(
      (conversation) => conversation.sessionId === sessionId,
    );
  }

  async updateChatConversation(id: number, updates: Partial<ChatConversation>): Promise<ChatConversation | undefined> {
    const conversation = this.chatConversations.get(id);
    if (!conversation) return undefined;

    const updatedConversation: ChatConversation = {
      ...conversation,
      ...updates,
      lastMessageAt: new Date(),
    };
    this.chatConversations.set(id, updatedConversation);
    return updatedConversation;
  }

  // Chat message operations
  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.chatMessageIdCounter++;
    const message: ChatMessage = {
      ...insertMessage,
      id,
      timestamp: new Date(),
      attachmentUrl: insertMessage.attachmentUrl || null,
      attachmentType: insertMessage.attachmentType || null,
      isApplicationRequest: insertMessage.isApplicationRequest || false,
      metadata: insertMessage.metadata || {},
    };
    this.chatMessages.set(id, message);
    return message;
  }

  async getChatMessagesByConversationId(conversationId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.conversationId === conversationId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }
  
  private seedJobListings() {
    const listings: InsertJobListing[] = [
      {
        title: "AI/ML Engineer (0-1 Year Experience)",
        description: "Join our innovative team to develop and implement AI/ML solutions for data privacy and compliance automation. You'll work on cutting-edge privacy-preserving AI models and contribute to our machine learning pipeline for data classification and policy automation.",
        requirements: "Bachelor's degree in Computer Science, AI, or related field. Basic knowledge of Python and machine learning libraries (TensorFlow, PyTorch, or scikit-learn). Understanding of fundamental ML concepts and algorithms. Eagerness to learn privacy-enhancing technologies. Strong analytical and problem-solving skills. Collaborative mindset and ability to work in cross-functional teams.",
        type: "Full-time",
        location: "Coimbatore",
        experience: "Entry Level (0-1 Year)",
        isActive: true
      },
      {
        title: "Full Stack Developer (0-1 Year Experience)",
        description: "Develop responsive web applications and APIs for our privacy automation platform. You'll help build intuitive interfaces for privacy management tools and contribute to developing scalable backend services that power our data governance solutions.",
        requirements: "Bachelor's degree in Computer Science or related technical field. Knowledge of JavaScript/TypeScript, HTML, and CSS. Familiarity with React or similar frontend frameworks. Basic understanding of Node.js and RESTful API concepts. Willingness to learn and adapt to new technologies. Passion for creating user-friendly interfaces. Basic understanding of database concepts.",
        type: "Full-time",
        location: "Coimbatore",
        experience: "Entry Level (0-1 Year)",
        isActive: true
      },
      {
        title: "Cybersecurity & Encryption Specialist (0-1 Year Experience)",
        description: "Help implement end-to-end encryption and security protocols for our privacy-focused applications. You'll work on data protection mechanisms, assist in security assessment of our systems, and help implement encryption standards that ensure our clients' data remains secure.",
        requirements: "Bachelor's degree in Computer Science, Cybersecurity, or related field. Knowledge of fundamental encryption algorithms and techniques. Basic understanding of network security principles. Interest in privacy regulations (GDPR, CCPA, etc.). Familiarity with security tools and practices. Strong attention to detail. Excellent analytical and problem-solving skills. Eagerness to learn modern security frameworks.",
        type: "Full-time",
        location: "Coimbatore",
        experience: "Entry Level (0-1 Year)",
        isActive: true
      }
    ];
    
    listings.forEach(listing => {
      this.createJobListing(listing);
    });
  }
}

// Change this line to use the database storage
export const storage = new DatabaseStorage();
