import * as Sentry from '@sentry/vue';
import type { App } from 'vue';
import { env, isSentryEnabled } from '@/config/env';

export const initObservability = (app: App<Element>) => {
  if (!isSentryEnabled) return;

  Sentry.init({
    app,
    dsn: env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.1,
  });
};
