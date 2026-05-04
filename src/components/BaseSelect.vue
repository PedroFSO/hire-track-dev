<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  modelValue?: string;
  options: Array<{ label: string; value: string }>;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <label class="block" :for="id">
    <span class="mb-1.5 block text-sm font-medium text-slate-700">{{ label }}</span>
    <select
      :id="id"
      :value="modelValue"
      class="focus-ring min-h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>
