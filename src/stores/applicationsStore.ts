import { defineStore } from 'pinia';
import { ref } from 'vue';
import { hireTrackService } from '@/services/hireTrackService';
import type { Application, ApplicationStatus, DashboardStats } from '@/types';

export const useApplicationsStore = defineStore('applications', () => {
  const applications = ref<Application[]>([]);
  const stats = ref<DashboardStats>({ saved: 0, applied: 0, interviews: 0, rejected: 0 });
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchApplications = async () => {
    loading.value = true;
    error.value = null;

    try {
      applications.value = await hireTrackService.applications.getApplications();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Falha ao carregar candidaturas.';
    } finally {
      loading.value = false;
    }
  };

  const fetchStats = async () => {
    loading.value = true;
    error.value = null;

    try {
      stats.value = await hireTrackService.applications.getDashboardStats();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Falha ao carregar métricas.';
    } finally {
      loading.value = false;
    }
  };

  const updateStatus = async (jobId: string, status: ApplicationStatus) => {
    error.value = null;

    try {
      const next = await hireTrackService.applications.updateApplicationStatus(jobId, status);
      applications.value = applications.value.some((application) => application.jobId === jobId)
        ? applications.value.map((application) => (application.jobId === jobId ? next : application))
        : [...applications.value, next];
      await fetchStats();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Falha ao atualizar candidatura.';
    }
  };

  const updateDetails = async (jobId: string, input: Pick<Application, 'notes' | 'nextInterviewAt'>) => {
    error.value = null;

    try {
      const next = await hireTrackService.applications.updateApplicationDetails(jobId, input);
      applications.value = applications.value.some((application) => application.jobId === jobId)
        ? applications.value.map((application) => (application.jobId === jobId ? next : application))
        : [...applications.value, next];
      await fetchStats();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Falha ao atualizar detalhes da candidatura.';
    }
  };

  return { applications, stats, loading, error, fetchApplications, fetchStats, updateStatus, updateDetails };
});
