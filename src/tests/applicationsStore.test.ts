import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { storageKeys } from '@/graphql/client';
import { useApplicationsStore } from '@/stores/applicationsStore';
import type { User } from '@/types';

const sessionUser: User = {
  id: 'test-user',
  name: 'Test User',
  email: 'test@hiretrack.dev',
  role: 'developer',
  location: 'Remoto',
  mainStack: 'Vue',
};

describe('applicationsStore', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(storageKeys.token, `mock.${btoa(JSON.stringify({ iat: Date.now() }))}.jwt`);
    localStorage.setItem(storageKeys.user, JSON.stringify(sessionUser));
    setActivePinia(createPinia());
  });

  it('carrega estatísticas do dashboard', async () => {
    const store = useApplicationsStore();

    await store.fetchStats();

    expect(store.stats.saved).toBe(4);
    expect(store.stats.applied).toBe(1);
    expect(store.stats.interviews).toBe(1);
    expect(store.stats.rejected).toBe(1);
  });

  it('atualiza status e recalcula métricas', async () => {
    const store = useApplicationsStore();

    await store.updateStatus('job-junior-vue', 'entrevista');

    expect(store.applications.find((application) => application.jobId === 'job-junior-vue')?.status).toBe('entrevista');
    expect(store.stats.interviews).toBe(2);
  });

  it('salva notas e próxima entrevista da candidatura', async () => {
    const store = useApplicationsStore();

    await store.updateDetails('job-junior-vue', {
      notes: 'Preparar exemplos de Vue 3.',
      nextInterviewAt: '2026-05-10T15:00',
    });

    const application = store.applications.find((item) => item.jobId === 'job-junior-vue');
    expect(application?.notes).toBe('Preparar exemplos de Vue 3.');
    expect(application?.nextInterviewAt).toBe('2026-05-10T15:00');
  });
});
