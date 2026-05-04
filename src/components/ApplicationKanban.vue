<script setup lang="ts">
import { computed } from 'vue';
import StatusBadge from './StatusBadge.vue';
import type { ApplicationStatus, JobWithApplication } from '@/types';

const props = defineProps<{
  jobs: JobWithApplication[];
}>();

const columns: Array<{ status: ApplicationStatus; title: string }> = [
  { status: 'salvo', title: 'Salvas' },
  { status: 'aplicado', title: 'Aplicadas' },
  { status: 'entrevista', title: 'Entrevistas' },
  { status: 'recusado', title: 'Recusadas' },
];

const groupedJobs = computed(() =>
  columns.map((column) => ({
    ...column,
    jobs: props.jobs.filter((job) => job.applicationStatus === column.status),
  })),
);
</script>

<template>
  <section class="mt-8">
    <div class="mb-4 flex items-end justify-between gap-3">
      <div>
        <h2 class="text-lg font-bold text-ink">Pipeline de candidaturas</h2>
        <p class="mt-1 text-sm text-slate-500">Visualize rapidamente onde cada oportunidade está no processo.</p>
      </div>
      <RouterLink
        class="hidden rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 sm:inline-flex"
        to="/jobs"
      >
        Gerenciar vagas
      </RouterLink>
    </div>

    <div class="grid gap-4 xl:grid-cols-4">
      <div
        v-for="column in groupedJobs"
        :key="column.status"
        class="rounded-lg border border-slate-200 bg-white p-4 shadow-soft"
      >
        <div class="mb-4 flex items-center justify-between gap-2">
          <h3 class="font-semibold text-ink">{{ column.title }}</h3>
          <span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">{{
            column.jobs.length
          }}</span>
        </div>

        <div v-if="column.jobs.length" class="space-y-3">
          <RouterLink
            v-for="job in column.jobs"
            :key="job.id"
            :to="`/jobs/${job.id}`"
            class="block rounded-md border border-slate-200 p-3 transition hover:border-brand hover:bg-blue-50/50"
          >
            <div class="flex items-start justify-between gap-2">
              <p class="text-sm font-semibold text-ink">{{ job.title }}</p>
              <StatusBadge :status="job.applicationStatus" />
            </div>
            <p class="mt-1 text-xs text-slate-500">{{ job.company }}</p>
            <div class="mt-3 flex flex-wrap gap-1.5">
              <span
                v-for="stack in job.stack.slice(0, 3)"
                :key="stack"
                class="rounded bg-slate-100 px-1.5 py-1 text-[11px] text-slate-600"
              >
                {{ stack }}
              </span>
            </div>
          </RouterLink>
        </div>
        <p v-else class="rounded-md border border-dashed border-slate-200 px-3 py-6 text-center text-sm text-slate-500">
          Sem vagas neste status.
        </p>
      </div>
    </div>
  </section>
</template>
