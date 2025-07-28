<template>
  <div class="flex flex-col gap-1 w-full">
    <label v-if="type !== 'file'" :for="id" class="text-sm font-medium text-gray-400">
      {{ label }} <span v-if="required" class="text-gray-400">*</span>
    </label>

    <input
      v-if="type !== 'file'"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :required="required"
      :class="[
        'border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-[2px_2px_1px_0px_rgba(0,_0,_0,_0.5)]',
        { 'border-red-500': error },
      ]"
    />

    <input
      v-else
      :id="id"
      type="file"
      :multiple="multiple"
      :required="required"
      @change="$emit('change', $event)"
      class="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none"
    />

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
  error?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', event: Event): void
}>()
</script>
