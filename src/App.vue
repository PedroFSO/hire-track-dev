<script setup lang="ts">
import AppToast from '@/components/AppToast.vue';
import CommandPalette from '@/components/CommandPalette.vue';
</script>

<template>
  <RouterView />
  <CommandPalette />
  <AppToast />
</template>
