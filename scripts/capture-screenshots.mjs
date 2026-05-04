import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4173';
const outputDir = new URL('../docs/screenshots/', import.meta.url);

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

await page.goto(`${baseUrl}/login`);
await page.screenshot({ path: fileURLToPath(new URL('login.png', outputDir)), fullPage: true });

await page.getByRole('button', { name: 'Entrar' }).click();
await page.waitForURL(/dashboard/);
await page.screenshot({ path: fileURLToPath(new URL('dashboard.png', outputDir)), fullPage: true });

await page.getByRole('link', { name: 'Vagas' }).first().click();
await page.waitForURL(/jobs/);
await page.screenshot({ path: fileURLToPath(new URL('jobs.png', outputDir)), fullPage: true });

await browser.close();
