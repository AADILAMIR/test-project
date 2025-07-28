<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'
import BaseButton from './BaseButton.vue'
import CardWrapper from './CardWrapper.vue'

interface Sample {
  id: number
  date: string
  time: string
  description: string
  analysis: string
}

interface ValidationErrors {
  [key: string]: string | undefined
}

const props = defineProps<{
  sealIndex: number
  samples?: Sample[]
  validationErrors?: ValidationErrors
}>()

const emit = defineEmits<{
  (e: 'update-samples', samples: Sample[]): void
}>()

const samples = ref<Sample[]>(props.samples || [])

const timeSlots = Array.from({ length: 96 }, (_, i) => {
  const h = String(Math.floor(i / 4)).padStart(2, '0')
  const m = String((i % 4) * 15).padStart(2, '0')
  return `${h}:${m}:00`
})

const getFieldError = (sampleIndex: number, field: string): string => {
  const sealIndex = props.sealIndex - 1
  const fieldPath = `seals.${sealIndex}.samples.${sampleIndex}.${field}`
  return props.validationErrors?.[fieldPath] || ''
}

const sampleHasErrors = (sampleIndex: number): boolean => {
  const sealIndex = props.sealIndex - 1
  const samplePrefix = `seals.${sealIndex}.samples.${sampleIndex}`
  return Object.keys(props.validationErrors || {}).some((key) => key.startsWith(samplePrefix))
}

const updateSample = <K extends keyof Sample>(sampleIndex: number, field: K, value: Sample[K]) => {
  samples.value[sampleIndex][field] = value
  emit('update-samples', [...samples.value])
}

const removeSample = (sampleIndex: number) => {
  if (samples.value.length <= 1) return
  samples.value.splice(sampleIndex, 1)
  emit('update-samples', [...samples.value])
}

// const addSample = () => {
//   const newSample: Sample = {
//     id: samples.value.length + 1,
//     date: '',
//     time: '15:00:00',
//     description: '',
//     analysis: '',
//   }
//   samples.value.push(newSample)
//   emit('update-samples', [...samples.value])
// }

// Watch for props changes
watch(
  () => props.samples,
  (newSamples) => {
    if (newSamples) {
      samples.value = [...newSamples]
    }
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <div class="space-y-4">
    <div v-for="(sample, sampleIndex) in samples" :key="sample.id">
      <CardWrapper
        :title="`Sample ${sampleIndex + 1}`"
        :class="{ 'border-red-300': sampleHasErrors(sampleIndex) }"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <BaseInput
            type="date"
            label="Sample Date"
            :model-value="sample.date"
            @update:modelValue="updateSample(sampleIndex, 'date', $event)"
            :error="getFieldError(sampleIndex, 'date')"
            required
          />

          <BaseSelect
            label="Sample Time"
            :model-value="sample.time"
            @update:modelValue="updateSample(sampleIndex, 'time', $event)"
            :options="timeSlots"
            :error="getFieldError(sampleIndex, 'time')"
            required
          />
        </div>

        <div class="grid grid-cols-1 gap-4">
          <BaseInput
            label="Description"
            :model-value="sample.description"
            @update:modelValue="updateSample(sampleIndex, 'description', $event)"
            :error="getFieldError(sampleIndex, 'description')"
            placeholder="Enter sample description"
            required
          />

          <BaseInput
            label="Analysis"
            :model-value="sample.analysis"
            @update:modelValue="updateSample(sampleIndex, 'analysis', $event)"
            :error="getFieldError(sampleIndex, 'analysis')"
            placeholder="Enter analysis details (optional)"
          />
        </div>

        <div v-if="samples.length > 1" class="flex justify-end mt-4">
          <BaseButton @click="removeSample(sampleIndex)" variant="primary" size="sm">
            Remove Sample
          </BaseButton>
        </div>
      </CardWrapper>
    </div>
  </div>
</template>
