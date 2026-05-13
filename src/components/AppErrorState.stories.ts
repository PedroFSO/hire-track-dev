import type { Meta, StoryObj } from '@storybook/vue3-vite';
import AppErrorState from './AppErrorState.vue';

const meta = {
  title: 'Components/AppErrorState',
  component: AppErrorState,
  args: {
    message: 'Sessão expirada. Faça login novamente.',
  },
} satisfies Meta<typeof AppErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
