import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#17202a',
        brand: '#2563eb',
        mint: '#10b981',
        coral: '#f97316',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(23, 32, 42, 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
