<!-- <template>
  <a
    href="#"
    class="flex items-center px-3 py-2 rounded hover:bg-blue-50 transition"
    :class="{ 'justify-center': !isExpanded, 'gap-3': isExpanded }"
  >
    <component :is="icon" class="w-6 h-6 text-blue-600" />
    <span v-if="isExpanded" class="material-symbols-rounded text-sm font-medium text-blue-700">{{
      label
    }}</span>
  </a>
</template>

<script lang="ts" setup>
import type { FunctionalComponent } from 'vue'

defineProps<{
  icon: FunctionalComponent
  label: string
  isExpanded: boolean
}>()
</script> -->
<template>
  <RouterLink
    :to="to"
    class="flex items-center px-3 py-2 rounded hover:bg-blue-50 transition"
    :class="{ 'justify-center': !isExpanded, 'gap-3': isExpanded }"
  >
    <component :is="icon" class="w-6 h-6 text-blue-600" />
    <span v-if="isExpanded" class="text-sm font-medium text-blue-700">
      {{ label }}
    </span>
  </RouterLink>
</template>

<script setup lang="ts">
import type { FunctionalComponent } from 'vue'
import { RouterLink } from 'vue-router'

defineProps<{
  icon: FunctionalComponent
  label: string
  isExpanded: boolean
  to: string
}>()
</script>
