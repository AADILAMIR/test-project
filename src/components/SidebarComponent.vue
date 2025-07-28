<template>
  <aside
    ref="sidebarRef"
    class="fixed top-0 left-0 h-screen bg-white z-50 shadow-2xl transition-all duration-300"
    :class="isExpanded ? 'w-50 px-4' : 'w-20 px-2'"
  >
    <div class="flex justify-center py-10">
      <img src="@/assets/logo.svg" alt="NF Logo" class="h-8" />
    </div>

    <nav class="space-y-3">
      <SidebarItemComponent
        :icon="Squares2X2Icon"
        label="Dashboard"
        :isExpanded="isExpanded"
        to="/dashboard"
      />
      <SidebarItemComponent
        :icon="FolderIcon"
        label="Records"
        :isExpanded="isExpanded"
        to="/add-record"
      />
      <SidebarItemComponent :icon="UserIcon" label="My Account" :isExpanded="isExpanded" to="/" />
      <SidebarItemComponent :icon="UsersIcon" label="Users" :isExpanded="isExpanded" to="/" />
      <SidebarItemComponent
        :icon="LockClosedIcon"
        label="Security"
        :isExpanded="isExpanded"
        to="/"
      />
      <SidebarItemComponent
        :icon="LightBulbIcon"
        label="Change Theme"
        :isExpanded="isExpanded"
        to="/"
      />
      <SidebarItemComponent
        :icon="InformationCircleIcon"
        label="Info"
        :isExpanded="isExpanded"
        to="/"
      />
    </nav>
  </aside>
</template>

<script lang="ts" setup>
import SidebarItemComponent from './SidebarItemComponent.vue'
import {
  Squares2X2Icon,
  FolderIcon,
  UserIcon,
  UsersIcon,
  LockClosedIcon,
  LightBulbIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/solid'
import { onMounted, onBeforeUnmount, ref } from 'vue'

defineProps<{ isExpanded: boolean }>()

const emit = defineEmits<{
  (e: 'close', event: Event): void
}>()

const sidebarRef = ref<HTMLElement | null>(null)

function handleOutsideClick(event: MouseEvent) {
  const target = event.target as HTMLElement

  const clickedToggleButton = target.closest('[data-sidebar-toggle]')
  const clickedInsideSidebar = sidebarRef.value?.contains(target)

  if (!clickedInsideSidebar && !clickedToggleButton) {
    emit('close', event)
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>
