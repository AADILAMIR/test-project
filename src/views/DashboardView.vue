<template>
  <div>
    <SectionsComponent title="Summaries" :items="summaryItems" @cardClick="showToast" />
    <SectionsComponent title="Quick Menu" :items="quickMenuItems" @cardClick="showToast" />
  </div>
</template>

<script lang="ts" setup>
import SectionsComponent from '@/components/SectionsComponent.vue'
import { useToastQueue } from '@/composables/useToastQueue.ts'

const { show } = useToastQueue()

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
