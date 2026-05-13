<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import { useToast } from '@/composables/useToast';
import { hireTrackService } from '@/services/hireTrackService';

const router = useRouter();
const { toggleTheme } = useTheme();
const { showToast } = useToast();
const isOpen = ref(false);
const query = ref('');

const commands = [
  { label: 'Ir para Dashboard', hint: 'Navegação', action: () => router.push('/dashboard') },
  { label: 'Ir para Vagas', hint: 'Navegação', action: () => router.push('/jobs') },
  { label: 'Ir para Perfil', hint: 'Navegação', action: () => router.push('/profile') },
  { label: 'Alternar tema', hint: 'Aparência', action: toggleTheme },
  {
    label: 'Restaurar dados demo',
    hint: 'Dados',
    action: () => {
      hireTrackService.demo.resetDemoData();
      showToast('Dados demo restaurados.', 'success');
      router.go(0);
    },
  },
];

const filteredCommands = computed(() => {
  const normalizedQuery = query.value.trim().toLowerCase();
  if (!normalizedQuery) return commands;

  return commands.filter((command) => command.label.toLowerCase().includes(normalizedQuery));
});

const open = () => {
  isOpen.value = true;
  query.value = '';
};

const close = () => {
  isOpen.value = false;
};

const runCommand = async (command: (typeof commands)[number]) => {
  await command.action();
  close();
};

const handleKeydown = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    open();
  }

  if (event.key === 'Escape') close();
};

onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 bg-black/50 px-4 py-20 backdrop-blur-sm" @click.self="close">
      <section
        class="mx-auto max-w-xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <input
          v-model="query"
          class="focus-ring min-h-12 w-full border-0 border-b border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400"
          placeholder="Buscar comando..."
          autofocus
        />
        <div class="max-h-80 overflow-y-auto p-2">
          <button
            v-for="command in filteredCommands"
            :key="command.label"
            type="button"
            class="command-item focus-ring flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm hover:bg-slate-100"
            @click="runCommand(command)"
          >
            <span class="font-semibold text-ink">{{ command.label }}</span>
            <span class="text-xs text-slate-500">{{ command.hint }}</span>
          </button>
          <p v-if="!filteredCommands.length" class="px-3 py-8 text-center text-sm text-slate-500">
            Nenhum comando encontrado.
          </p>
        </div>
      </section>
    </div>
  </Teleport>
</template>
