<script setup lang="ts">
import type { ApplicationStatus } from '@/types';

const props = defineProps<{
  status: ApplicationStatus | null;
}>();

const labels: Record<ApplicationStatus, string> = {
  salvo: 'Salvo',
  aplicado: 'Aplicado',
  entrevista: 'Entrevista',
  recusado: 'Recusado',
};
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
    :class="{
      'bg-slate-100 text-slate-600': !props.status,
      'bg-blue-100 text-blue-700': props.status === 'salvo',
      'bg-emerald-100 text-emerald-700': props.status === 'aplicado',
      'bg-orange-100 text-orange-700': props.status === 'entrevista',
      'bg-red-100 text-red-700': props.status === 'recusado',
    }"
  >
    {{ props.status ? labels[props.status] : 'Nao salvo' }}
  </span>
</template>
