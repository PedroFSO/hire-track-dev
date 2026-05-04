<script setup lang="ts">
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import { useAuth } from '@/composables/useAuth';
import { useFormValidation } from '@/composables/useFormValidation';
import { loginSchema, type LoginForm } from '@/validation/authSchemas';

const router = useRouter();
const route = useRoute();
const { login, loading, error } = useAuth();

const form = reactive<LoginForm>({
  email: 'ana@hiretrack.dev',
  password: '123456',
});
const { fieldErrors, validate } = useFormValidation<LoginForm>(loginSchema);

const submit = async () => {
  if (!validate(form)) return;

  await login(form);
  await router.push((route.query.redirect as string) || '/dashboard');
};
</script>

<template>
  <main class="grid min-h-screen bg-slate-50 lg:grid-cols-[1fr_0.9fr]">
    <section class="flex items-center justify-center px-6 py-10">
      <div class="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-soft">
        <div class="mb-8">
          <span class="grid h-11 w-11 place-items-center rounded-md bg-brand text-sm font-bold text-white">HT</span>
          <h1 class="mt-5 text-2xl font-bold text-ink">Entrar no HireTrack Dev</h1>
          <p class="mt-2 text-sm text-slate-500">Acompanhe suas vagas, favoritos e entrevistas em um só lugar.</p>
        </div>
        <form class="space-y-4" @submit.prevent="submit">
          <p v-if="route.query.expired" role="status" class="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Sua sessão expirou. Faça login novamente para continuar.
          </p>
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
            autocomplete="current-password"
            :error="fieldErrors.password"
          />
          <p v-if="error" role="alert" class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{{ error }}</p>
          <BaseButton class="w-full" type="submit" :loading="loading">Entrar</BaseButton>
        </form>
        <p class="mt-6 text-sm text-slate-500">
          Ainda não tem conta?
          <RouterLink class="font-semibold text-brand" to="/register">Criar cadastro</RouterLink>
        </p>
      </div>
    </section>
    <section class="hidden bg-ink px-10 py-12 text-white lg:flex lg:flex-col lg:justify-end">
      <p class="max-w-xl text-4xl font-bold leading-tight">Pipeline profissional para candidaturas em tecnologia.</p>
      <div class="mt-8 grid grid-cols-3 gap-3 text-sm text-blue-100">
        <span class="rounded-md bg-white/10 p-3">JWT mockado</span>
        <span class="rounded-md bg-white/10 p-3">GraphQL tipado</span>
        <span class="rounded-md bg-white/10 p-3">Dashboard ativo</span>
      </div>
    </section>
  </main>
</template>
