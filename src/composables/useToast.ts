import { readonly, ref } from 'vue';

export type ToastTone = 'success' | 'error' | 'info';

export type Toast = {
  id: number;
  message: string;
  tone: ToastTone;
};

const toasts = ref<Toast[]>([]);
let nextId = 1;

export const useToast = () => {
  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  const showToast = (message: string, tone: ToastTone = 'info') => {
    const toast = { id: nextId++, message, tone };
    toasts.value = [...toasts.value, toast];
    window.setTimeout(() => removeToast(toast.id), 3500);
  };

  return {
    toasts: readonly(toasts),
    showToast,
    removeToast,
  };
};
