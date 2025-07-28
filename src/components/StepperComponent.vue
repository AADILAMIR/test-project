<template>
  <div class="relative w-full max-w-2xl flex items-center justify-between">
    <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gray-200"></div>

    <template v-for="step in totalSteps" :key="step">
      <div
        class="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 font-semibold text-sm"
        :class="{
          'text-blue-600': step <= currentStep,
          'text-gray-200': step > currentStep,
        }"
      >
        {{ step }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentStep: number
  totalSteps: number
}>()
</script>
