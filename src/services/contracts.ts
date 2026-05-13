import type {
  Application,
  ApplicationStatus,
  AuthSession,
  DashboardStats,
  JobFilters,
  JobWithApplication,
  LoginInput,
  RegisterInput,
  User,
} from '@/types';

export interface AuthService {
  storageKeys: {
    token: string;
    user: string;
    applications: string;
  };
  login(input: LoginInput): Promise<AuthSession>;
  register(input: RegisterInput): Promise<AuthSession>;
  me(): Promise<AuthSession | null>;
  logout(): void;
  updateProfile(input: Pick<User, 'name' | 'location' | 'mainStack'>): Promise<User>;
}

export interface JobsService {
  getJobs(filters?: JobFilters): Promise<JobWithApplication[]>;
  getJob(id: string): Promise<JobWithApplication>;
  toggleFavorite(jobId: string): Promise<Application | null>;
}

export interface ApplicationsService {
  getApplications(): Promise<Application[]>;
  getDashboardStats(): Promise<DashboardStats>;
  updateApplicationStatus(jobId: string, status: ApplicationStatus): Promise<Application>;
  updateApplicationDetails(jobId: string, input: Pick<Application, 'notes' | 'nextInterviewAt'>): Promise<Application>;
}

export interface DemoService {
  resetDemoData(): void;
}

export interface HireTrackService {
  auth: AuthService;
  jobs: JobsService;
  applications: ApplicationsService;
  demo: DemoService;
}
