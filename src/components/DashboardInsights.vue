<script setup lang="ts">
import { computed } from 'vue';
import type { Application, DashboardStats } from '@/types';

const props = defineProps<{
  stats: DashboardStats;
  applications: Application[];
}>();

const applicationRate = computed(() =>
  props.stats.saved ? Math.round((props.stats.applied / props.stats.saved) * 100) : 0,
);
const interviewRate = computed(() =>
  props.stats.saved ? Math.round((props.stats.interviews / props.stats.saved) * 100) : 0,
);
const nextInterview = computed(
  () =>
    props.applications
      .filter((application) => application.nextInterviewAt)
      .sort((a, b) => String(a.nextInterviewAt).localeCompare(String(b.nextInterviewAt)))[0],
);
const lastUpdated = computed(
  () =>
    props.applications
      .map((application) => application.updatedAt)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0],
);
</script>

<template>
  <section class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <p class="text-sm font-medium text-slate-500">Taxa de aplicação</p>
      <p class="mt-2 text-3xl font-bold text-ink">{{ applicationRate }}%</p>
      <p class="mt-3 text-sm text-slate-500">Candidaturas enviadas sobre vagas acompanhadas.</p>
    </article>
    <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <p class="text-sm font-medium text-slate-500">Taxa de entrevista</p>
      <p class="mt-2 text-3xl font-bold text-ink">{{ interviewRate }}%</p>
      <p class="mt-3 text-sm text-slate-500">Processos que chegaram à etapa de entrevista.</p>
    </article>
    <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <p class="text-sm font-medium text-slate-500">Próxima entrevista</p>
      <p class="mt-2 text-lg font-bold text-ink">
        {{
          nextInterview?.nextInterviewAt
            ? new Date(nextInterview.nextInterviewAt).toLocaleString('pt-BR')
            : 'Sem agenda'
        }}
      </p>
      <p class="mt-3 text-sm text-slate-500">Atualize datas nos detalhes da vaga.</p>
    </article>
    <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <p class="text-sm font-medium text-slate-500">Última atualização</p>
      <p class="mt-2 text-lg font-bold text-ink">
        {{ lastUpdated ? new Date(lastUpdated).toLocaleString('pt-BR') : 'Sem dados' }}
      </p>
      <p class="mt-3 text-sm text-slate-500">Movimentação mais recente do pipeline.</p>
    </article>
  </section>
</template>
