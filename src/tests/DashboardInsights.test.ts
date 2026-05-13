import { render, screen } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import DashboardInsights from '@/components/DashboardInsights.vue';
import type { Application, DashboardStats } from '@/types';

const stats: DashboardStats = {
  saved: 4,
  applied: 2,
  interviews: 1,
  rejected: 1,
};

const applications: Application[] = [
  {
    jobId: 'job-1',
    status: 'aplicado',
    updatedAt: '2026-05-01T10:00:00.000Z',
    history: [{ status: 'aplicado', changedAt: '2026-05-01T10:00:00.000Z' }],
  },
  {
    jobId: 'job-2',
    status: 'entrevista',
    updatedAt: '2026-05-02T12:00:00.000Z',
    nextInterviewAt: '2026-05-09T14:00',
    history: [{ status: 'entrevista', changedAt: '2026-05-02T12:00:00.000Z' }],
  },
];

describe('DashboardInsights', () => {
  it('renderiza taxas e datas derivadas das candidaturas', () => {
    render(DashboardInsights, { props: { stats, applications } });

    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
    expect(screen.getByText(/09\/05\/2026/)).toBeInTheDocument();
    expect(screen.getByText(/02\/05\/2026/)).toBeInTheDocument();
  });
});
