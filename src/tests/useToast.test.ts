import { describe, expect, it, vi } from 'vitest';
import { useToast } from '@/composables/useToast';

describe('useToast', () => {
  it('exibe e remove avisos automaticamente', () => {
    vi.useFakeTimers();
    const { showToast, toasts } = useToast();

    showToast('Vaga salva nos favoritos.', 'success');

    expect(toasts.value).toHaveLength(1);
    expect(toasts.value[0]).toMatchObject({
      message: 'Vaga salva nos favoritos.',
      tone: 'success',
    });

    vi.advanceTimersByTime(3500);

    expect(toasts.value).toHaveLength(0);
    vi.useRealTimers();
  });
});
