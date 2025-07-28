<template>
  <section class="mb-12">
    <h2 class="text-xl font-semibold mb-6">{{ props.title }}</h2>
    <div class="flex flex-wrap gap-x-6 gap-y-6 max-w-[960px]">
      <div
        v-for="item in props.items"
        :key="item.id ?? item.text"
        @click="handleClick(item)"
        class="w-52 cursor-pointer bg-white rounded-lg px-6 py-3 text-gray-800 text-sm shadow-[0_1px_4px_rgba(0,0,0,0.08)] hover:shadow-md transition-shadow"
      >
        {{ item.text }}
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'cardClick', payload: { id?: string | number; text: string }): void
}>()

const props = defineProps<{
  title: string
  items: { id?: string | number; text: string }[]
}>()

function handleClick(item: { id?: string | number; text: string }) {
  emit('cardClick', item)
}
</script>
