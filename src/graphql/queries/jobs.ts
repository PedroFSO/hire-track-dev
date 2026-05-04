export const GET_JOBS = `
  query GetJobs($filters: JobFiltersInput) {
    jobs(filters: $filters) {
      id
      title
      company
      workModel
      seniority
      stack
      applicationStatus
      isFavorite
    }
  }
`;

export const GET_JOB = `
  query GetJob($id: ID!) {
    job(id: $id) {
      id
      title
      description
      requirements
      responsibilities
      applicationStatus
      isFavorite
    }
  }
`;
