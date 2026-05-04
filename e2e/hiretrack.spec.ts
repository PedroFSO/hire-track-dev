import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.evaluate(() => localStorage.clear());
});

test('login, dashboard, listagem, salvar vaga e alterar status', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByText('Vagas salvas', { exact: true })).toBeVisible();

  await page.getByRole('link', { name: 'Vagas' }).first().click();
  await expect(page).toHaveURL(/jobs/);
  await expect(page.getByRole('heading', { name: 'Vagas' })).toBeVisible();
  await expect(page.getByText('Junior Vue Developer')).toBeVisible();

  const juniorCard = page.locator('article').filter({ hasText: 'Junior Vue Developer' });
  await juniorCard.getByRole('button', { name: 'Salvar vaga' }).click();
  await expect(juniorCard.getByText('Salva')).toBeVisible();

  await juniorCard.getByRole('link', { name: 'Junior Vue Developer' }).click();
  await expect(page).toHaveURL(/jobs\/job-junior-vue/);
  await page.getByLabel('Status da candidatura').selectOption('entrevista');
  await expect(page.getByText('Entrevista').first()).toBeVisible();
  await expect(page.getByText('Status da candidatura atualizado.')).toBeVisible();
});

test('filtros podem ser limpos pela listagem de vagas', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('link', { name: 'Vagas' }).first().click();

  await page.getByLabel('Stack').fill('GraphQL');
  await expect(page.getByText('Frontend Engineer - Platform')).toBeVisible();

  await page.getByRole('button', { name: 'Limpar filtros' }).click();

  await expect(page.getByLabel('Stack')).toHaveValue('');
  await expect(page.getByText('Junior Vue Developer')).toBeVisible();
});

test('perfil editável, tema e reset demo funcionam', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { name: 'Entrar' }).click();

  await page.getByRole('button', { name: 'Ativar tema escuro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await page.getByRole('link', { name: 'Perfil' }).first().click();
  await page.getByLabel('Nome').fill('Ana Demo');
  await page.getByRole('button', { name: 'Salvar perfil' }).click();
  await expect(page.getByText('Perfil atualizado.')).toBeVisible();
  await expect(page.getByText('Ana Demo')).toBeVisible();

  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Restaurar dados demo' }).click();
});

test('páginas principais não têm violações críticas de acessibilidade', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page).toHaveURL(/dashboard/);

  for (const path of ['/dashboard', '/jobs', '/profile']) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    expect(results.violations).toEqual([]);
  }
});
