<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import AppEmptyState from '@/components/AppEmptyState.vue';
import AppErrorState from '@/components/AppErrorState.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import JobCard from '@/components/JobCard.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { useJobs } from '@/composables/useJobs';
import { useToast } from '@/composables/useToast';
import type { JobFilters, JobWithApplication } from '@/types';

const { jobs, loading, error, hasJobs, fetchJobs, toggleFavorite } = useJobs();
const { showToast } = useToast();
let stackSearchTimeout: number | null = null;

const filters = reactive<JobFilters>({
  stack: '',
  workModel: '',
  seniority: '',
  status: '',
  sortBy: 'postedAt',
});

const applyFilters = () => fetchJobs({ ...filters });
const hasActiveFilters = computed(() => Object.values(filters).some((value) => value && value !== 'postedAt'));

const applyStackFilter = () => {
  if (stackSearchTimeout) window.clearTimeout(stackSearchTimeout);
  stackSearchTimeout = window.setTimeout(applyFilters, 300);
};

const clearFilters = async () => {
  filters.stack = '';
  filters.workModel = '';
  filters.seniority = '';
  filters.status = '';
  filters.sortBy = 'postedAt';
  await applyFilters();
};

const handleFavorite = async (job: JobWithApplication) => {
  if (job.isFavorite && !window.confirm('Remover esta vaga dos favoritos?')) return;

  await toggleFavorite(job.id);
  if (error.value) {
    showToast(error.value, 'error');
    return;
  }

  await applyFilters();
  showToast(job.isFavorite ? 'Vaga removida dos favoritos.' : 'Vaga salva nos favoritos.', 'success');
};

onMounted(applyFilters);
onUnmounted(() => {
  if (stackSearchTimeout) window.clearTimeout(stackSearchTimeout);
});
</script>

<template>
  <AppLayout>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-ink">Vagas</h1>
      <p class="mt-1 text-sm text-slate-500">Filtre oportunidades e mantenha o status de cada processo atualizado.</p>
    </div>
    <section class="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
      <div class="grid gap-4 md:grid-cols-4">
        <BaseInput
          id="stack"
          v-model="filters.stack"
          label="Stack"
          placeholder="Vue, Node, GraphQL"
          @update:model-value="applyStackFilter"
        />
        <BaseSelect
          id="workModel"
          v-model="filters.workModel"
          label="Modelo"
          :options="[
            { label: 'Todos', value: '' },
            { label: 'Remoto', value: 'remoto' },
            { label: 'Híbrido', value: 'hibrido' },
            { label: 'Presencial', value: 'presencial' },
          ]"
          @update:model-value="applyFilters"
        />
        <BaseSelect
          id="seniority"
          v-model="filters.seniority"
          label="Senioridade"
          :options="[
            { label: 'Todas', value: '' },
            { label: 'Júnior', value: 'junior' },
            { label: 'Pleno', value: 'pleno' },
            { label: 'Sênior', value: 'senior' },
          ]"
          @update:model-value="applyFilters"
        />
        <BaseSelect
          id="status"
          v-model="filters.status"
          label="Status"
          :options="[
            { label: 'Todos', value: '' },
            { label: 'Salvo', value: 'salvo' },
            { label: 'Aplicado', value: 'aplicado' },
            { label: 'Entrevista', value: 'entrevista' },
            { label: 'Recusado', value: 'recusado' },
          ]"
          @update:model-value="applyFilters"
        />
      </div>
      <div class="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <BaseSelect
          id="sortBy"
          v-model="filters.sortBy"
          label="Ordenar por"
          :options="[
            { label: 'Mais recentes', value: 'postedAt' },
            { label: 'Maior salário', value: 'salary' },
            { label: 'Status', value: 'status' },
          ]"
          @update:model-value="applyFilters"
        />
        <BaseButton variant="ghost" :disabled="!hasActiveFilters || loading" @click="clearFilters">
          Limpar filtros
        </BaseButton>
      </div>
    </section>
    <AppErrorState v-if="error" class="mb-4" :message="error" />
    <div v-if="loading" class="space-y-4">
      <div v-for="item in 3" :key="item" class="h-48 animate-pulse rounded-lg bg-slate-200" />
    </div>
    <div v-else-if="hasJobs" class="space-y-4">
      <JobCard v-for="job in jobs" :key="job.id" :job="job" @favorite="handleFavorite" />
    </div>
    <AppEmptyState
      v-else
      title="Nenhuma vaga encontrada"
      description="Ajuste os filtros ou acompanhe novas oportunidades para preencher esta lista."
    >
      <BaseButton v-if="hasActiveFilters" variant="secondary" @click="clearFilters">Limpar filtros</BaseButton>
    </AppEmptyState>
  </AppLayout>
</template>
