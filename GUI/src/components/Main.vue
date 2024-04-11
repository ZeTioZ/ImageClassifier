<script setup>
import { ref } from 'vue';
import Navbar from '@/components/navbar/Navbar.vue';
import Workspace from '@/components/workspace/Workspace.vue';
import SidebarUpload from '@/components/archive/SidebarUpload.vue';
import AlertsPlaceholder from '@/components/alerts/AlertsPlaceholder.vue';
</script>

<template>
  <main class="flex flex-col h-full static">
    <!-- Main navbar -->
    <Navbar />

    <!-- Page content -->
    <div class="overflow-hidden flex-1 flex flex-row">
      <SidebarUpload />
      <Workspace />
    </div>

    <!-- <AlertsPlaceholder /> -->
  </main>
</template>

