export const GET_APPLICATIONS = `
  query GetApplications {
    applications {
      jobId
      status
      updatedAt
    }
  }
`;

export const GET_DASHBOARD_STATS = `
  query GetDashboardStats {
    dashboardStats {
      saved
      applied
      interviews
      rejected
    }
  }
`;
