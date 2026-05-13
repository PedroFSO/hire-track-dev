import { graphQLClient, storageKeys } from '@/graphql/client';
import type { HireTrackService } from '@/services/contracts';

export const hireTrackService: HireTrackService = {
  auth: {
    storageKeys,
    login: (input) => graphQLClient.login(input),
    register: (input) => graphQLClient.register(input),
    me: () => graphQLClient.me(),
    logout: () => graphQLClient.logout(),
    updateProfile: (input) => graphQLClient.updateProfile(input),
  },
  jobs: {
    getJobs: (filters) => graphQLClient.getJobs(filters),
    getJob: (id) => graphQLClient.getJob(id),
    toggleFavorite: (jobId) => graphQLClient.toggleFavorite(jobId),
  },
  applications: {
    getApplications: () => graphQLClient.getApplications(),
    getDashboardStats: () => graphQLClient.getDashboardStats(),
    updateApplicationStatus: (jobId, status) => graphQLClient.updateApplicationStatus(jobId, status),
    updateApplicationDetails: (jobId, input) => graphQLClient.updateApplicationDetails(jobId, input),
  },
  demo: {
    resetDemoData: () => graphQLClient.resetDemoData(),
  },
};
