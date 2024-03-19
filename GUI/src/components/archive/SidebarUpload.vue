<script setup>
import { ref } from 'vue';

import ArchiveDropzone from '@/components/archive/ArchiveDropzone.vue';
import ArchiveCard from '@/components/archive/ArchiveCard.vue';
import ArchiveSubmit from '@/components/archive/ArchiveSubmit.vue';

const fileData = ref([
  {
    fileName: "archive3.zip",
    fileSize: "95 Mo",
    nbImages: "97"
  },
  {
    fileName: "camp57A.zip",
    fileSize: "1.65 Go",
    nbImages: "256"
  },
  {
    fileName: "20230605.zip",
    fileSize: "1.05 Go",
    nbImages: "188"
  },
  {
    fileName: "archive3.zip",
    fileSize: "95 Mo",
    nbImages: "97"
  }

]);
</script>

<template>
  <aside id="upload-sidebar" class="w-64 h-full transition-transform -translate-x-full translate-x-0" aria-label="Sidebar">
    <div class="h-full px-3 py-4 bg-gray-200 flex flex-col space-y-3 relative">

      <ArchiveDropzone class="h-3/10"/> 

      <div class ='overflow-y-auto h-1/2 scrollbar-hide'>
          <ArchiveCard v-for="file in fileData"
          :key="file.fileName"
          :fileName="file.fileName" 
          :fileSize="file.fileSize" 
          :nbImages="file.nbImages" />
      </div>

      <ArchiveSubmit class="absolute bottom-0 inset-x-0 h-2/10"/>

    </div>
  </aside>
</template>

<style scoped>
/* Masquer la barre de défilement pour tous les éléments ayant la classe .scrollbar-hide */
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Pour les navigateurs Webkit */
}

.scrollbar-hide {
  -ms-overflow-style: none;  /* Pour IE et Edge */
  scrollbar-width: none;  /* Pour Firefox */
}
</style>