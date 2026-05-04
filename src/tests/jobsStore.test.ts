import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { storageKeys } from '@/graphql/client';
import { useJobsStore } from '@/stores/jobsStore';
import type { User } from '@/types';

const sessionUser: User = {
  id: 'test-user',
  name: 'Test User',
  email: 'test@hiretrack.dev',
  role: 'developer',
  location: 'Remoto',
  mainStack: 'Vue',
};

describe('jobsStore', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(storageKeys.token, `mock.${btoa(JSON.stringify({ iat: Date.now() }))}.jwt`);
    localStorage.setItem(storageKeys.user, JSON.stringify(sessionUser));
    setActivePinia(createPinia());
  });

  it('carrega vagas filtradas por stack', async () => {
    const store = useJobsStore();

    await store.fetchJobs({ stack: 'Vue' });

    expect(store.jobs.length).toBeGreaterThan(0);
    expect(store.jobs.every((job) => job.stack.some((stack) => stack.includes('Vue')))).toBe(true);
  });

  it('alterna favorito da vaga', async () => {
    const store = useJobsStore();

    await store.fetchJobs({});
    const job = store.jobs.find((item) => item.id === 'job-junior-vue');
    expect(job?.isFavorite).toBe(false);

    await store.toggleFavorite('job-junior-vue');
    await store.fetchJob('job-junior-vue');

    expect(store.selectedJob?.isFavorite).toBe(true);
    expect(store.selectedJob?.applicationStatus).toBe('salvo');
  });
});
