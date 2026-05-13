import type { Meta, StoryObj } from '@storybook/vue3-vite';
import AppEmptyState from './AppEmptyState.vue';
import BaseButton from './BaseButton.vue';

const meta = {
  title: 'Components/AppEmptyState',
  component: AppEmptyState,
  args: {
    title: 'Nenhuma vaga encontrada',
    description: 'Ajuste os filtros ou acompanhe novas oportunidades para preencher esta lista.',
  },
} satisfies Meta<typeof AppEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  render: (args) => ({
    components: { AppEmptyState, BaseButton },
    setup: () => ({ args }),
    template: `
      <AppEmptyState v-bind="args">
        <BaseButton variant="secondary">Limpar filtros</BaseButton>
      </AppEmptyState>
    `,
  }),
};
