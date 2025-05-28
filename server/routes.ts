import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertJobSchema, insertApplicationSchema, insertSavedJobSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Jobs endpoints
  app.get("/api/jobs", async (req, res) => {
    try {
      const { category, type, experienceLevel, remoteType, salaryMin, salaryMax, search } = req.query;
      
      const filters = {
        category: category as string | undefined,
        type: type as string | undefined,
        experienceLevel: experienceLevel as string | undefined,
        remoteType: remoteType as string | undefined,
        salaryMin: salaryMin ? parseInt(salaryMin as string) : undefined,
        salaryMax: salaryMax ? parseInt(salaryMax as string) : undefined,
        search: search as string | undefined,
      };

      const jobs = await storage.getJobsByFilters(filters);
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  app.get("/api/jobs/featured", async (req, res) => {
    try {
      const jobs = await storage.getFeaturedJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured jobs" });
    }
  });

  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const job = await storage.getJob(id);
      
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      
      res.json(job);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch job" });
    }
  });

  app.post("/api/jobs", async (req, res) => {
    try {
      const jobData = insertJobSchema.parse(req.body);
      const job = await storage.createJob(jobData);
      res.status(201).json(job);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid job data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create job" });
    }
  });

  // Companies endpoints
  app.get("/api/companies", async (req, res) => {
    try {
      const companies = await storage.getAllCompanies();
      res.json(companies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch companies" });
    }
  });

  app.get("/api/companies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const company = await storage.getCompany(id);
      
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      
      res.json(company);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch company" });
    }
  });

  // Job categories endpoints
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllJobCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Applications endpoints
  app.post("/api/applications", async (req, res) => {
    try {
      const applicationData = insertApplicationSchema.parse(req.body);
      
      // Check if user already applied
      const existingApplication = await storage.getApplication(applicationData.userId, applicationData.jobId);
      if (existingApplication) {
        return res.status(400).json({ message: "You have already applied to this job" });
      }
      
      const application = await storage.createApplication(applicationData);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid application data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create application" });
    }
  });

  app.get("/api/applications/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const applications = await storage.getUserApplications(userId);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  // Saved jobs endpoints
  app.post("/api/saved-jobs", async (req, res) => {
    try {
      const savedJobData = insertSavedJobSchema.parse(req.body);
      
      // Check if job is already saved
      const existingSavedJob = await storage.getSavedJob(savedJobData.userId, savedJobData.jobId);
      if (existingSavedJob) {
        return res.status(400).json({ message: "Job is already saved" });
      }
      
      const savedJob = await storage.createSavedJob(savedJobData);
      res.status(201).json(savedJob);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid saved job data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to save job" });
    }
  });

  app.delete("/api/saved-jobs", async (req, res) => {
    try {
      const { userId, jobId } = req.body;
      
      if (!userId || !jobId) {
        return res.status(400).json({ message: "userId and jobId are required" });
      }
      
      await storage.deleteSavedJob(parseInt(userId), parseInt(jobId));
      res.json({ message: "Job unsaved successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to unsave job" });
    }
  });

  app.get("/api/saved-jobs/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const savedJobs = await storage.getUserSavedJobs(userId);
      res.json(savedJobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch saved jobs" });
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
      // In a real app, you would save to database and send confirmation email
      res.json({ message: "Successfully subscribed to newsletter" });
    } catch (error) {
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
