<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import { useAuth } from '@/composables/useAuth';
import { useFormValidation } from '@/composables/useFormValidation';
import { registerSchema, type RegisterForm } from '@/validation/authSchemas';

const router = useRouter();
const { register, loading, error } = useAuth();

const form = reactive<RegisterForm>({
  name: '',
  email: '',
  password: '',
  location: '',
  mainStack: '',
});
const { fieldErrors, validate } = useFormValidation<RegisterForm>(registerSchema);

const submit = async () => {
  if (!validate(form)) return;

  await register(form);
  await router.push('/dashboard');
};
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
    <div class="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-8 shadow-soft">
      <h1 class="text-2xl font-bold text-ink">Criar conta</h1>
      <p class="mt-2 text-sm text-slate-500">Configure seu perfil para acompanhar candidaturas com mais contexto.</p>
      <form class="mt-8 grid gap-4 sm:grid-cols-2" @submit.prevent="submit">
        <BaseInput
          id="name"
          v-model="form.name"
          class="sm:col-span-2"
          label="Nome"
          required
          :error="fieldErrors.name"
        />
        <BaseInput
          id="email"
          v-model="form.email"
          label="E-mail"
          type="email"
          autocomplete="email"
          :error="fieldErrors.email"
        />
        <BaseInput
          id="password"
          v-model="form.password"
          label="Senha"
          type="password"
          autocomplete="new-password"
          :error="fieldErrors.password"
        />
        <BaseInput id="location" v-model="form.location" label="Localização" :error="fieldErrors.location" />
        <BaseInput id="mainStack" v-model="form.mainStack" label="Stack principal" :error="fieldErrors.mainStack" />
        <p v-if="error" role="alert" class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 sm:col-span-2">
          {{ error }}
        </p>
        <BaseButton class="sm:col-span-2" type="submit" :loading="loading">Cadastrar</BaseButton>
      </form>
      <p class="mt-6 text-sm text-slate-500">
        Já tem conta?
        <RouterLink class="font-semibold text-brand" to="/login">Entrar</RouterLink>
      </p>
    </div>
  </main>
</template>
