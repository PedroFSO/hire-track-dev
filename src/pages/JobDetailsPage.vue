<script setup lang="ts">
import { Bookmark } from 'lucide-vue-next';
import { computed, onMounted, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppErrorState from '@/components/AppErrorState.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseTextarea from '@/components/BaseTextarea.vue';
import StatusBadge from '@/components/StatusBadge.vue';
import { useApplications } from '@/composables/useApplications';
import { useJobs } from '@/composables/useJobs';
import { useToast } from '@/composables/useToast';
import AppLayout from '@/layouts/AppLayout.vue';
import type { ApplicationStatus } from '@/types';

const route = useRoute();
const jobId = computed(() => route.params.id as string);
const { selectedJob, loading, error, fetchJob, toggleFavorite, refreshJobState } = useJobs();
const { applications, fetchApplications, updateStatus, updateDetails, error: applicationError } = useApplications();
const { showToast } = useToast();

const currentApplication = computed(() => applications.value.find((application) => application.jobId === jobId.value));
const detailForm = reactive({
  notes: '',
  nextInterviewAt: '',
});

watch(
  currentApplication,
  (application) => {
    detailForm.notes = application?.notes ?? '';
    detailForm.nextInterviewAt = application?.nextInterviewAt ?? '';
  },
  { immediate: true },
);

const status = computed({
  get: () => selectedJob.value?.applicationStatus ?? 'salvo',
  set: async (value: string) => {
    await updateStatus(jobId.value, value as ApplicationStatus);
    if (applicationError.value) {
      showToast(applicationError.value, 'error');
      return;
    }

    await Promise.all([refreshJobState(jobId.value), fetchApplications()]);
    showToast('Status da candidatura atualizado.', 'success');
  },
});

const handleFavorite = async () => {
  if (selectedJob.value?.isFavorite && !window.confirm('Remover esta vaga dos favoritos?')) return;

  const wasFavorite = Boolean(selectedJob.value?.isFavorite);
  await toggleFavorite(jobId.value);
  if (error.value) {
    showToast(error.value, 'error');
    return;
  }

  await Promise.all([fetchJob(jobId.value), fetchApplications()]);
  showToast(wasFavorite ? 'Vaga removida dos favoritos.' : 'Vaga salva nos favoritos.', 'success');
};

const saveApplicationDetails = async () => {
  await updateDetails(jobId.value, {
    notes: detailForm.notes,
    nextInterviewAt: detailForm.nextInterviewAt,
  });

  if (applicationError.value) {
    showToast(applicationError.value, 'error');
    return;
  }

  await Promise.all([refreshJobState(jobId.value), fetchApplications()]);
  showToast('Detalhes da candidatura salvos.', 'success');
};

onMounted(async () => {
  await Promise.all([fetchJob(jobId.value), fetchApplications()]);
});
</script>

<template>
  <AppLayout>
    <div v-if="loading" class="h-96 animate-pulse rounded-lg bg-slate-200" />
    <AppErrorState v-else-if="error" :message="error" />
    <article v-else-if="selectedJob" class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
      <div class="flex flex-col justify-between gap-5 md:flex-row md:items-start">
        <div>
          <div class="mb-3 flex flex-wrap gap-2">
            <StatusBadge :status="selectedJob.applicationStatus" />
            <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-600">
              {{ selectedJob.workModel }}
            </span>
            <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-600">
              {{ selectedJob.seniority }}
            </span>
          </div>
          <h1 class="text-3xl font-bold text-ink">{{ selectedJob.title }}</h1>
          <p class="mt-2 text-slate-500">
            {{ selectedJob.company }} · {{ selectedJob.location }} · {{ selectedJob.salaryRange }}
          </p>
        </div>
        <div class="flex flex-col gap-3 sm:min-w-56">
          <BaseButton variant="secondary" @click="handleFavorite">
            <Bookmark class="h-4 w-4" :class="{ 'fill-brand text-brand': selectedJob.isFavorite }" />
            {{ selectedJob.isFavorite ? 'Remover favorito' : 'Salvar vaga' }}
          </BaseButton>
          <BaseSelect
            id="application-status"
            v-model="status"
            label="Status da candidatura"
            :options="[
              { label: 'Salvo', value: 'salvo' },
              { label: 'Aplicado', value: 'aplicado' },
              { label: 'Entrevista', value: 'entrevista' },
              { label: 'Recusado', value: 'recusado' },
            ]"
          />
        </div>
      </div>
      <div class="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section>
          <h2 class="text-lg font-bold text-ink">Sobre a vaga</h2>
          <p class="mt-3 leading-7 text-slate-600">{{ selectedJob.description }}</p>
          <h2 class="mt-8 text-lg font-bold text-ink">Responsabilidades</h2>
          <ul class="mt-3 list-disc space-y-2 pl-5 text-slate-600">
            <li v-for="item in selectedJob.responsibilities" :key="item">{{ item }}</li>
          </ul>

          <section class="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h2 class="text-lg font-bold text-ink">Acompanhamento</h2>
            <div class="mt-4 grid gap-4 sm:grid-cols-2">
              <BaseInput
                id="nextInterviewAt"
                v-model="detailForm.nextInterviewAt"
                label="Próxima entrevista"
                type="datetime-local"
              />
              <div>
                <p class="mb-1.5 text-sm font-medium text-slate-700">Contato</p>
                <p class="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                  {{ selectedJob.recruiterName }} · {{ selectedJob.contactEmail }}
                </p>
              </div>
            </div>
            <BaseTextarea
              id="application-notes"
              v-model="detailForm.notes"
              class="mt-4"
              label="Notas da candidatura"
              placeholder="Registre follow-ups, pontos de preparação e próximos passos."
            />
            <div class="mt-4 flex justify-end">
              <BaseButton @click="saveApplicationDetails">Salvar detalhes</BaseButton>
            </div>
          </section>
        </section>
        <aside>
          <h2 class="text-lg font-bold text-ink">Requisitos</h2>
          <ul class="mt-3 list-disc space-y-2 pl-5 text-slate-600">
            <li v-for="item in selectedJob.requirements" :key="item">{{ item }}</li>
          </ul>
          <h2 class="mt-8 text-lg font-bold text-ink">Stack</h2>
          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="stack in selectedJob.stack"
              :key="stack"
              class="rounded-md bg-slate-100 px-2 py-1 text-sm text-slate-600"
            >
              {{ stack }}
            </span>
          </div>
          <h2 class="mt-8 text-lg font-bold text-ink">Histórico</h2>
          <ol class="mt-3 space-y-3 text-sm text-slate-600">
            <li v-for="item in currentApplication?.history ?? []" :key="`${item.status}-${item.changedAt}`">
              <span class="font-semibold capitalize text-ink">{{ item.status }}</span>
              <span class="block">{{ new Date(item.changedAt).toLocaleString('pt-BR') }}</span>
            </li>
          </ol>
        </aside>
      </div>
    </article>
  </AppLayout>
</template>
