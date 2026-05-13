import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { hireTrackService } from '@/services/hireTrackService';
import type { LoginInput, RegisterInput, User } from '@/types';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem(hireTrackService.auth.storageKeys.token));
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => Boolean(token.value && user.value));

  const setSession = (session: { user: User; token: string }) => {
    user.value = session.user;
    token.value = session.token;
  };

  const hydrate = async () => {
    loading.value = true;
    error.value = null;

    try {
      const session = await hireTrackService.auth.me();
      if (session) {
        setSession(session);
      } else {
        user.value = null;
        token.value = null;
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Falha ao restaurar sessão.';
    } finally {
      loading.value = false;
    }
  };

  const login = async (input: LoginInput) => {
    loading.value = true;
    error.value = null;

    try {
      setSession(await hireTrackService.auth.login(input));
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Falha ao entrar.';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const register = async (input: RegisterInput) => {
    loading.value = true;
    error.value = null;

    try {
      setSession(await hireTrackService.auth.register(input));
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Falha ao cadastrar.';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateProfile = async (input: Pick<User, 'name' | 'location' | 'mainStack'>) => {
    loading.value = true;
    error.value = null;

    try {
      user.value = await hireTrackService.auth.updateProfile(input);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Falha ao atualizar perfil.';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    hireTrackService.auth.logout();
    user.value = null;
    token.value = null;
  };

  return { user, token, loading, error, isAuthenticated, hydrate, login, register, updateProfile, logout };
});
