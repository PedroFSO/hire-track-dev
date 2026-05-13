import type { Application, JobWithApplication } from '@/types';

const APPLICATIONS_CSV_HEADER = [
  'Cargo',
  'Empresa',
  'Localizacao',
  'Salario',
  'Modelo',
  'Senioridade',
  'Status',
  'Proxima entrevista',
  'Notas',
  'Atualizado em',
];

const escapeCsv = (value: string | number | null | undefined) => {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
};

export const buildApplicationsCsv = (jobs: JobWithApplication[], applications: Application[]) => {
  const rows = jobs
    .filter((job) => job.applicationStatus)
    .map((job) => {
      const application = applications.find((item) => item.jobId === job.id);
      return [
        job.title,
        job.company,
        job.location,
        job.salaryRange,
        job.workModel,
        job.seniority,
        job.applicationStatus,
        application?.nextInterviewAt,
        application?.notes,
        application?.updatedAt,
      ];
    });

  return [APPLICATIONS_CSV_HEADER, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\n');
};

export const exportApplicationsCsv = (jobs: JobWithApplication[], applications: Application[]) => {
  const csv = buildApplicationsCsv(jobs, applications);
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `hiretrack-candidaturas-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
