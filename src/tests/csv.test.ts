import { describe, expect, it } from 'vitest';
import { buildApplicationsCsv } from '@/utils/csv';
import type { Application, JobWithApplication } from '@/types';

const jobs: JobWithApplication[] = [
  {
    id: 'job-1',
    title: 'Frontend "Vue" Engineer',
    company: 'Acme, Inc.',
    location: 'Sao Paulo',
    salaryRange: 'R$ 10.000 - R$ 12.000',
    workModel: 'remoto',
    seniority: 'pleno',
    stack: ['Vue'],
    description: 'Build product UI.',
    responsibilities: ['Ship features'],
    requirements: ['Vue 3'],
    postedAt: '2026-05-01',
    recruiterName: 'Ana',
    contactEmail: 'ana@example.com',
    isFavorite: true,
    applicationStatus: 'aplicado',
  },
  {
    id: 'job-2',
    title: 'Ignored job',
    company: 'No Application',
    location: 'Remote',
    salaryRange: 'R$ 8.000',
    workModel: 'remoto',
    seniority: 'junior',
    stack: ['Vue'],
    description: 'Not tracked.',
    responsibilities: [],
    requirements: [],
    postedAt: '2026-05-02',
    recruiterName: 'Bob',
    contactEmail: 'bob@example.com',
    isFavorite: false,
    applicationStatus: null,
  },
];

const applications: Application[] = [
  {
    jobId: 'job-1',
    status: 'aplicado',
    updatedAt: '2026-05-03T10:00:00.000Z',
    notes: 'Mensagem com "aspas" e, virgula',
    nextInterviewAt: '2026-05-10T14:00',
    history: [{ status: 'aplicado', changedAt: '2026-05-03T10:00:00.000Z' }],
  },
];

describe('buildApplicationsCsv', () => {
  it('gera cabecalho e somente candidaturas acompanhadas', () => {
    const csv = buildApplicationsCsv(jobs, applications);

    expect(csv).toContain('"Cargo","Empresa","Localizacao"');
    expect(csv).toContain('"Frontend ""Vue"" Engineer","Acme, Inc."');
    expect(csv).not.toContain('Ignored job');
  });

  it('escapa aspas e preserva campos com virgula', () => {
    const csv = buildApplicationsCsv(jobs, applications);

    expect(csv).toContain('"Mensagem com ""aspas"" e, virgula"');
  });
});
