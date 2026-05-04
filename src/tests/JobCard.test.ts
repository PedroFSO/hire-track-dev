import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import JobCard from '@/components/JobCard.vue';
import type { JobWithApplication } from '@/types';

const job: JobWithApplication = {
  id: 'job-test',
  title: 'Vue Engineer',
  company: 'HireTrack Labs',
  location: 'Remoto',
  salaryRange: 'R$ 9.000 - R$ 12.000',
  workModel: 'remoto',
  seniority: 'pleno',
  stack: ['Vue', 'TypeScript'],
  description: 'Construa uma experiência profissional para devs.',
  responsibilities: ['Criar componentes'],
  requirements: ['Vue 3'],
  postedAt: '2026-04-30',
  recruiterName: 'Marina Costa',
  contactEmail: 'marina@hiretrack.dev',
  isFavorite: false,
  applicationStatus: null,
};

describe('JobCard', () => {
  it('renderiza dados da vaga e emite evento de favorito', async () => {
    const onFavorite = vi.fn();
    render(JobCard, {
      props: { job, onFavorite },
      global: {
        stubs: {
          RouterLink: { template: '<a><slot /></a>' },
        },
      },
    });

    expect(screen.getByText('Vue Engineer')).toBeInTheDocument();
    expect(screen.getByText('HireTrack Labs')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /salvar vaga/i }));

    expect(onFavorite).toHaveBeenCalledWith(job);
  });
});
