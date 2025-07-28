<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        :required="required"
        :class="[
          'w-full appearance-none px-4 py-2 pr-10 text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          { 'border-red-500': error },
        ]"
      >
        <option value="" disabled selected v-if="!modelValue">Select an option</option>
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-blue-600">
        <svg class="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.292l3.71-4.06a.75.75 0 111.08 1.04l-4.24 4.63a.75.75 0 01-1.08 0l-4.24-4.63a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    <p v-if="error" :id="`${id}-error`" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: string
  options: string[]
  label?: string
  required?: boolean
  id?: string
  error?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
