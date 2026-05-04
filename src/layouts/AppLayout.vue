<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppSidebar from '@/components/AppSidebar.vue';
</script>

<template>
  <div class="min-h-screen bg-slate-50 lg:flex">
    <AppSidebar />
    <div class="min-w-0 flex-1">
      <AppHeader />
      <main class="mx-auto w-full max-w-6xl px-4 py-6 md:px-6">
        <slot />
      </main>
    </div>
  </div>
</template>
