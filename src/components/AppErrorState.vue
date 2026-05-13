<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<template>
  <section class="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
    <p class="font-semibold text-red-900">Não foi possível concluir a ação.</p>
    <p class="mt-1">{{ message }}</p>
  </section>
</template>
