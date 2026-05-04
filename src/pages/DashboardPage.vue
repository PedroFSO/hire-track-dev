<script setup lang="ts">
import { Bookmark, CalendarCheck, Send, XCircle } from 'lucide-vue-next';
import { onMounted } from 'vue';
import ApplicationKanban from '@/components/ApplicationKanban.vue';
import DashboardCard from '@/components/DashboardCard.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { useApplications } from '@/composables/useApplications';
import { useJobs } from '@/composables/useJobs';

const { stats, loading, error, fetchStats } = useApplications();
const { jobs, fetchJobs } = useJobs();

onMounted(async () => {
  await Promise.all([fetchStats(), fetchJobs({})]);
});
</script>

<template>
  <AppLayout>
    <div class="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <h1 class="text-2xl font-bold text-ink">Dashboard</h1>
        <p class="mt-1 text-sm text-slate-500">Resumo atualizado das suas candidaturas.</p>
      </div>
      <RouterLink class="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700" to="/jobs">
        Ver vagas
      </RouterLink>
    </div>
    <p v-if="error" class="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{{ error }}</p>
    <div v-if="loading" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div v-for="item in 4" :key="item" class="h-40 animate-pulse rounded-lg bg-slate-200" />
    </div>
    <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <DashboardCard
        title="Vagas salvas"
        :value="stats.saved"
        caption="Favoritos e oportunidades acompanhadas"
        :icon="Bookmark"
        tone="blue"
      />
      <DashboardCard
        title="Aplicadas"
        :value="stats.applied"
        caption="Candidaturas enviadas"
        :icon="Send"
        tone="green"
      />
      <DashboardCard
        title="Entrevistas"
        :value="stats.interviews"
        caption="Processos em conversa ativa"
        :icon="CalendarCheck"
        tone="orange"
      />
      <DashboardCard
        title="Recusas"
        :value="stats.rejected"
        caption="Processos encerrados"
        :icon="XCircle"
        tone="red"
      />
    </div>
    <ApplicationKanban v-if="!loading" :jobs="jobs.filter((job) => job.applicationStatus)" />
  </AppLayout>
</template>
