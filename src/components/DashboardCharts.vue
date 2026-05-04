<script setup lang="ts">
import { computed } from 'vue';
import type { DashboardStats, JobWithApplication } from '@/types';

const props = defineProps<{
  stats: DashboardStats;
  jobs: JobWithApplication[];
}>();

const statusRows = computed(() => [
  { label: 'Salvas', value: props.stats.saved, color: '#2563eb' },
  { label: 'Aplicadas', value: props.stats.applied, color: '#10b981' },
  { label: 'Entrevistas', value: props.stats.interviews, color: '#f97316' },
  { label: 'Recusas', value: props.stats.rejected, color: '#ef4444' },
]);

const maxStatusValue = computed(() => Math.max(...statusRows.value.map((row) => row.value), 1));

const stackRows = computed(() => {
  const counts = props.jobs.reduce<Record<string, number>>((acc, job) => {
    job.stack.slice(0, 3).forEach((stack) => {
      acc[stack] = (acc[stack] ?? 0) + 1;
    });
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
});

const maxStackValue = computed(() => Math.max(...stackRows.value.map((row) => row.value), 1));
</script>

<template>
  <section class="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
    <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div class="mb-5">
        <h2 class="text-lg font-bold text-ink">Funil por status</h2>
        <p class="mt-1 text-sm text-slate-500">Distribuição atual das candidaturas acompanhadas.</p>
      </div>
      <div class="space-y-4">
        <div v-for="row in statusRows" :key="row.label">
          <div class="mb-1 flex items-center justify-between text-sm">
            <span class="font-medium text-slate-600">{{ row.label }}</span>
            <span class="font-semibold text-ink">{{ row.value }}</span>
          </div>
          <div class="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              class="h-full rounded-full"
              :style="{ width: `${(row.value / maxStatusValue) * 100}%`, backgroundColor: row.color }"
            />
          </div>
        </div>
      </div>
    </article>

    <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div class="mb-5">
        <h2 class="text-lg font-bold text-ink">Stacks mais frequentes</h2>
        <p class="mt-1 text-sm text-slate-500">Tecnologias mais presentes nas vagas disponíveis.</p>
      </div>
      <div class="space-y-3">
        <div v-for="row in stackRows" :key="row.label" class="grid grid-cols-[7rem_1fr_2rem] items-center gap-3">
          <span class="truncate text-sm font-medium text-slate-600">{{ row.label }}</span>
          <div class="h-2 overflow-hidden rounded-full bg-slate-100">
            <div class="h-full rounded-full bg-brand" :style="{ width: `${(row.value / maxStackValue) * 100}%` }" />
          </div>
          <span class="text-right text-sm font-semibold text-ink">{{ row.value }}</span>
        </div>
      </div>
    </article>
  </section>
</template>
