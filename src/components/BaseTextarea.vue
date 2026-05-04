<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  modelValue?: string;
  placeholder?: string;
  rows?: number;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <label class="block" :for="id">
    <span class="mb-1.5 block text-sm font-medium text-slate-700">{{ label }}</span>
    <textarea
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows ?? 4"
      class="focus-ring w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
  </label>
</template>
