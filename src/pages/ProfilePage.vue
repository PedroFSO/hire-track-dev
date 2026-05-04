<script setup lang="ts">
import { reactive, watch } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { useAuth } from '@/composables/useAuth';
import { useToast } from '@/composables/useToast';

const { user, loading, error, updateProfile } = useAuth();
const { showToast } = useToast();

const form = reactive({
  name: '',
  location: '',
  mainStack: '',
});

watch(
  user,
  (nextUser) => {
    form.name = nextUser?.name ?? '';
    form.location = nextUser?.location ?? '';
    form.mainStack = nextUser?.mainStack ?? '';
  },
  { immediate: true },
);

const submit = async () => {
  await updateProfile({ ...form });
  showToast('Perfil atualizado.', 'success');
};
</script>

<template>
  <AppLayout>
    <section class="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
      <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 class="text-2xl font-bold text-ink">Perfil</h1>
          <p class="mt-1 text-sm text-slate-500">Informações usadas para personalizar sua experiência.</p>
        </div>
        <p v-if="user" class="text-sm text-slate-500">{{ user.email }}</p>
      </div>

      <form v-if="user" class="mt-8 grid gap-4 md:grid-cols-2" @submit.prevent="submit">
        <BaseInput id="profile-name" v-model="form.name" label="Nome" required />
        <BaseInput id="profile-location" v-model="form.location" label="Localização" required />
        <BaseInput id="profile-stack" v-model="form.mainStack" class="md:col-span-2" label="Stack principal" required />
        <p v-if="error" role="alert" class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 md:col-span-2">
          {{ error }}
        </p>
        <div class="flex justify-end md:col-span-2">
          <BaseButton type="submit" :loading="loading">Salvar perfil</BaseButton>
        </div>
      </form>
    </section>
  </AppLayout>
</template>
