import '../src/assets/main.css';
import type { Preview } from '@storybook/vue3-vite';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Application theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      document.documentElement.dataset.theme = context.globals.theme === 'dark' ? 'dark' : 'light';
      return {
        components: { story },
        template: '<div class="min-h-screen bg-slate-50 p-6 text-ink"><story /></div>',
      };
    },
  ],
  parameters: {
    controls: {
      expanded: true,
    },
    backgrounds: {
      default: 'app',
      values: [
        { name: 'app', value: '#f6f8fb' },
        { name: 'dark', value: '#000000' },
      ],
    },
  },
};

export default preview;
