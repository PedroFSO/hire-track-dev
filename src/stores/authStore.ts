import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { graphQLClient, storageKeys } from '@/graphql/client';
import type { LoginInput, RegisterInput, User } from '@/types';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem(storageKeys.token));
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
      const session = await graphQLClient.me();
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
      setSession(await graphQLClient.login(input));
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
      setSession(await graphQLClient.register(input));
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Falha ao cadastrar.';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    graphQLClient.logout();
    user.value = null;
    token.value = null;
  };

  return { user, token, loading, error, isAuthenticated, hydrate, login, register, logout };
});
