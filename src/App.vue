<!-- <template>
  <div>
    <Sidebar :isExpanded="sidebarExpanded" />

    <div class="transition-all duration-300 min-h-screen bg-white" :class="'ml-20'">
      <main class="p-6 w-[2/3]">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Sidebar from '@/components/SidebarComponent.vue'

const sidebarExpanded = ref(false)
</script> -->

<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar :isExpanded="sidebarExpanded" />

    <!-- Main Area -->
    <div :class="['transition-all duration-300 flex-1 min-h-screen bg-white', 'ml-20']">
      <!-- Page Header -->
      <div class="p-6">
        <PageHeader
          :icon="currentIcon"
          :title="currentTitle"
          :sidebarOpen="sidebarExpanded"
          @toggle-sidebar="sidebarExpanded = !sidebarExpanded"
        />
      </div>

      <!-- Main Content -->
      <main class="p-6 pt-0">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '@/components/SidebarComponent.vue'
import PageHeader from '@/components/PageHeader.vue'

const sidebarExpanded = ref(false)

const route = useRoute()

const headerMap: Record<string, { icon: string; title: string }> = {
  '/': { icon: '📊', title: 'Dashboard' },
  '/add-record': { icon: '➕', title: 'Add Record' },
  '/dashboard': { icon: '📊', title: 'Dashboard' },
  '/settings': { icon: '⚙️', title: 'Settings' },
}

const currentIcon = computed(() => headerMap[route.path]?.icon || '📁')
const currentTitle = computed(() => headerMap[route.path]?.title || 'Untitled')
</script>
