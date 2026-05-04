import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const store = useAuthStore();
  const { user, token, loading, error, isAuthenticated } = storeToRefs(store);

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    hydrate: store.hydrate,
    login: store.login,
    register: store.register,
    updateProfile: store.updateProfile,
    logout: store.logout,
  };
};
