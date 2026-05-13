import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { hireTrackService } from '@/services/hireTrackService';
import type { JobFilters, JobWithApplication } from '@/types';

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref<JobWithApplication[]>([]);
  const selectedJob = ref<JobWithApplication | null>(null);
  const filters = ref<JobFilters>({});
  const loading = ref(false);
  const error = ref<string | null>(null);

  const hasJobs = computed(() => jobs.value.length > 0);
  const availableStacks = computed(() => Array.from(new Set(jobs.value.flatMap((job) => job.stack))).sort());

  const fetchJobs = async (nextFilters: JobFilters = filters.value) => {
    loading.value = true;
    error.value = null;
    filters.value = nextFilters;

    try {
      jobs.value = await hireTrackService.jobs.getJobs(nextFilters);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Falha ao carregar vagas.';
    } finally {
      loading.value = false;
    }
  };

  const fetchJob = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      selectedJob.value = await hireTrackService.jobs.getJob(id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Falha ao carregar vaga.';
    } finally {
      loading.value = false;
    }
  };

  const refreshJobState = async (jobId: string) => {
    const updated = await hireTrackService.jobs.getJob(jobId);
    jobs.value = jobs.value.map((job) => (job.id === jobId ? updated : job));
    if (selectedJob.value?.id === jobId) selectedJob.value = updated;
  };

  const toggleFavorite = async (jobId: string) => {
    error.value = null;
    try {
      await hireTrackService.jobs.toggleFavorite(jobId);
      await refreshJobState(jobId);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Falha ao salvar vaga.';
    }
  };

  return {
    jobs,
    selectedJob,
    filters,
    loading,
    error,
    hasJobs,
    availableStacks,
    fetchJobs,
    fetchJob,
    refreshJobState,
    toggleFavorite,
  };
});
