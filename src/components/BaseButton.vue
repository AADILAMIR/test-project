<template>
  <button
    type="button"
    :class="[
      'inline-flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-semibold shadow transition',
      variantClasses,
      { 'opacity-50 cursor-not-allowed': disabled },
    ]"
    @click="!disabled && onClick?.()"
    :disabled="disabled"
  >
    <slot name="startIcon" />
    <slot />
    <slot name="endIcon" />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'tertiary'
  disabled?: boolean
}>()

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-green-500 text-white hover:bg-green-600'
    case 'tertiary':
      return 'bg-white text-black border border-gray-300 hover:bg-gray-100'
    case 'primary':
    default:
      return 'bg-blue-600 text-white hover:bg-blue-700'
  }
})
</script>
