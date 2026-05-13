import { fireEvent, render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CommandPalette from '@/components/CommandPalette.vue';

const push = vi.hoisted(() => vi.fn());
const go = vi.hoisted(() => vi.fn());
const toggleTheme = vi.hoisted(() => vi.fn());
const showToast = vi.hoisted(() => vi.fn());
const resetDemoData = vi.hoisted(() => vi.fn());

vi.mock('vue-router', () => ({
  useRouter: () => ({ push, go }),
}));

vi.mock('@/composables/useTheme', () => ({
  useTheme: () => ({ toggleTheme }),
}));

vi.mock('@/composables/useToast', () => ({
  useToast: () => ({ showToast }),
}));

vi.mock('@/services/hireTrackService', () => ({
  hireTrackService: {
    demo: {
      resetDemoData,
    },
  },
}));

describe('CommandPalette', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  it('abre com Ctrl+K, filtra comandos e navega', async () => {
    render(CommandPalette);

    await fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(screen.getByRole('dialog', { name: /command palette/i })).toBeInTheDocument();

    await userEvent.type(screen.getByPlaceholderText(/buscar comando/i), 'perfil');
    await userEvent.click(screen.getByRole('button', { name: /ir para perfil/i }));

    expect(push).toHaveBeenCalledWith('/profile');
    expect(screen.queryByRole('dialog', { name: /command palette/i })).not.toBeInTheDocument();
  });

  it('restaura dados demo e recarrega a rota atual', async () => {
    render(CommandPalette);

    await fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    await userEvent.click(screen.getByRole('button', { name: /restaurar dados demo/i }));

    expect(resetDemoData).toHaveBeenCalled();
    expect(showToast).toHaveBeenCalledWith('Dados demo restaurados.', 'success');
    expect(go).toHaveBeenCalledWith(0);
  });
});
