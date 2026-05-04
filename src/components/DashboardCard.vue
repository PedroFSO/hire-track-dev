<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  title: string;
  value: number;
  caption: string;
  icon: Component;
  tone: 'blue' | 'green' | 'orange' | 'red';
}>();
</script>

<template>
  <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
    <div class="flex items-center justify-between gap-4">
      <div>
        <p class="text-sm font-medium text-slate-500">{{ title }}</p>
        <p class="mt-2 text-3xl font-bold text-ink">{{ value }}</p>
      </div>
      <div
        class="grid h-11 w-11 place-items-center rounded-md"
        :class="{
          'bg-blue-100 text-blue-700': tone === 'blue',
          'bg-emerald-100 text-emerald-700': tone === 'green',
          'bg-orange-100 text-orange-700': tone === 'orange',
          'bg-red-100 text-red-700': tone === 'red',
        }"
      >
        <component :is="icon" class="h-5 w-5" />
      </div>
    </div>
    <p class="mt-4 text-sm text-slate-500">{{ caption }}</p>
  </article>
</template>
