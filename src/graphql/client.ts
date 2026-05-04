import { mockApplications, mockJobs, mockUsers } from './mockData';
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

const TOKEN_KEY = 'hiretrack_token';
const USER_KEY = 'hiretrack_user';
const APPLICATIONS_KEY = 'hiretrack_applications';
const SESSION_TTL_MS = 1000 * 60 * 60 * 8;

const delay = async () => new Promise((resolve) => window.setTimeout(resolve, 120));

const readJson = <T>(key: string, fallback: T): T => {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeJson = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const createToken = (user: User) => {
  const payload = btoa(JSON.stringify({ sub: user.id, email: user.email, iat: Date.now() }));
  return `mock.${payload}.jwt`;
};

const getTokenIssuedAt = (token: string) => {
  try {
    const [, payload] = token.split('.');
    return JSON.parse(atob(payload))?.iat as number | undefined;
  } catch {
    return undefined;
  }
};

const publicUser = ({ password: _password, ...user }: (typeof mockUsers)[number]): User => user;

const getApplications = (): Application[] => readJson(APPLICATIONS_KEY, mockApplications);

const setApplications = (applications: Application[]) => writeJson(APPLICATIONS_KEY, applications);

const attachApplication = (jobId: string) => getApplications().find((application) => application.jobId === jobId);

const toJobWithApplication = (job: (typeof mockJobs)[number]): JobWithApplication => {
  const application = attachApplication(job.id);

  return {
    ...job,
    isFavorite: Boolean(application),
    applicationStatus: application?.status ?? null,
  };
};

const matchesFilters = (job: JobWithApplication, filters: JobFilters = {}) => {
  const byStack =
    !filters.stack || job.stack.some((stack) => stack.toLowerCase().includes(filters.stack!.toLowerCase()));
  const byWorkModel = !filters.workModel || job.workModel === filters.workModel;
  const bySeniority = !filters.seniority || job.seniority === filters.seniority;
  const byStatus = !filters.status || job.applicationStatus === filters.status;

  return byStack && byWorkModel && bySeniority && byStatus;
};

const salaryValue = (salaryRange: string) => Number(salaryRange.match(/\d+\.?\d*/)?.[0]?.replace('.', '') ?? 0);

const sortJobs = (jobs: JobWithApplication[], sortBy: JobFilters['sortBy']) => {
  if (sortBy === 'salary') return [...jobs].sort((a, b) => salaryValue(b.salaryRange) - salaryValue(a.salaryRange));
  if (sortBy === 'status')
    return [...jobs].sort((a, b) => String(a.applicationStatus).localeCompare(String(b.applicationStatus)));
  return [...jobs].sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
};

const requireSession = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const user = readJson<User | null>(USER_KEY, null);

  if (!token || !user) {
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  const issuedAt = getTokenIssuedAt(token);
  if (!issuedAt || Date.now() - issuedAt > SESSION_TTL_MS) {
    graphQLClient.logout();
    throw new Error('Sessão expirada. Faça login novamente.');
  }
};

export const graphQLClient = {
  async login(input: LoginInput): Promise<AuthSession> {
    await delay();
    const found = mockUsers.find((user) => user.email === input.email && user.password === input.password);

    if (!found) {
      throw new Error('E-mail ou senha inválidos.');
    }

    const user = publicUser(found);
    const token = createToken(user);
    localStorage.setItem(TOKEN_KEY, token);
    writeJson(USER_KEY, user);

    return { user, token };
  },

  async register(input: RegisterInput): Promise<AuthSession> {
    await delay();
    const exists = mockUsers.some((user) => user.email === input.email);

    if (exists) {
      throw new Error('Este e-mail já está cadastrado.');
    }

    const user: User = {
      id: `user-${Date.now()}`,
      name: input.name,
      email: input.email,
      role: 'developer',
      location: input.location,
      mainStack: input.mainStack,
    };
    const token = createToken(user);
    localStorage.setItem(TOKEN_KEY, token);
    writeJson(USER_KEY, user);

    return { user, token };
  },

  async me(): Promise<AuthSession | null> {
    await delay();
    const token = localStorage.getItem(TOKEN_KEY);
    const user = readJson<User | null>(USER_KEY, null);

    if (token) {
      const issuedAt = getTokenIssuedAt(token);
      if (!issuedAt || Date.now() - issuedAt > SESSION_TTL_MS) {
        this.logout();
        return null;
      }
    }

    return token && user ? { token, user } : null;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  resetDemoData() {
    localStorage.removeItem(APPLICATIONS_KEY);
  },

  async getJobs(filters: JobFilters = {}): Promise<JobWithApplication[]> {
    await delay();
    requireSession();
    return sortJobs(
      mockJobs.map(toJobWithApplication).filter((job) => matchesFilters(job, filters)),
      filters.sortBy,
    );
  },

  async getJob(id: string): Promise<JobWithApplication> {
    await delay();
    requireSession();
    const job = mockJobs.find((item) => item.id === id);

    if (!job) {
      throw new Error('Vaga não encontrada.');
    }

    return toJobWithApplication(job);
  },

  async getApplications(): Promise<Application[]> {
    await delay();
    requireSession();
    return getApplications();
  },

  async toggleFavorite(jobId: string): Promise<Application | null> {
    await delay();
    requireSession();
    const applications = getApplications();
    const current = applications.find((application) => application.jobId === jobId);

    if (current) {
      const next = applications.filter((application) => application.jobId !== jobId);
      setApplications(next);
      return null;
    }

    const now = new Date().toISOString();
    const created: Application = {
      jobId,
      status: 'salvo',
      updatedAt: now,
      history: [{ status: 'salvo', changedAt: now }],
    };
    setApplications([...applications, created]);
    return created;
  },

  async updateApplicationStatus(jobId: string, status: ApplicationStatus): Promise<Application> {
    await delay();
    requireSession();
    const applications = getApplications();
    const current = applications.find((application) => application.jobId === jobId);
    const now = new Date().toISOString();
    const nextApplication: Application = {
      ...current,
      jobId,
      status,
      updatedAt: now,
      history: [...(current?.history ?? []), { status, changedAt: now }],
    };
    const next = current
      ? applications.map((application) => (application.jobId === jobId ? nextApplication : application))
      : [...applications, nextApplication];

    setApplications(next);
    return nextApplication;
  },

  async updateApplicationDetails(
    jobId: string,
    input: Pick<Application, 'notes' | 'nextInterviewAt'>,
  ): Promise<Application> {
    await delay();
    requireSession();
    const applications = getApplications();
    const current = applications.find((application) => application.jobId === jobId);
    const now = new Date().toISOString();
    const nextApplication: Application = {
      jobId,
      status: current?.status ?? 'salvo',
      updatedAt: now,
      history: current?.history ?? [{ status: 'salvo', changedAt: now }],
      notes: input.notes,
      nextInterviewAt: input.nextInterviewAt,
    };
    const next = current
      ? applications.map((application) => (application.jobId === jobId ? nextApplication : application))
      : [...applications, nextApplication];

    setApplications(next);
    return nextApplication;
  },

  async updateProfile(input: Pick<User, 'name' | 'location' | 'mainStack'>): Promise<User> {
    await delay();
    requireSession();
    const current = readJson<User | null>(USER_KEY, null);

    if (!current) {
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    const nextUser: User = {
      ...current,
      ...input,
    };
    writeJson(USER_KEY, nextUser);
    return nextUser;
  },

  async getDashboardStats(): Promise<DashboardStats> {
    await delay();
    requireSession();
    const applications = getApplications();

    return {
      saved: applications.length,
      applied: applications.filter((application) => application.status === 'aplicado').length,
      interviews: applications.filter((application) => application.status === 'entrevista').length,
      rejected: applications.filter((application) => application.status === 'recusado').length,
    };
  },
};

export const storageKeys = {
  token: TOKEN_KEY,
  user: USER_KEY,
  applications: APPLICATIONS_KEY,
};
