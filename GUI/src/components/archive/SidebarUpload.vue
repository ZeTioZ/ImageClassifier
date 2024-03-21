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
  }
]);

function humanFileSize(sizeInBytes) {
  const units = ['o', 'Ko', 'Mo', 'Go', 'To'];
  const i = sizeInBytes == 0 
    ? 0 
    : Math.floor(Math.log(sizeInBytes) / Math.log(1000));

  const size = (sizeInBytes / Math.pow(1000, i)).toFixed(2) * 1;
  const unit = units[i];

  return `${size} ${unit}`;
}

function updateArchiveList(archives) {
  console.log(archives);

  archives.forEach(archive => {

    fileData.value.push({
      fileName: archive.name,
      fileSize: humanFileSize(archive.size),
      nbImages: 0
    });
  });
}
</script>

<template>
  <aside id="upload-sidebar" class="w-64 h-full transition-transform -translate-x-full translate-x-0" aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-200 flex flex-col space-y-3 relative">

      <ArchiveDropzone @filesUpdated="updateArchiveList" /> 

      <span v-for="file in fileData">
        <ArchiveCard :fileName="file.fileName" :fileSize="file.fileSize" :nbImages="file.nbImages" />
      </span>

      <ArchiveSubmit class="absolute bottom-0 inset-x-0"/>

    </div>
  </aside>
</template>
