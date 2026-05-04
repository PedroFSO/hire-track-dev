import { graphql, http, HttpResponse } from 'msw';
import { mockApplications, mockJobs } from '@/graphql/mockData';

export const handlers = [
  http.get('/api/health', () =>
    HttpResponse.json({
      status: 'ok',
      service: 'hiretrack-dev',
      mode: 'msw',
    }),
  ),
  graphql.query('Jobs', () =>
    HttpResponse.json({
      data: {
        jobs: mockJobs,
      },
    }),
  ),
  graphql.query('Applications', () =>
    HttpResponse.json({
      data: {
        applications: mockApplications,
      },
    }),
  ),
];
