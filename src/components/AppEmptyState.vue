<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <section class="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
    <h2 class="text-base font-semibold text-ink">{{ title }}</h2>
    <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{{ description }}</p>
    <div v-if="$slots.default" class="mt-5 flex justify-center">
      <slot />
    </div>
  </section>
</template>
