<script setup>
import { ref } from 'vue';
import Navbar from '@/components/navbar/Navbar.vue';
import Workspace from '@/components/workspace/Workspace.vue';
import SidebarUpload from '@/components/archive/SidebarUpload.vue';

const images = ref([]);

function newImages(newImages) {
  // console.log(JSON.parse(JSON.stringify(newImages)))
  images.value = newImages;
}
</script>

<template>
  <main class="flex flex-col h-full">
    <!-- Main navbar -->
    <Navbar />

    <!-- Page content -->
    <div class="overflow-hidden flex-1 flex flex-row">
      <SidebarUpload @onNewImages="newImages" />
      <Workspace :images="images" />
    </div>
  </main>
</template>

