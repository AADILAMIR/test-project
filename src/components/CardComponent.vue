<template>
  <div
    class="w-52 bg-white rounded-lg px-6 py-3 text-gray-800 text-sm shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
  >
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
defineProps<{ text: string }>()
</script>
