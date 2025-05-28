import { users, companies, jobs, applications, savedJobs, jobCategories, type User, type InsertUser, type Company, type InsertCompany, type Job, type InsertJob, type Application, type InsertApplication, type SavedJob, type InsertSavedJob, type JobCategory, type InsertJobCategory, type JobWithCompany, type CompanyWithJobCount } from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Companies
  getCompany(id: number): Promise<Company | undefined>;
  getAllCompanies(): Promise<CompanyWithJobCount[]>;
  createCompany(company: InsertCompany): Promise<Company>;

  // Jobs
  getJob(id: number): Promise<JobWithCompany | undefined>;
  getAllJobs(): Promise<JobWithCompany[]>;
  getJobsByFilters(filters: {
    category?: string;
    type?: string;
    experienceLevel?: string;
    remoteType?: string;
    salaryMin?: number;
    salaryMax?: number;
    search?: string;
  }): Promise<JobWithCompany[]>;
  getFeaturedJobs(): Promise<JobWithCompany[]>;
  createJob(job: InsertJob): Promise<Job>;

  // Job Categories
  getAllJobCategories(): Promise<JobCategory[]>;
  createJobCategory(category: InsertJobCategory): Promise<JobCategory>;

  // Applications
  getApplication(userId: number, jobId: number): Promise<Application | undefined>;
  getUserApplications(userId: number): Promise<Application[]>;
  createApplication(application: InsertApplication): Promise<Application>;

  // Saved Jobs
  getSavedJob(userId: number, jobId: number): Promise<SavedJob | undefined>;
  getUserSavedJobs(userId: number): Promise<JobWithCompany[]>;
  createSavedJob(savedJob: InsertSavedJob): Promise<SavedJob>;
  deleteSavedJob(userId: number, jobId: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private companies: Map<number, Company>;
  private jobs: Map<number, Job>;
  private applications: Map<string, Application>;
  private savedJobs: Map<string, SavedJob>;
  private jobCategories: Map<number, JobCategory>;
  
  private currentUserId: number;
  private currentCompanyId: number;
  private currentJobId: number;
  private currentApplicationId: number;
  private currentSavedJobId: number;
  private currentCategoryId: number;

  constructor() {
    this.users = new Map();
    this.companies = new Map();
    this.jobs = new Map();
    this.applications = new Map();
    this.savedJobs = new Map();
    this.jobCategories = new Map();
    
    this.currentUserId = 1;
    this.currentCompanyId = 1;
    this.currentJobId = 1;
    this.currentApplicationId = 1;
    this.currentSavedJobId = 1;
    this.currentCategoryId = 1;

    this.seedData();
  }

  private seedData() {
    // Seed companies
    const sampleCompanies: InsertCompany[] = [
      {
        name: "TechFlow Solutions",
        description: "Leading fintech company specializing in AI-powered financial solutions",
        industry: "Fintech & AI Solutions",
        location: "San Francisco, CA",
        size: "250+ employees",
        logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        website: "https://techflow.com",
        technologies: ["React", "Python", "AI/ML", "AWS"]
      },
      {
        name: "Creative Studio",
        description: "Award-winning design agency creating beautiful digital experiences",
        industry: "Design & Branding Agency",
        location: "London, UK",
        size: "85+ employees",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        website: "https://creativestudio.com",
        technologies: ["Figma", "Branding", "UI/UX", "Design Systems"]
      },
      {
        name: "CloudTech Solutions",
        description: "Infrastructure specialists building scalable cloud solutions",
        industry: "Cloud Infrastructure & DevOps",
        location: "Austin, TX",
        size: "180+ employees",
        logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        website: "https://cloudtech.com",
        technologies: ["AWS", "Docker", "Kubernetes", "Terraform"]
      },
      {
        name: "StartupFlow",
        description: "Fast-growing SaaS platform revolutionizing business workflows",
        industry: "SaaS & Productivity",
        location: "Berlin, Germany",
        size: "120+ employees",
        logo: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        website: "https://startupflow.com",
        technologies: ["Vue.js", "Node.js", "MongoDB", "GraphQL"]
      }
    ];

    sampleCompanies.forEach(company => {
      this.createCompany(company);
    });

    // Seed job categories
    const sampleCategories: InsertJobCategory[] = [
      { name: "Yazılım Geliştirme", icon: "fas fa-code", count: 2845, color: "blue" },
      { name: "UI/UX Tasarım", icon: "fas fa-palette", count: 1234, color: "purple" },
      { name: "Pazarlama", icon: "fas fa-chart-line", count: 956, color: "green" },
      { name: "İnsan Kaynakları", icon: "fas fa-users", count: 567, color: "orange" },
      { name: "Satış", icon: "fas fa-bullhorn", count: 789, color: "cyan" },
      { name: "Müşteri Hizmetleri", icon: "fas fa-headset", count: 432, color: "indigo" }
    ];

    sampleCategories.forEach(category => {
      this.createJobCategory(category);
    });

    // Seed jobs
    const sampleJobs: InsertJob[] = [
      {
        title: "Senior React Developer",
        description: "Looking for an experienced React developer to join our growing team. You'll work on cutting-edge web applications using modern technologies and help shape the future of our platform.",
        companyId: 1,
        category: "Yazılım Geliştirme",
        type: "full-time",
        experienceLevel: "senior",
        location: "San Francisco, CA",
        remoteType: "fully-remote",
        salaryMin: 80000,
        salaryMax: 120000,
        currency: "USD",
        skills: ["React", "TypeScript", "Node.js", "GraphQL"],
        featured: false,
        urgent: false
      },
      {
        title: "Product Designer",
        description: "Join our design team to create beautiful and intuitive user experiences. We're looking for someone passionate about user-centered design and collaborative problem-solving.",
        companyId: 2,
        category: "UI/UX Tasarım",
        type: "full-time",
        experienceLevel: "mid",
        location: "London, UK",
        remoteType: "fully-remote",
        salaryMin: 70000,
        salaryMax: 100000,
        currency: "USD",
        skills: ["Figma", "UI/UX", "Prototyping", "Design Systems"],
        featured: true,
        urgent: false
      },
      {
        title: "Marketing Manager",
        description: "Lead our marketing efforts and help scale our SaaS platform. Experience with digital marketing, content strategy, and growth hacking preferred.",
        companyId: 4,
        category: "Pazarlama",
        type: "full-time",
        experienceLevel: "mid",
        location: "Berlin, Germany",
        remoteType: "fully-remote",
        salaryMin: 60000,
        salaryMax: 90000,
        currency: "USD",
        skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
        featured: false,
        urgent: true
      },
      {
        title: "DevOps Engineer",
        description: "Join our infrastructure team to build scalable cloud solutions. Experience with AWS, Docker, Kubernetes, and CI/CD pipelines required.",
        companyId: 3,
        category: "Yazılım Geliştirme",
        type: "full-time",
        experienceLevel: "senior",
        location: "Austin, TX",
        remoteType: "fully-remote",
        salaryMin: 90000,
        salaryMax: 140000,
        currency: "USD",
        skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
        featured: false,
        urgent: false
      },
      {
        title: "Frontend Developer",
        description: "Build responsive and performant web applications using modern frontend technologies. Great opportunity for growth and learning.",
        companyId: 1,
        category: "Yazılım Geliştirme",
        type: "full-time",
        experienceLevel: "entry",
        location: "San Francisco, CA",
        remoteType: "hybrid",
        salaryMin: 50000,
        salaryMax: 75000,
        currency: "USD",
        skills: ["JavaScript", "React", "CSS", "HTML"],
        featured: false,
        urgent: false
      },
      {
        title: "UX Researcher",
        description: "Conduct user research to inform design decisions and improve user experience across our products.",
        companyId: 2,
        category: "UI/UX Tasarım",
        type: "part-time",
        experienceLevel: "mid",
        location: "London, UK",
        remoteType: "fully-remote",
        salaryMin: 40000,
        salaryMax: 60000,
        currency: "USD",
        skills: ["User Research", "Analytics", "Figma", "Testing"],
        featured: false,
        urgent: false
      }
    ];

    sampleJobs.forEach(job => {
      this.createJob(job);
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      profileImage: insertUser.profileImage || null,
      isEmployer: insertUser.isEmployer || false
    };
    this.users.set(id, user);
    return user;
  }

  // Companies
  async getCompany(id: number): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async getAllCompanies(): Promise<CompanyWithJobCount[]> {
    const companies = Array.from(this.companies.values());
    return companies.map(company => ({
      ...company,
      jobCount: Array.from(this.jobs.values()).filter(job => job.companyId === company.id).length
    }));
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = this.currentCompanyId++;
    const company: Company = { 
      ...insertCompany, 
      id, 
      createdAt: new Date(),
      website: insertCompany.website || null
    };
    this.companies.set(id, company);
    return company;
  }

  // Jobs
  async getJob(id: number): Promise<JobWithCompany | undefined> {
    const job = this.jobs.get(id);
    if (!job) return undefined;
    
    const company = this.companies.get(job.companyId);
    if (!company) return undefined;
    
    return { ...job, company };
  }

  async getAllJobs(): Promise<JobWithCompany[]> {
    const jobs = Array.from(this.jobs.values());
    return jobs.map(job => {
      const company = this.companies.get(job.companyId)!;
      return { ...job, company };
    }).sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getJobsByFilters(filters: {
    category?: string;
    type?: string;
    experienceLevel?: string;
    remoteType?: string;
    salaryMin?: number;
    salaryMax?: number;
    search?: string;
  }): Promise<JobWithCompany[]> {
    let jobs = Array.from(this.jobs.values());

    if (filters.category) {
      jobs = jobs.filter(job => job.category === filters.category);
    }

    if (filters.type) {
      jobs = jobs.filter(job => job.type === filters.type);
    }

    if (filters.experienceLevel) {
      jobs = jobs.filter(job => job.experienceLevel === filters.experienceLevel);
    }

    if (filters.remoteType) {
      jobs = jobs.filter(job => job.remoteType === filters.remoteType);
    }

    if (filters.salaryMin && filters.salaryMax) {
      jobs = jobs.filter(job => 
        job.salaryMin && job.salaryMax &&
        job.salaryMin >= filters.salaryMin! && 
        job.salaryMax <= filters.salaryMax!
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      jobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }

    return jobs.map(job => {
      const company = this.companies.get(job.companyId)!;
      return { ...job, company };
    }).sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getFeaturedJobs(): Promise<JobWithCompany[]> {
    const jobs = Array.from(this.jobs.values()).filter(job => job.featured);
    return jobs.map(job => {
      const company = this.companies.get(job.companyId)!;
      return { ...job, company };
    });
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = this.currentJobId++;
    const job: Job = { 
      ...insertJob, 
      id, 
      createdAt: new Date(),
      applicationCount: 0,
      featured: insertJob.featured || false,
      urgent: insertJob.urgent || false,
      salaryMin: insertJob.salaryMin || null,
      salaryMax: insertJob.salaryMax || null,
      currency: insertJob.currency || "USD"
    };
    this.jobs.set(id, job);
    return job;
  }

  // Job Categories
  async getAllJobCategories(): Promise<JobCategory[]> {
    return Array.from(this.jobCategories.values());
  }

  async createJobCategory(insertCategory: InsertJobCategory): Promise<JobCategory> {
    const id = this.currentCategoryId++;
    const category: JobCategory = { 
      ...insertCategory, 
      id,
      count: insertCategory.count ?? 0
    };
    this.jobCategories.set(id, category);
    return category;
  }

  // Applications
  async getApplication(userId: number, jobId: number): Promise<Application | undefined> {
    return this.applications.get(`${userId}-${jobId}`);
  }

  async getUserApplications(userId: number): Promise<Application[]> {
    return Array.from(this.applications.values()).filter(app => app.userId === userId);
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = this.currentApplicationId++;
    const application: Application = { 
      ...insertApplication, 
      id, 
      createdAt: new Date(),
      status: "pending",
      coverLetter: insertApplication.coverLetter || null
    };
    this.applications.set(`${application.userId}-${application.jobId}`, application);
    
    // Increment application count
    const job = this.jobs.get(application.jobId);
    if (job) {
      job.applicationCount = (job.applicationCount ?? 0) + 1;
      this.jobs.set(job.id, job);
    }
    
    return application;
  }

  // Saved Jobs
  async getSavedJob(userId: number, jobId: number): Promise<SavedJob | undefined> {
    return this.savedJobs.get(`${userId}-${jobId}`);
  }

  async getUserSavedJobs(userId: number): Promise<JobWithCompany[]> {
    const savedJobs = Array.from(this.savedJobs.values()).filter(saved => saved.userId === userId);
    return savedJobs.map(saved => {
      const job = this.jobs.get(saved.jobId)!;
      const company = this.companies.get(job.companyId)!;
      return { ...job, company };
    });
  }

  async createSavedJob(insertSavedJob: InsertSavedJob): Promise<SavedJob> {
    const id = this.currentSavedJobId++;
    const savedJob: SavedJob = { 
      ...insertSavedJob, 
      id, 
      createdAt: new Date()
    };
    this.savedJobs.set(`${savedJob.userId}-${savedJob.jobId}`, savedJob);
    return savedJob;
  }

  async deleteSavedJob(userId: number, jobId: number): Promise<void> {
    this.savedJobs.delete(`${userId}-${jobId}`);
  }
}

export const storage = new MemStorage();
