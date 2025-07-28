<template>
  <div class="flex">
    <SidebarComponent :isExpanded="sidebarExpanded" @close="sidebarExpanded = false" />
    <div :class="['transition-all duration-300 flex-1 min-h-screen bg-white', 'ml-20']">
      <div class="p-10">
        <PageHeader
          :icon="currentIcon"
          :title="currentTitle"
          :sidebarOpen="sidebarExpanded"
          :color="currentColor"
          @toggle-sidebar="sidebarExpanded = !sidebarExpanded"
        />
      </div>

      <main class="p-6 pt-0">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type FunctionalComponent } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import { Squares2X2Icon, Cog6ToothIcon, PlusIcon } from '@heroicons/vue/24/solid'
import SidebarComponent from '@/components/SidebarComponent.vue'
const sidebarExpanded = ref(false)

const route = useRoute()

const headerMap: Record<string, { icon: FunctionalComponent; title: string; color?: string }> = {
  '/': { icon: Squares2X2Icon, title: 'Dashboard' },
  '/add-record': { icon: PlusIcon, title: 'Add Record', color: 'text-green-600' },
  '/dashboard': { icon: Squares2X2Icon, title: 'Dashboard' },
  '/settings': { icon: Cog6ToothIcon, title: 'Settings' },
}

const currentIcon = computed(() => headerMap[route.path]?.icon || '📁')
const currentTitle = computed(() => headerMap[route.path]?.title || 'Untitled')
const currentColor = computed(() => headerMap[route.path]?.color || 'text-blue-600')
</script>
