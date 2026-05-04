import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { storageKeys } from '@/graphql/client';
import { useAuthStore } from '@/stores/authStore';

describe('authStore', () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it('autentica usuario e salva token JWT mockado no localStorage', async () => {
    const store = useAuthStore();

    await store.login({ email: 'ana@hiretrack.dev', password: '123456' });

    expect(store.isAuthenticated).toBe(true);
    expect(store.user?.email).toBe('ana@hiretrack.dev');
    expect(localStorage.getItem(storageKeys.token)).toMatch(/^mock\..+\.jwt$/);
  });

  it('remove sessao ao fazer logout', async () => {
    const store = useAuthStore();

    await store.login({ email: 'ana@hiretrack.dev', password: '123456' });
    store.logout();

    expect(store.isAuthenticated).toBe(false);
    expect(localStorage.getItem(storageKeys.token)).toBeNull();
  });
});
