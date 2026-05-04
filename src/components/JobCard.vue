<script setup lang="ts">
import { Bookmark, BriefcaseBusiness, MapPin } from 'lucide-vue-next';
import BaseButton from './BaseButton.vue';
import StatusBadge from './StatusBadge.vue';
import type { JobWithApplication } from '@/types';

defineProps<{
  job: JobWithApplication;
}>();

defineEmits<{
  favorite: [job: JobWithApplication];
}>();
</script>

<template>
  <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="min-w-0">
        <div class="mb-3 flex flex-wrap items-center gap-2">
          <StatusBadge :status="job.applicationStatus" />
          <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-600">
            {{ job.seniority }}
          </span>
          <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-600">
            {{ job.workModel }}
          </span>
        </div>
        <RouterLink :to="`/jobs/${job.id}`" class="text-lg font-bold text-ink hover:text-brand">
          {{ job.title }}
        </RouterLink>
        <div class="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
          <span class="inline-flex items-center gap-1.5"><BriefcaseBusiness class="h-4 w-4" />{{ job.company }}</span>
          <span class="inline-flex items-center gap-1.5"><MapPin class="h-4 w-4" />{{ job.location }}</span>
        </div>
        <p class="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{{ job.description }}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="stack in job.stack"
            :key="stack"
            class="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
          >
            {{ stack }}
          </span>
        </div>
      </div>
      <div class="flex shrink-0 items-center gap-2">
        <BaseButton
          variant="secondary"
          :aria-label="job.isFavorite ? 'Remover dos favoritos' : 'Salvar vaga'"
          @click="$emit('favorite', job)"
        >
          <Bookmark class="h-4 w-4" :class="{ 'fill-brand text-brand': job.isFavorite }" />
          {{ job.isFavorite ? 'Salva' : 'Salvar' }}
        </BaseButton>
      </div>
    </div>
  </article>
</template>
