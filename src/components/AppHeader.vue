<script setup lang="ts">
import { LogOut, Moon, RotateCcw, Sun } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import BaseButton from './BaseButton.vue';
import { useAuth } from '@/composables/useAuth';
import { useTheme } from '@/composables/useTheme';
import { useToast } from '@/composables/useToast';
import { graphQLClient } from '@/graphql/client';

const router = useRouter();
const { user, logout } = useAuth();
const { isDark, toggleTheme } = useTheme();
const { showToast } = useToast();

const handleLogout = async () => {
  logout();
  await router.push('/login');
};

const resetDemoData = async () => {
  if (!window.confirm('Restaurar os dados demo? Suas alterações locais de candidatura serão apagadas.')) return;

  graphQLClient.resetDemoData();
  showToast('Dados demo restaurados.', 'success');
  await router.go(0);
};
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:px-6">
    <div class="flex items-center justify-between gap-4">
      <RouterLink to="/dashboard" class="flex items-center gap-3 lg:hidden">
        <span class="grid h-9 w-9 place-items-center rounded-md bg-brand text-xs font-bold text-white">HT</span>
        <span class="font-bold text-ink">HireTrack Dev</span>
      </RouterLink>
      <div class="hidden lg:block">
        <p class="text-sm text-slate-500">Workspace</p>
        <p class="font-semibold text-ink">{{ user?.name }}</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="hidden text-sm text-slate-500 sm:inline">{{ user?.mainStack }}</span>
        <BaseButton
          variant="ghost"
          :aria-label="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'"
          @click="toggleTheme"
        >
          <Sun v-if="isDark" class="h-4 w-4" />
          <Moon v-else class="h-4 w-4" />
          <span class="hidden sm:inline">{{ isDark ? 'Claro' : 'Escuro' }}</span>
        </BaseButton>
        <BaseButton variant="ghost" aria-label="Restaurar dados demo" @click="resetDemoData">
          <RotateCcw class="h-4 w-4" />
          <span class="hidden sm:inline">Reset demo</span>
        </BaseButton>
        <BaseButton variant="ghost" aria-label="Sair" @click="handleLogout">
          <LogOut class="h-4 w-4" />
          Sair
        </BaseButton>
      </div>
    </div>
    <nav class="mt-3 flex gap-2 overflow-x-auto lg:hidden">
      <RouterLink
        class="rounded-md px-3 py-2 text-sm font-semibold text-slate-600"
        active-class="bg-blue-50 text-brand"
        to="/dashboard"
      >
        Dashboard
      </RouterLink>
      <RouterLink
        class="rounded-md px-3 py-2 text-sm font-semibold text-slate-600"
        active-class="bg-blue-50 text-brand"
        to="/jobs"
      >
        Vagas
      </RouterLink>
      <RouterLink
        class="rounded-md px-3 py-2 text-sm font-semibold text-slate-600"
        active-class="bg-blue-50 text-brand"
        to="/profile"
      >
        Perfil
      </RouterLink>
    </nav>
  </header>
</template>
