<script setup>
import { ref } from 'vue';

import ArchiveDropzone from '@/components/archive/ArchiveDropzone.vue';
import ArchiveCard from '@/components/archive/ArchiveCard.vue';
import ArchiveSubmit from '@/components/archive/ArchiveSubmit.vue';

const fileData = ref([
  {
    fileName: "archive3.zip",
    fileSize: "95MB",
    nbImages: "97"
  },
  {
    fileName: "camp57A.zip",
    fileSize: "1.65GB",
    nbImages: "256"
  },
  {
    fileName: "20230605.zip",
    fileSize: "1.05GB",
    nbImages: "188"
  }
])
</script>

<template>
  <aside id="upload-sidebar" class="z-40 w-64 h-full transition-transform -translate-x-full translate-x-0" aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-100 border-e border-black flex flex-col space-y-3 relative">

      <ArchiveDropzone /> 

      <span v-for="file in fileData">
        <ArchiveCard :fileName="file.fileName" :fileSize="file.fileSize" :nbImages="file.nbImages" />
      </span>

      <ArchiveSubmit class="absolute bottom-2 inset-x-0"/>

    </div>
  </aside>
</template>
