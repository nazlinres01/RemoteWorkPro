import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  profileImage: text("profile_image"),
  isEmployer: boolean("is_employer").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  industry: text("industry").notNull(),
  location: text("location").notNull(),
  size: text("size").notNull(),
  logo: text("logo").notNull(),
  website: text("website"),
  technologies: text("technologies").array().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  companyId: integer("company_id").references(() => companies.id).notNull(),
  category: text("category").notNull(),
  type: text("type").notNull(), // "full-time", "part-time", "freelance"
  experienceLevel: text("experience_level").notNull(), // "entry", "mid", "senior"
  location: text("location").notNull(),
  remoteType: text("remote_type").notNull(), // "fully-remote", "hybrid", "timezone-specific"
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  currency: text("currency").default("USD"),
  skills: text("skills").array().notNull(),
  featured: boolean("featured").default(false),
  urgent: boolean("urgent").default(false),
  applicationCount: integer("application_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  jobId: integer("job_id").references(() => jobs.id).notNull(),
  status: text("status").default("pending"), // "pending", "accepted", "rejected"
  coverLetter: text("cover_letter"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const savedJobs = pgTable("saved_jobs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  jobId: integer("job_id").references(() => jobs.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobCategories = pgTable("job_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  count: integer("count").default(0),
  color: text("color").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  createdAt: true,
  applicationCount: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertSavedJobSchema = createInsertSchema(savedJobs).omit({
  id: true,
  createdAt: true,
});

export const insertJobCategorySchema = createInsertSchema(jobCategories).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;

export type Job = typeof jobs.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;

export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;

export type SavedJob = typeof savedJobs.$inferSelect;
export type InsertSavedJob = z.infer<typeof insertSavedJobSchema>;

export type JobCategory = typeof jobCategories.$inferSelect;
export type InsertJobCategory = z.infer<typeof insertJobCategorySchema>;

// Extended types for API responses
export type JobWithCompany = Job & {
  company: Company;
};

export type CompanyWithJobCount = Company & {
  jobCount: number;
};
