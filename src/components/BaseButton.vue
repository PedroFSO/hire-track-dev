<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';

withDefaults(
  defineProps<{
    type?: ButtonHTMLAttributes['type'];
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    loading?: boolean;
    disabled?: boolean;
  }>(),
  {
    type: 'button',
    variant: 'primary',
    loading: false,
    disabled: false,
  },
);
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
    :class="{
      'bg-brand text-white hover:bg-blue-700': variant === 'primary',
      'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50': variant === 'secondary',
      'text-slate-600 hover:bg-slate-100': variant === 'ghost',
      'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
    }"
  >
    <span
      v-if="loading"
      class="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
      aria-hidden="true"
    />
    <slot />
  </button>
</template>
