<script setup>
import { ref } from 'vue';

import ArchiveDropzone from '@/components/archive/ArchiveDropzone.vue';
import ArchiveCard from '@/components/archive/ArchiveCard.vue';
import ArchiveSubmit from '@/components/archive/ArchiveSubmit.vue';

const fileData = ref([]);

/**
 * get a human readable file size (in 'Octets')
 * 
 * @param {Number} sizeInBytes - the size of the file in bytes 
 * @return {string} - the size of the file in a human readable format
 */
function humanFileSize(sizeInBytes) {
  const units = ['o', 'Ko', 'Mo', 'Go', 'To'];
  const i = sizeInBytes == 0 
    ? 0 
    : Math.floor(Math.log(sizeInBytes) / Math.log(1000));

  const size = (sizeInBytes / Math.pow(1000, i)).toFixed(2) * 1;
  const unit = units[i];

  return `${size} ${unit}`;
}

/**
 * update the archive list (ie. fileData)
 *
 * @param {object} archives - object containing new archives to process
 */
function updateArchiveList(archives) {
  console.log(archives);
  const newFileData = [];

  archives.forEach(archive => {

    newFileData.push({
      fileName: archive.name,
      fileSize: humanFileSize(archive.size),
      nbImages: 0
    });
  });

  fileData.value = newFileData;
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
