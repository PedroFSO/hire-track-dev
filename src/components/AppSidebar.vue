<script setup lang="ts">
import { BriefcaseBusiness, LayoutDashboard, UserRound } from 'lucide-vue-next';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/jobs', label: 'Vagas', icon: BriefcaseBusiness },
  { to: '/profile', label: 'Perfil', icon: UserRound },
];
</script>

<template>
  <aside class="hidden min-h-screen w-64 border-r border-slate-200 bg-white px-4 py-6 lg:block">
    <RouterLink to="/dashboard" class="mb-8 flex items-center gap-3 px-2">
      <span class="grid h-10 w-10 place-items-center rounded-md bg-brand text-sm font-bold text-white">HT</span>
      <span class="text-lg font-bold text-ink">HireTrack Dev</span>
    </RouterLink>
    <nav class="space-y-1">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="nav-link flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
        active-class="nav-link-active bg-blue-50 text-brand"
      >
        <component :is="link.icon" class="h-4 w-4" />
        {{ link.label }}
      </RouterLink>
    </nav>
  </aside>
</template>
