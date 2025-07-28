<template>
  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6">{{ props.title }}</h2>
    <div class="flex flex-wrap gap-x-6 gap-y-6 max-w-[960px]">
      <div
        v-for="item in props.items"
        :key="item.id ?? item.text"
        @click="handleClick(item)"
        class="w-64 cursor-pointer bg-white border rounded-lg px-6 py-3 text-gray-800 text-sm shadow-sm hover:shadow-md transition-shadow duration-200 shadow-[2px_2px_1px_0px_rgba(0,_0,_0,_0.5)] border-gray-300"
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
