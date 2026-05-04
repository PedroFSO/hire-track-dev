import { Bookmark } from 'lucide-vue-next';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import DashboardCard from './DashboardCard.vue';

const meta = {
  title: 'Components/DashboardCard',
  component: DashboardCard,
  args: {
    title: 'Vagas salvas',
    value: 12,
    caption: 'Favoritos e oportunidades acompanhadas',
    icon: Bookmark,
    tone: 'blue',
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['blue', 'green', 'orange', 'red'],
    },
  },
} satisfies Meta<typeof DashboardCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
