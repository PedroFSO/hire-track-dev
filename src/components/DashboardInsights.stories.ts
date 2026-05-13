import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DashboardInsights from './DashboardInsights.vue';

const meta = {
  title: 'Components/DashboardInsights',
  component: DashboardInsights,
  args: {
    stats: {
      saved: 8,
      applied: 5,
      interviews: 2,
      rejected: 1,
    },
    applications: [
      {
        jobId: 'job-frontend',
        status: 'entrevista',
        updatedAt: '2026-05-08T12:00:00.000Z',
        nextInterviewAt: '2026-05-14T15:00',
        history: [{ status: 'entrevista', changedAt: '2026-05-08T12:00:00.000Z' }],
      },
      {
        jobId: 'job-backend',
        status: 'aplicado',
        updatedAt: '2026-05-10T09:00:00.000Z',
        history: [{ status: 'aplicado', changedAt: '2026-05-10T09:00:00.000Z' }],
      },
    ],
  },
} satisfies Meta<typeof DashboardInsights>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    stats: {
      saved: 0,
      applied: 0,
      interviews: 0,
      rejected: 0,
    },
    applications: [],
  },
};
