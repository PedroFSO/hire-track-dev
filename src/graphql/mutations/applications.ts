export const TOGGLE_FAVORITE_MUTATION = `
  mutation ToggleFavorite($jobId: ID!) {
    toggleFavorite(jobId: $jobId) {
      jobId
      status
      updatedAt
    }
  }
`;

export const UPDATE_APPLICATION_STATUS_MUTATION = `
  mutation UpdateApplicationStatus($jobId: ID!, $status: ApplicationStatus!) {
    updateApplicationStatus(jobId: $jobId, status: $status) {
      jobId
      status
      updatedAt
    }
  }
`;
