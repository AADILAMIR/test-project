<!-- <template>
  <div class="flex flex-col gap-1 w-full">
    <label :for="id" class="text-sm font-medium text-gray-700">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :required="required"
      class="border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label: string
  placeholder?: string
  modelValue: string
  required?: boolean
  type?: string
  id?: string
}>()

defineEmits(['update:modelValue'])
</script> -->

<template>
  <div class="flex flex-col gap-1 w-full">
    <!-- Label for non-file inputs -->
    <label v-if="type !== 'file'" :for="id" class="text-sm font-medium text-gray-700">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Regular input -->
    <input
      v-if="type !== 'file'"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :required="required"
      :class="[
        'border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
        { 'border-red-500': error },
      ]"
    />

    <!-- File input -->
    <input
      v-else
      :id="id"
      type="file"
      :multiple="multiple"
      :required="required"
      @change="$emit('change', $event)"
      class="border px-4 py-2 rounded shadow-sm focus:outline-none"
    />

    <!-- Error message -->
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label?: string
  placeholder?: string
  modelValue?: string
  required?: boolean
  type?: string
  id?: string
  multiple?: boolean
  error?: string // Added error prop for validation messages
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', event: Event): void
}>()
</script>
