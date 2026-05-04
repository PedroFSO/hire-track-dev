import type { Meta, StoryObj } from '@storybook/vue3-vite';
import JobCard from './JobCard.vue';
import type { JobWithApplication } from '@/types';

const job: JobWithApplication = {
  id: 'job-story',
  title: 'Frontend Engineer - Platform',
  company: 'CloudNova',
  location: 'Remoto Brasil',
  salaryRange: 'R$ 13.000 - R$ 17.000',
  workModel: 'remoto',
  seniority: 'senior',
  stack: ['Vue', 'TypeScript', 'GraphQL'],
  description: 'Construa interfaces de produto para uma plataforma SaaS usada por times distribuídos.',
  responsibilities: ['Evoluir design system'],
  requirements: ['Vue 3'],
  postedAt: '2026-04-24',
  recruiterName: 'Marina Costa',
  contactEmail: 'marina@cloudnova.dev',
  isFavorite: true,
  applicationStatus: 'salvo',
};

const meta = {
  title: 'Components/JobCard',
  component: JobCard,
  args: {
    job,
  },
} satisfies Meta<typeof JobCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Saved: Story = {};
export const NotSaved: Story = {
  args: {
    job: { ...job, isFavorite: false, applicationStatus: null },
  },
};
