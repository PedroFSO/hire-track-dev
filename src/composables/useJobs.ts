import { storeToRefs } from 'pinia';
import { useJobsStore } from '@/stores/jobsStore';

export const useJobs = () => {
  const store = useJobsStore();
  const { jobs, selectedJob, filters, loading, error, hasJobs, availableStacks } = storeToRefs(store);

  return {
    jobs,
    selectedJob,
    filters,
    loading,
    error,
    hasJobs,
    availableStacks,
    fetchJobs: store.fetchJobs,
    fetchJob: store.fetchJob,
    refreshJobState: store.refreshJobState,
    toggleFavorite: store.toggleFavorite,
  };
};
