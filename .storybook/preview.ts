import '../src/assets/main.css';
import type { Preview } from '@storybook/vue3-vite';

const preview: Preview = {
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
