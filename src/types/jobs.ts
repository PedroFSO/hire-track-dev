export type WorkModel = 'remoto' | 'hibrido' | 'presencial';
export type Seniority = 'junior' | 'pleno' | 'senior';
export type ApplicationStatus = 'salvo' | 'aplicado' | 'entrevista' | 'recusado';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  workModel: WorkModel;
  seniority: Seniority;
  stack: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedAt: string;
  recruiterName: string;
  contactEmail: string;
}

export interface Application {
  jobId: string;
  status: ApplicationStatus;
  updatedAt: string;
  notes?: string;
  nextInterviewAt?: string;
  history: Array<{
    status: ApplicationStatus;
    changedAt: string;
  }>;
}

export interface JobWithApplication extends Job {
  isFavorite: boolean;
  applicationStatus: ApplicationStatus | null;
}

export interface JobFilters {
  stack?: string;
  workModel?: WorkModel | '';
  seniority?: Seniority | '';
  status?: ApplicationStatus | '';
  sortBy?: 'postedAt' | 'salary' | 'status' | '';
}

export interface DashboardStats {
  saved: number;
  applied: number;
  interviews: number;
  rejected: number;
}
