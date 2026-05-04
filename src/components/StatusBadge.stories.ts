import type { Meta, StoryObj } from '@storybook/vue3-vite';
import StatusBadge from './StatusBadge.vue';

const meta = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  args: {
    status: 'salvo',
  },
  argTypes: {
    status: {
      control: 'select',
      options: [null, 'salvo', 'aplicado', 'entrevista', 'recusado'],
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Saved: Story = {};
export const Applied: Story = { args: { status: 'aplicado' } };
export const Interview: Story = { args: { status: 'entrevista' } };
export const Empty: Story = { args: { status: null } };
