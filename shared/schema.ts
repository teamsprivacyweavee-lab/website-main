import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
// import { File } from 'formdata-node'; // Not used

// User schema for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  name: true,
  password: true,
});

// Client Inquiry schema
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  industry: text("industry").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertInquirySchema = createInsertSchema(inquiries).pick({
  firstName: true,
  lastName: true,
  email: true,
  company: true,
  industry: true,
  message: true,
});

// Job Application schema (Drizzle Table) - THIS IS CORRECT
export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  position: text("position").notNull(),
  experience: text("experience").notNull(),
  message: text("message"),
  resumePath: text("resume_path"), // Stores the link or path to the resume
  applicationType: text("application_type").default("job"), // 'job' or 'internship'
  education: text("education"), // Optional: For internships
  university: text("university"), // Optional: For internships
  graduationYear: text("graduation_year"), // Optional: For internships
  availabilityDate: text("availability_date"), // Optional: For internships
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Zod schema for INSERTING job applications (used by backend)
// THIS IS THE SCHEMA THAT NEEDS TO ACCOMMODATE INTERNSHIP FIELDS AS OPTIONAL
export const insertJobApplicationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  position: z.string().min(1, "Position is required"),
  experience: z.string().min(1, "Experience is required"),
  message: z.string().optional(),
  resumePath: z.string().url("Invalid URL for resume path").optional(), // Backend expects resumePath
  applicationType: z.string().default("job"), // 'job' or 'internship'
  // Internship-specific fields, optional for general job applications
  education: z.string().optional(),
  university: z.string().optional(),
  graduationYear: z.string().optional(),
  availabilityDate: z.string().optional(),
});

// Zod schema for general job application form validation on the FRONTEND (expects resumeLink)
// This schema is likely used by your ApplyJobPage.tsx
export const jobApplicationWithResumeSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  position: z.string().min(1, "Position is required"),
  experience: z.string().min(1, "Experience is required"),
  message: z.string().optional(),
  resumeLink: z.string().url("Resume link must be a valid URL").min(1, "Resume link is required"), // Frontend form uses resumeLink
  // It's good practice to include applicationType if the form might handle different types,
  // or if the backend relies on it from this schema's inference for some reason.
  // For a dedicated job application form, it might be implicitly "job".
  // If this schema is ONLY for job applications (not internships), applicationType can be omitted
  // or set to z.literal("job").default("job") if it needs to be explicit.
  // To keep it general as per its name, let's assume it might need to specify type:
  // applicationType: z.string().optional().default("job"), // Or make it more specific if needed
});

// Zod schema for INTERNSHIP application form validation on the FRONTEND
// This schema is used by ApplyInternshipPage.tsx
// It extends the base job application but makes internship fields required and uses resumeLink.
export const internshipApplicationWithResumeSchema = jobApplicationWithResumeSchema.extend({
  // resumeLink is inherited from jobApplicationWithResumeSchema
  applicationType: z.literal("internship").default("internship"), // Explicitly "internship"
  education: z.string().min(1, "Education field is required"),
  university: z.string().min(1, "University/College is required"),
  graduationYear: z.string().min(1, "Expected graduation year is required"),
  availabilityDate: z.string().min(1, "Availability date is required"),
});


// Job Listings
export const jobListings = pgTable("job_listings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  type: text("type").notNull(), // Full-time, Part-time, Contract, Internship
  location: text("location").notNull(),
  experience: text("experience").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  listingCategory: text("listing_category").default("job"), // 'job' or 'internship'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertJobListingSchema = createInsertSchema(jobListings).pick({
  title: true,
  description: true,
  requirements: true,
  type: true,
  location: true,
  experience: true,
  isActive: true,
  listingCategory: true,
});

// Chat Conversation schema
export const chatConversations = pgTable("chat_conversations", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  userEmail: text("user_email"),
  userName: text("user_name"),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  lastMessageAt: timestamp("last_message_at").notNull().defaultNow(),
  category: text("category"),
  status: text("status").notNull().default('active'),
});

export const insertChatConversationSchema = createInsertSchema(chatConversations).pick({
  sessionId: true,
  userEmail: true,
  userName: true,
  category: true,
});

// Chat Message schema
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull().references(() => chatConversations.id, { onDelete: 'cascade' }),
  sender: text("sender").notNull(),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  attachmentUrl: text("attachment_url"),
  attachmentType: text("attachment_type"),
  isApplicationRequest: boolean("is_application_request").default(false),
  metadata: jsonb("metadata"),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  conversationId: true,
  sender: true,
  content: true,
  attachmentUrl: true,
  attachmentType: true,
  isApplicationRequest: true,
  metadata: true,
});

// Exported types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

export type JobApplication = typeof jobApplications.$inferSelect; // DB select type
export type InsertJobApplication = z.infer<typeof insertJobApplicationSchema>; // Backend insert type

// Frontend form-specific types (inferred from the schemas that will be used by frontend forms)
export type JobApplicationFormValues = z.infer<typeof jobApplicationWithResumeSchema>;
export type InternshipApplicationFormValues = z.infer<typeof internshipApplicationWithResumeSchema>;

export type JobListing = typeof jobListings.$inferSelect;
export type InsertJobListing = z.infer<typeof insertJobListingSchema>;

export type ChatConversation = typeof chatConversations.$inferSelect;
export type InsertChatConversation = z.infer<typeof insertChatConversationSchema>;

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;