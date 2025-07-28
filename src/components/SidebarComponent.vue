<template>
  <aside
    class="fixed top-0 left-0 h-screen bg-white z-50 shadow-2xl transition-all duration-300"
    :class="isExpanded ? 'w-64 px-4' : 'w-20 px-2'"
  >
    <div class="flex justify-center py-6">
      <img src="@/assets/logo.svg" alt="NF Logo" class="h-8" />
    </div>

    <nav class="space-y-3">
      <SidebarItem
        :icon="Squares2X2Icon"
        label="Dashboard"
        :isExpanded="isExpanded"
        to="/dashboard"
      />
      <SidebarItem :icon="FolderIcon" label="Records" :isExpanded="isExpanded" to="/add-record" />
      <SidebarItem :icon="UserIcon" label="My Account" :isExpanded="isExpanded" to="/" />
      <SidebarItem :icon="UsersIcon" label="Users" :isExpanded="isExpanded" to="/" />
      <SidebarItem :icon="LockClosedIcon" label="Security" :isExpanded="isExpanded" to="/" />
      <SidebarItem :icon="LightBulbIcon" label="Change Theme" :isExpanded="isExpanded" to="/" />
      <SidebarItem :icon="InformationCircleIcon" label="Info" :isExpanded="isExpanded" to="/" />
    </nav>
  </aside>
</template>

<script lang="ts" setup>
import SidebarItem from './SidebarItemComponent.vue'
import {
  Squares2X2Icon,
  FolderIcon,
  UserIcon,
  UsersIcon,
  LockClosedIcon,
  LightBulbIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline'

defineProps<{ isExpanded: boolean }>()
</script>
