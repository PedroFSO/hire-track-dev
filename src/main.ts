import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

const enableMocks = async () => {
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW === 'true') {
    const { worker } = await import('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
};

enableMocks().then(() => app.mount('#app'));
