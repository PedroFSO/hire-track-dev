import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import DashboardPage from '@/pages/DashboardPage.vue';
import JobDetailsPage from '@/pages/JobDetailsPage.vue';
import JobsPage from '@/pages/JobsPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import ProfilePage from '@/pages/ProfilePage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', name: 'login', component: LoginPage, meta: { public: true } },
    { path: '/register', name: 'register', component: RegisterPage, meta: { public: true } },
    { path: '/dashboard', name: 'dashboard', component: DashboardPage },
    { path: '/jobs', name: 'jobs', component: JobsPage },
    { path: '/jobs/:id', name: 'job-details', component: JobDetailsPage, props: true },
    { path: '/profile', name: 'profile', component: ProfilePage },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
  ],
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  if (!authStore.user && authStore.token) {
    await authStore.hydrate();
  }

  if (!to.meta.public && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath, expired: authStore.token ? '1' : undefined } };
  }

  if (to.meta.public && authStore.isAuthenticated) {
    return { name: 'dashboard' };
  }
});
