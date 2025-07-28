<template>
  <div class="flex items-center justify-between w-full mb-6">
    <div class="flex items-center gap-2">
      <span class="text-green-500 text-3xl leading-none">{{ icon }}</span>
      <h1 class="text-2xl font-bold text-blue-600">{{ title }}</h1>
    </div>

    <div class="flex items-center gap-4">
      <button
        @click="$emit('toggle-sidebar')"
        class="text-blue-600 hover:text-blue-800 text-2xl transition-colors"
      >
        ☰
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  icon: string
  title: string
}>()

defineEmits<{
  (e: 'toggle-sidebar'): void
  (e: 'close'): void
}>()
</script>
