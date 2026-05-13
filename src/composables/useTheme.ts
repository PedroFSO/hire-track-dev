import { useStorage } from '@vueuse/core';
import { computed } from 'vue';

type Theme = 'light' | 'dark';

const THEME_KEY = 'hiretrack_theme';
const theme = useStorage<Theme>(THEME_KEY, 'light');

const applyTheme = (nextTheme: Theme) => {
  document.documentElement.dataset.theme = nextTheme;
};

applyTheme(theme.value);

export const useTheme = () => {
  const isDark = computed(() => theme.value === 'dark');

  const toggleTheme = () => {
    theme.value = isDark.value ? 'light' : 'dark';
    applyTheme(theme.value);
  };

  return {
    theme,
    isDark,
    toggleTheme,
  };
};
