import { z } from 'zod';

const envSchema = z.object({
  VITE_APP_NAME: z.string().default('HireTrack Dev'),
  VITE_API_URL: z.string().default(''),
  VITE_ENABLE_MSW: z.enum(['true', 'false']).default('false'),
  VITE_SENTRY_DSN: z.string().default(''),
});

export const env = envSchema.parse({
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_ENABLE_MSW: import.meta.env.VITE_ENABLE_MSW,
  VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
});

export const isMswEnabled = import.meta.env.DEV && env.VITE_ENABLE_MSW === 'true';
export const isSentryEnabled = import.meta.env.PROD && Boolean(env.VITE_SENTRY_DSN);
