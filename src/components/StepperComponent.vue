<template>
  <div class="relative w-full max-w-2xl flex items-center justify-between">
    <div class="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 z-0"></div>

    <template v-for="step in totalSteps" :key="step">
      <div
        class="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
        :class="currentStep === step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'"
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
