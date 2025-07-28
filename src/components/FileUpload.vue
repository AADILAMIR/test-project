<template>
  <div class="mb-6">
    <label class="block text-sm font-medium text-gray-700 mb-2">
      Seal Images
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div
      class="border-2 border-dashed rounded-md text-center transition-colors"
      :class="{
        'border-gray-300 bg-white': !isDragOver,
        'border-blue-400 bg-blue-50': isDragOver,
        'border-red-300 bg-red-50': hasError,
      }"
      @dragover.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
      @drop.prevent="onDrop"
    >
      <div class="p-4 sm:p-6">
        <div class="flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3039/3039381.png"
            alt="upload"
            class="w-12 h-12 sm:w-16 sm:h-16 mb-2 opacity-40"
          />
          <p class="text-xs sm:text-sm text-gray-500 mb-2">Drag seal images here to upload.</p>
          <p class="text-gray-400 text-xs sm:text-sm">Or</p>
        </div>

        <input
          :id="inputId"
          type="file"
          multiple
          accept="image/*"
          class="hidden"
          @change="onChange"
          ref="inputRef"
        />

        <label
          :for="inputId"
          class="inline-block mt-2 px-4 py-2 bg-white border border-gray-400 text-gray-700 rounded cursor-pointer hover:bg-gray-100 text-xs sm:text-sm transition-colors"
        >
          Select Images
        </label>

        <!-- Show error message if required and no images -->
        <div v-if="hasError" class="mt-2 text-red-600 text-xs">At least one image is required</div>

        <!-- Display uploaded images -->
        <div v-if="images.length" class="mt-4 space-y-2 text-left">
          <div class="text-sm font-medium text-gray-700 mb-2">
            Uploaded Images ({{ images.length }})
          </div>
          <div
            v-for="(file, idx) in images"
            :key="idx"
            class="flex flex-col sm:flex-row sm:items-center justify-between border px-3 py-2 rounded bg-white shadow-sm hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center gap-2 max-w-full sm:max-w-[70%]">
              <!-- Show image preview if it's an image file -->
              <div class="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded overflow-hidden bg-gray-100">
                <img
                  v-if="isImageFile(file)"
                  :src="getImagePreview(file)"
                  :alt="file.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <i class="fas fa-file text-gray-400 text-sm"></i>
                </div>
              </div>
              <div class="truncate w-full">
                <p class="text-sm font-medium text-gray-800 truncate">{{ file.name }}</p>
                <p class="text-xs text-gray-500 truncate">
                  {{ formatFileSize(file.size) }} • {{ getImageDimensions(file) }}
                </p>
              </div>
            </div>
            <div class="flex items-center justify-end gap-3 mt-2 sm:mt-0">
              <button
                @click="previewFile(file)"
                class="text-gray-600 hover:text-gray-900 transition-colors"
                title="Preview image"
              >
                <i class="fas fa-eye"></i>
              </button>
              <button
                @click="remove(idx)"
                class="text-red-500 hover:text-red-700 text-lg leading-none transition-colors"
                title="Remove image"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'

const props = defineProps<{
  modelValue: File[]
  inputId: string
  required?: boolean
  maxFiles?: number
  maxSizePerFile?: number // in MB
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', files: File[]): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const images = ref<File[]>([...props.modelValue])
const isDragOver = ref(false)
const imagePreviews = ref<Map<File, string>>(new Map())

// Computed properties
const hasError = computed(() => props.required && images.value.length === 0)

// File handling methods
const onChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files) {
    addFiles(Array.from(files))
  }
}

const onDrop = (e: DragEvent) => {
  isDragOver.value = false
  const droppedFiles = e.dataTransfer?.files
  if (droppedFiles) {
    addFiles(Array.from(droppedFiles))
  }
}

const addFiles = (newFiles: File[]) => {
  // Filter only image files
  const imageFiles = newFiles.filter((file) => file.type.startsWith('image/'))

  if (imageFiles.length === 0) {
    alert('Please select only image files.')
    return
  }

  // Check file size limit
  if (props.maxSizePerFile) {
    const oversizedFiles = imageFiles.filter(
      (file) => file.size > props.maxSizePerFile! * 1024 * 1024,
    )
    if (oversizedFiles.length > 0) {
      alert(`Some files exceed the ${props.maxSizePerFile}MB size limit.`)
      return
    }
  }

  // Check max files limit
  let filesToAdd = imageFiles
  if (props.maxFiles) {
    const availableSlots = props.maxFiles - images.value.length
    if (availableSlots <= 0) {
      alert(`Maximum ${props.maxFiles} files allowed.`)
      return
    }
    filesToAdd = imageFiles.slice(0, availableSlots)
  }

  // Add files and create previews
  images.value = [...images.value, ...filesToAdd]
  filesToAdd.forEach((file) => createImagePreview(file))

  emit('update:modelValue', images.value)
}

const remove = (index: number) => {
  const fileToRemove = images.value[index]

  // Clean up preview URL
  if (imagePreviews.value.has(fileToRemove)) {
    URL.revokeObjectURL(imagePreviews.value.get(fileToRemove)!)
    imagePreviews.value.delete(fileToRemove)
  }

  images.value.splice(index, 1)
  emit('update:modelValue', images.value)
}

// Utility methods
const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/')
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const createImagePreview = (file: File) => {
  if (isImageFile(file)) {
    const url = URL.createObjectURL(file)
    imagePreviews.value.set(file, url)
  }
}

const getImagePreview = (file: File): string => {
  return imagePreviews.value.get(file) || ''
}

const getImageDimensions = (file: File): string => {
  // This would require loading the image to get dimensions
  // For now, just return the file type
  return file.type.split('/')[1].toUpperCase()
}

const previewFile = (file: File) => {
  const url = imagePreviews.value.get(file) || URL.createObjectURL(file)
  window.open(url, '_blank')
}

// Watchers and lifecycle
watch(
  () => props.modelValue,
  (newFiles) => {
    imagePreviews.value.forEach((url, file) => {
      if (!newFiles.includes(file)) {
        URL.revokeObjectURL(url)
        imagePreviews.value.delete(file)
      }
    })

    images.value = [...newFiles]
    newFiles.forEach((file) => {
      if (!imagePreviews.value.has(file)) {
        createImagePreview(file)
      }
    })
  },
  { deep: true },
)

// Create initial previews
onMounted(() => {
  images.value.forEach((file) => createImagePreview(file))
})

// Cleanup on unmount
const cleanup = () => {
  imagePreviews.value.forEach((url) => URL.revokeObjectURL(url))
  imagePreviews.value.clear()
}

// Cleanup when component is destroyed
watch(() => false, cleanup)
</script>
