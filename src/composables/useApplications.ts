import { storeToRefs } from 'pinia';
import { useApplicationsStore } from '@/stores/applicationsStore';

export const useApplications = () => {
  const store = useApplicationsStore();
  const { applications, stats, loading, error } = storeToRefs(store);

  return {
    applications,
    stats,
    loading,
    error,
    fetchApplications: store.fetchApplications,
    fetchStats: store.fetchStats,
    updateStatus: store.updateStatus,
    updateDetails: store.updateDetails,
  };
};
