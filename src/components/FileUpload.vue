<template>
  <div class="mb-6">
    <label class="block text-sm font-medium text-gray-700 mb-2">
      Images
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div
      class="border-2 border-dashed border-gray-300 rounded-md text-center transition-colors p-4 sm:p-6 lg:p-8"
      :class="{
        'bg-white': !isDragOver,
        'border-blue-400 bg-blue-50': isDragOver,
        'border-red-300 bg-red-50': hasError,
      }"
      @dragover.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
      @drop.prevent="onDrop"
    >
      <div class="flex flex-col items-center">
        <CloudArrowUpIcon
          class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-2 sm:mb-3 text-gray-400"
        />
        <p class="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 px-2">
          Drag files here to upload.
        </p>
        <p class="text-gray-500 text-xs sm:text-sm mb-2">Or</p>

        <input
          :id="inputId"
          type="file"
          multiple
          class="hidden"
          @change="onChange"
          ref="inputRef"
        />

        <label
          :for="inputId"
          class="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 text-xs sm:text-sm font-medium transition-colors"
        >
          Select Files
        </label>
      </div>

      <div v-if="hasError" class="mt-2 text-red-600 text-xs sm:text-sm px-2">
        At least one file is required
      </div>

      <div v-if="files.length" class="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-left">
        <div
          v-for="(file, idx) in files"
          :key="idx"
          class="flex flex-wrap sm:flex-nowrap items-center justify-between border border-gray-200 px-2 sm:px-3 lg:px-4 py-2 sm:py-3 rounded-md bg-white shadow-sm hover:bg-gray-50 transition-colors"
        >
          <!-- File info section - takes available space -->
          <div class="flex items-center gap-2 sm:gap-3 overflow-hidden flex-1 min-w-0">
            <div
              class="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-md shrink-0"
              :class="getFileIconClass(file)"
            >
              <component :is="getFileIcon(file)" class="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div class="truncate min-w-0 flex-1">
              <p class="text-xs sm:text-sm font-medium text-gray-800 truncate" :title="file.name">
                {{ file.name }}
              </p>

              <p class="text-xs text-gray-500 truncate">
                {{ formatFileSize(file.size) }}
              </p>
            </div>
          </div>

          <!-- Action buttons - fixed width -->
          <div class="flex items-center gap-1 sm:gap-2 shrink-0 ml-2">
            <button
              @click="previewFile(file)"
              class="p-1 sm:p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors touch-manipulation"
              title="Preview file"
            >
              <EyeIcon class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              @click="remove(idx)"
              class="p-1 sm:p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors touch-manipulation"
              title="Remove file"
            >
              <XMarkIcon class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { CloudArrowUpIcon, EyeIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useFileHelper } from '@/composables/useFileHelpers'

const props = defineProps<{
  modelValue: File[]
  inputId: string
  required?: boolean
  maxFiles?: number
  maxSizePerFile?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', files: File[]): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const files = ref<File[]>([...props.modelValue])
const isDragOver = ref(false)
const previews = ref<Map<File, string>>(new Map())

const hasError = computed(() => props.required && files.value.length === 0)
const { getFileIcon, getFileIconClass, formatFileSize } = useFileHelper()

const onChange = (e: Event) => {
  const newFiles = (e.target as HTMLInputElement).files
  if (newFiles) addFiles(Array.from(newFiles))
}

const onDrop = (e: DragEvent) => {
  isDragOver.value = false
  const droppedFiles = e.dataTransfer?.files
  if (droppedFiles) addFiles(Array.from(droppedFiles))
}

const addFiles = (newFiles: File[]) => {
  let filtered = newFiles

  if (props.maxSizePerFile) {
    const oversized = filtered.filter((f) => f.size > props.maxSizePerFile! * 1024 * 1024)
    if (oversized.length > 0) {
      alert(`Some files exceed the ${props.maxSizePerFile}MB limit.`)
      return
    }
  }

  if (props.maxFiles) {
    const space = props.maxFiles - files.value.length
    if (space <= 0) {
      alert(`Maximum ${props.maxFiles} files allowed.`)
      return
    }
    filtered = filtered.slice(0, space)
  }

  files.value = [...files.value, ...filtered]
  filtered.forEach((f) => createPreview(f))
  emit('update:modelValue', files.value)
}

const remove = (idx: number) => {
  const file = files.value[idx]
  if (previews.value.has(file)) {
    URL.revokeObjectURL(previews.value.get(file)!)
    previews.value.delete(file)
  }
  files.value.splice(idx, 1)
  emit('update:modelValue', files.value)
}

const createPreview = (file: File) => {
  if (file.type.startsWith('image/')) {
    const url = URL.createObjectURL(file)
    previews.value.set(file, url)
  }
}

const previewFile = (file: File) => {
  const url = previews.value.get(file) || URL.createObjectURL(file)
  window.open(url, '_blank')
}

watch(
  () => props.modelValue,
  (newFiles) => {
    previews.value.forEach((url, file) => {
      if (!newFiles.includes(file)) {
        URL.revokeObjectURL(url)
        previews.value.delete(file)
      }
    })
    files.value = [...newFiles]
    newFiles.forEach((f) => {
      if (!previews.value.has(f)) createPreview(f)
    })
  },
  { deep: true },
)

onMounted(() => {
  files.value.forEach(createPreview)
})
</script>
