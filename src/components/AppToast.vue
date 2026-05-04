<script setup lang="ts">
import { CheckCircle2, Info, X, XCircle } from 'lucide-vue-next';
import { useToast } from '@/composables/useToast';

const { toasts, removeToast } = useToast();

const iconByTone = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};
</script>

<template>
  <Teleport to="body">
    <div class="fixed right-4 top-4 z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        role="status"
        class="flex items-start gap-3 rounded-lg border bg-white p-4 text-sm shadow-lg"
        :class="{
          'border-emerald-200 text-emerald-900': toast.tone === 'success',
          'border-red-200 text-red-900': toast.tone === 'error',
          'border-blue-200 text-blue-900': toast.tone === 'info',
        }"
      >
        <component :is="iconByTone[toast.tone]" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p class="min-w-0 flex-1 leading-5">{{ toast.message }}</p>
        <button
          type="button"
          class="focus-ring -m-1 rounded-md p-1 text-slate-500 hover:bg-slate-100"
          aria-label="Fechar aviso"
          @click="removeToast(toast.id)"
        >
          <X class="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  </Teleport>
</template>
