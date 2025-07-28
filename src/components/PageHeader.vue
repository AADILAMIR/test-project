<template>
  <div class="flex items-center justify-between w-full mb-6">
    <div class="flex items-center gap-2">
      <component :is="icon" class="w-10 h-10" :class="color ?? 'text-blue-600'" />
      <h1 class="text-3xl font-bold text-blue-600">{{ title }}</h1>
    </div>

    <div class="flex items-center gap-4">
      <button
        @click="$emit('toggle-sidebar')"
        class="text-blue-600 hover:text-blue-800 transition-colors"
        data-sidebar-toggle
      >
        <Bars3Icon class="w-7 h-7" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Bars3Icon } from '@heroicons/vue/24/solid'
import type { FunctionalComponent } from 'vue'
defineProps<{
  icon: FunctionalComponent
  title: string
  color?: string
}>()

defineEmits<{
  (e: 'toggle-sidebar'): void
  (e: 'close'): void
}>()
</script>
