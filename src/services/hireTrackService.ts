import { graphQLClient, storageKeys } from '@/graphql/client';

export const hireTrackService = {
  auth: {
    storageKeys,
    login: graphQLClient.login,
    register: graphQLClient.register,
    me: graphQLClient.me,
    logout: graphQLClient.logout,
    updateProfile: graphQLClient.updateProfile,
  },
  jobs: {
    getJobs: graphQLClient.getJobs,
    getJob: graphQLClient.getJob,
    toggleFavorite: graphQLClient.toggleFavorite,
  },
  applications: {
    getApplications: graphQLClient.getApplications,
    getDashboardStats: graphQLClient.getDashboardStats,
    updateApplicationStatus: graphQLClient.updateApplicationStatus,
    updateApplicationDetails: graphQLClient.updateApplicationDetails,
  },
  demo: {
    resetDemoData: graphQLClient.resetDemoData,
  },
};
