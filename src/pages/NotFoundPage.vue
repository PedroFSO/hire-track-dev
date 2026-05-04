<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
</script>

<template>
  <AppLayout>
    <section class="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft">
      <p class="text-sm font-semibold uppercase tracking-wide text-brand">404</p>
      <h1 class="mt-3 text-3xl font-bold text-ink">Página não encontrada</h1>
      <p class="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
        A rota acessada não existe ou foi movida. Volte para o dashboard para continuar acompanhando suas candidaturas.
      </p>
      <RouterLink
        class="focus-ring mt-6 inline-flex min-h-10 items-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        to="/dashboard"
      >
        Ir para o dashboard
      </RouterLink>
    </section>
  </AppLayout>
</template>
