import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { router } from '@/router';
import { useAuthStore } from '@/stores/authStore';

describe('router guards', () => {
  beforeEach(async () => {
    localStorage.clear();
    setActivePinia(createPinia());
    await router.push('/login');
    await router.isReady();
  });

  it('redireciona visitante para login ao acessar rota privada', async () => {
    await router.push('/dashboard');

    expect(router.currentRoute.value.name).toBe('login');
    expect(router.currentRoute.value.query.redirect).toBe('/dashboard');
  });

  it('redireciona usuario autenticado para dashboard ao acessar login', async () => {
    const authStore = useAuthStore();
    await authStore.login({ email: 'ana@hiretrack.dev', password: '123456' });

    await router.push('/register');

    expect(router.currentRoute.value.name).toBe('dashboard');
  });
});
