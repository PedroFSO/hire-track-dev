import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import './assets/main.css';
import { isMswEnabled } from '@/config/env';
import { initObservability } from '@/services/observability';

const app = createApp(App);

app.use(createPinia());
app.use(router);
initObservability(app);

const enableMocks = async () => {
  if (isMswEnabled) {
    const { worker } = await import('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
};

enableMocks().then(() => app.mount('#app'));
