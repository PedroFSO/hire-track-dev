import type { Meta, StoryObj } from '@storybook/vue3-vite';
import BaseSelect from './BaseSelect.vue';

const meta = {
  title: 'Components/BaseSelect',
  component: BaseSelect,
  args: {
    id: 'work-model',
    label: 'Modelo de trabalho',
    modelValue: 'remoto',
    options: [
      { label: 'Todos', value: '' },
      { label: 'Remoto', value: 'remoto' },
      { label: 'Hibrido', value: 'hibrido' },
      { label: 'Presencial', value: 'presencial' },
    ],
  },
} satisfies Meta<typeof BaseSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
