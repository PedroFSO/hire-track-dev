<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  modelValue?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  autocomplete?: string;
  required?: boolean;
  readonly?: boolean;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <label class="block" :for="id">
    <span class="mb-1.5 block text-sm font-medium text-slate-700">{{ label }}</span>
    <input
      :id="id"
      :value="modelValue"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :required="required"
      :readonly="readonly"
      class="focus-ring min-h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? `${id}-error` : undefined"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="error" :id="`${id}-error`" class="mt-1 block text-sm text-red-600">{{ error }}</span>
  </label>
</template>
