<script setup lang="ts">
import { Bookmark, CalendarCheck, Send, XCircle } from 'lucide-vue-next';
import { onMounted } from 'vue';
import AppEmptyState from '@/components/AppEmptyState.vue';
import AppErrorState from '@/components/AppErrorState.vue';
import ApplicationKanban from '@/components/ApplicationKanban.vue';
import DashboardCard from '@/components/DashboardCard.vue';
import DashboardCharts from '@/components/DashboardCharts.vue';
import DashboardInsights from '@/components/DashboardInsights.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { useApplications } from '@/composables/useApplications';
import { useJobs } from '@/composables/useJobs';
import { exportApplicationsCsv } from '@/utils/csv';

const { applications, stats, loading, error, fetchApplications, fetchStats } = useApplications();
const { jobs, fetchJobs } = useJobs();

onMounted(async () => {
  await Promise.all([fetchStats(), fetchApplications(), fetchJobs({})]);
});

const exportCsv = () => exportApplicationsCsv(jobs.value, applications.value);
</script>

<template>
  <AppLayout>
    <div class="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <h1 class="text-2xl font-bold text-ink">Dashboard</h1>
        <p class="mt-1 text-sm text-slate-500">Resumo atualizado das suas candidaturas.</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="focus-ring rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          @click="exportCsv"
        >
          Exportar CSV
        </button>
        <RouterLink class="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700" to="/jobs">
          Ver vagas
        </RouterLink>
      </div>
    </div>
    <AppErrorState v-if="error" class="mb-4" :message="error" />
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
    <DashboardInsights v-if="!loading" :stats="stats" :applications="applications" />
    <DashboardCharts v-if="!loading" :stats="stats" :jobs="jobs" />
    <ApplicationKanban v-if="!loading && stats.saved" :jobs="jobs.filter((job) => job.applicationStatus)" />
    <AppEmptyState
      v-else-if="!loading"
      class="mt-8"
      title="Nenhuma candidatura acompanhada"
      description="Salve vagas para acompanhar status, notas, entrevistas e métricas no dashboard."
    >
      <RouterLink class="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700" to="/jobs">
        Ver vagas
      </RouterLink>
    </AppEmptyState>
  </AppLayout>
</template>
