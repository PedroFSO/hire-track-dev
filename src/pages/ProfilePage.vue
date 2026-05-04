<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { useAuth } from '@/composables/useAuth';

const { user } = useAuth();
</script>

<template>
  <AppLayout>
    <section class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
      <h1 class="text-2xl font-bold text-ink">Perfil</h1>
      <p class="mt-1 text-sm text-slate-500">Informações usadas para personalizar sua experiência.</p>
      <div v-if="user" class="mt-8 grid gap-4 md:grid-cols-2">
        <BaseInput id="profile-name" :model-value="user.name" label="Nome" readonly />
        <BaseInput id="profile-email" :model-value="user.email" label="E-mail" readonly />
        <BaseInput id="profile-location" :model-value="user.location" label="Localização" readonly />
        <BaseInput id="profile-stack" :model-value="user.mainStack" label="Stack principal" readonly />
      </div>
    </section>
  </AppLayout>
</template>
