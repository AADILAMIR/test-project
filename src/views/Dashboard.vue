<template>
  <div>
    <Sections title="Summaries" :items="summaryItems" @cardClick="showToast" />
    <Sections title="Quick Menu" :items="quickMenuItems" @cardClick="showToast" />
  </div>
</template>

<script lang="ts" setup>
import Sections from '@/components/SectionsComponent.vue'
import { useToastQueue } from '@/composables/useToastQueue.ts'
import { ref } from 'vue'

const { show } = useToastQueue()
const re = ref()
const summaryItems = [
  { text: 'Total Records' },
  { text: 'Records Pending' },
  { text: 'Processes Pending' },
  { text: 'Submitted Today' },
  { text: 'Submitted this Month' },
]

const quickMenuItems = [
  { text: 'Add a new record' },
  { text: 'View past records' },
  { text: 'Process new records' },
]

function showToast(item: { text: string }) {
  show(`You clicked: ${item.text}`, 'success')
}
</script>
