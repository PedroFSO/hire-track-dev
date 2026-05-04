import type { Meta, StoryObj } from '@storybook/vue3-vite';
import BaseButton from './BaseButton.vue';

const meta = {
  title: 'Components/BaseButton',
  component: BaseButton,
  args: {
    variant: 'primary',
    loading: false,
    disabled: false,
    default: 'Salvar',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
  },
} satisfies Meta<typeof BaseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary', default: 'Cancelar' } };
export const Loading: Story = { args: { loading: true, default: 'Salvando' } };
