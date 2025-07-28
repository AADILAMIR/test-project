<template>
  <div class="border border-gray-200 bg-white my-6 mx-auto">
    <h3 class="text-base font-semibold mb-4 px-6 pt-6">{{ title }}</h3>
    <hr class="mb-4" />
    <div class="px-6 pb-6">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
