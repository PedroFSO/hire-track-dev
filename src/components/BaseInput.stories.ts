import type { Meta, StoryObj } from '@storybook/vue3-vite';
import BaseInput from './BaseInput.vue';

const meta = {
  title: 'Components/BaseInput',
  component: BaseInput,
  args: {
    id: 'profile-name',
    label: 'Nome',
    modelValue: 'Ana Pereira',
    placeholder: 'Digite seu nome',
    type: 'text',
  },
} satisfies Meta<typeof BaseInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    modelValue: '',
    error: 'Informe pelo menos 3 caracteres.',
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
    modelValue: 'ana@hiretrack.dev',
    label: 'E-mail',
  },
};
