import { computed, ref } from 'vue';

type Theme = 'light' | 'dark';

const THEME_KEY = 'hiretrack_theme';
const theme = ref<Theme>((localStorage.getItem(THEME_KEY) as Theme | null) ?? 'light');

const applyTheme = (nextTheme: Theme) => {
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem(THEME_KEY, nextTheme);
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
