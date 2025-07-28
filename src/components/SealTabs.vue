<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, computed } from 'vue'
import SealForm from './SealForm.vue'
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'
import CardWrapper from './CardWrapper.vue'
import FileUpload from './FileUpload.vue'

interface Sample {
  id: number
  date: string
  time: string
  description: string
  analysis: string
}

interface Seal {
  id: number
  receptionDate: string
  sealState: string
  images: File[]
  samples?: Sample[]
}

interface ValidationErrors {
  [key: string]: string | undefined
}

const props = defineProps<{
  sealsData: Seal[]
  errors?: ValidationErrors
}>()

const emit = defineEmits<{
  (e: 'update-seals', updatedSeals: Seal[]): void
  (e: 'validation-change', isValid: boolean, errors: ValidationErrors): void
}>()

const seals = ref<Seal[]>(props.sealsData)
const selectedSeal = ref(0)
const validationErrors = ref<ValidationErrors>({})

const validateSeal = (seal: Seal, index: number): ValidationErrors => {
  const errors: ValidationErrors = {}
  const sealPrefix = `seals.${index}`

  if (!seal.receptionDate) {
    errors[`${sealPrefix}.receptionDate`] = 'Reception date is required'
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(seal.receptionDate)) {
    errors[`${sealPrefix}.receptionDate`] = 'Invalid date format'
  }

  if (!seal.sealState) {
    errors[`${sealPrefix}.sealState`] = 'Seal state is required'
  }

  if (!seal.images || seal.images.length === 0) {
    errors[`${sealPrefix}.images`] = 'At least one image is required'
  }

  if (seal.samples && seal.samples.length > 0) {
    seal.samples.forEach((sample, sampleIndex) => {
      const samplePrefix = `${sealPrefix}.samples.${sampleIndex}`

      if (!sample.date) {
        errors[`${samplePrefix}.date`] = 'Sample date is required'
      } else if (!/^\d{4}-\d{2}-\d{2}$/.test(sample.date)) {
        errors[`${samplePrefix}.date`] = 'Invalid date format'
      }

      if (!sample.time) {
        errors[`${samplePrefix}.time`] = 'Sample time is required'
      } else if (!/^\d{2}:\d{2}:00$/.test(sample.time)) {
        errors[`${samplePrefix}.time`] = 'Invalid time format'
      }

      if (!sample.description.trim()) {
        errors[`${samplePrefix}.description`] = 'Description is required'
      }
    })
  }

  return errors
}

const validateAllSeals = (): ValidationErrors => {
  const allErrors: ValidationErrors = {}

  if (seals.value.length === 0) {
    allErrors['seals'] = 'At least one seal is required'
    return allErrors
  }

  seals.value.forEach((seal, index) => {
    const sealErrors = validateSeal(seal, index)
    Object.assign(allErrors, sealErrors)
  })

  return allErrors
}

const isValid = computed(() => {
  return Object.keys(validationErrors.value).length === 0
})

const getFieldError = (fieldPath: string): string => {
  return validationErrors.value[fieldPath] || ''
}

const updateValidation = () => {
  validationErrors.value = validateAllSeals()
  emit('validation-change', isValid.value, validationErrors.value)
}

const addSeal = () => {
  seals.value.push({
    id: seals.value.length + 1,
    receptionDate: '',
    sealState: '',
    images: [],
    samples: [],
  })
  selectedSeal.value = seals.value.length - 1
  emit('update-seals', seals.value)
  updateValidation()
}

const removeSeal = (index: number) => {
  if (seals.value.length <= 1) return
  seals.value.splice(index, 1)
  if (selectedSeal.value >= index) selectedSeal.value = Math.max(0, selectedSeal.value - 1)
  emit('update-seals', seals.value)
  updateValidation()
}

const handleFileUpload = (sealIndex: number, files: File[]) => {
  seals.value[sealIndex].images = files
  emit('update-seals', seals.value)
  updateValidation()
}

const addSample = (sealIndex: number) => {
  seals.value[sealIndex].samples = seals.value[sealIndex].samples || []
  seals.value[sealIndex].samples!.push({
    id: seals.value[sealIndex].samples!.length + 1,
    date: '',
    time: '15:00:00',
    description: '',
    analysis: '',
  })
  emit('update-seals', seals.value)
  updateValidation()
}

const updateSamples = (sealIndex: number, updatedSamples: Sample[]) => {
  seals.value[sealIndex].samples = updatedSamples
  emit('update-seals', seals.value)
  updateValidation()
}

// const handleSealFieldUpdate = (sealIndex: number, field: keyof Seal, value: any) => {
//   (seals.value[sealIndex] as any)[field] = value
//   emit('update-seals', seals.value)
//   updateValidation()
// }

const handleSealFieldUpdate = <K extends keyof Seal>(
  sealIndex: number,
  field: K,
  value: Seal[K],
) => {
  seals.value[sealIndex][field] = value
  emit('update-seals', seals.value)
  updateValidation()
}

watch(
  () => props.sealsData,
  (newSeals) => {
    seals.value = [...newSeals]
    updateValidation()
  },
  { deep: true, immediate: true },
)

watch(
  () => props.errors,
  (newErrors) => {
    if (newErrors) {
      validationErrors.value = { ...validationErrors.value, ...newErrors }
    }
  },
  { deep: true, immediate: true },
)

updateValidation()
</script>

<template>
  <div class="flex flex-col w-full mx-auto">
    <div class="flex items-center border-b overflow-x-auto">
      <div class="flex pb-2">
        <template v-for="(seal, i) in seals" :key="seal.id">
          <button
            @click="selectedSeal = i"
            class="px-3 py-1 text-sm font-medium border border-b-0 whitespace-nowrap relative"
            :class="{
              'bg-gray-200 text-black border-gray-300': selectedSeal === i,
              'bg-white text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-black':
                selectedSeal !== i,
              'border-red-300': Object.keys(validationErrors).some((key) =>
                key.startsWith(`seals.${i}`),
              ),
            }"
          >
            Seal {{ i + 1 }}
            <span
              v-if="Object.keys(validationErrors).some((key) => key.startsWith(`seals.${i}`))"
              class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
            ></span>
            <button
              v-if="seals.length > 1"
              @click.stop="removeSeal(i)"
              class="ml-2 text-red-500 hover:text-red-700 text-xs"
            >
              ×
            </button>
          </button>
        </template>
        <button
          @click="addSeal"
          class="px-3 py-1 text-sm font-medium bg-white text-gray-700 border border-b-0 rounded-tr-[20px] hover:bg-gray-100 whitespace-nowrap"
        >
          + Add Seal
        </button>
      </div>
    </div>

    <div class="justify-items-center bg-gray-100">
      <div v-for="(seal, i) in seals" :key="seal.id" v-show="selectedSeal === i">
        <CardWrapper :title="`Seal ${i + 1}`">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <BaseInput
                type="date"
                label="Reception Date"
                :model-value="seal.receptionDate"
                @update:modelValue="handleSealFieldUpdate(i, 'receptionDate', $event)"
                :error="getFieldError(`seals.${i}.receptionDate`)"
                required
              />
            </div>

            <div>
              <BaseSelect
                label="Seal State"
                :model-value="seal.sealState"
                @update:modelValue="handleSealFieldUpdate(i, 'sealState', $event)"
                :options="['Intact', 'Damaged']"
                :error="getFieldError(`seals.${i}.sealState`)"
                required
              />
            </div>
          </div>

          <div class="mb-4">
            <FileUpload
              :model-value="seal.images"
              :input-id="`file-upload-${i}`"
              @update:modelValue="handleFileUpload(i, $event)"
              :error="getFieldError(`seals.${i}.images`)"
            />
            <div v-if="getFieldError(`seals.${i}.images`)" class="text-red-600 text-sm mt-1">
              {{ getFieldError(`seals.${i}.images`) }}
            </div>
          </div>
        </CardWrapper>

        <div class="">
          <SealForm
            :sealIndex="i + 1"
            :samples="seal.samples || []"
            :validationErrors="validationErrors"
            @update-samples="updateSamples(i, $event)"
          />
        </div>

        <div class="pb-6">
          <BaseButton @click="addSample(i)" variant="tertiary" class="mt-4 w-full">
            + Add Sample
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
