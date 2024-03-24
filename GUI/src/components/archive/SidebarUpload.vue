<script setup>
import { ref, computed } from 'vue';

import ArchiveDropzone from '@/components/archive/ArchiveDropzone.vue';
import ArchiveCard from '@/components/archive/ArchiveCard.vue';
import ArchiveSubmit from '@/components/archive/ArchiveSubmit.vue';

import { Archive } from '@/js/archive';

// buffer used to store changeable file references before submitting them to the backend,
// allowing user to select file more than once without a reset
const fileBuffer = new DataTransfer();

// data to display in archive cards, each one representing an archive object
const archiveList = ref([]);

/**
 * update the archive list and buffer (new archives)
 *
 * @param {object} archives - object containing new archives to process
 */
async function addArchives(archives) {
  // iterate through new archives 
  for await (const archiveFile of archives) {
    const newArchive = new Archive(archiveFile);

    // load archive
    await newArchive.load();
    console.log(`archive '${newArchive.filename}' loaded: ${newArchive.images.length} image(s)`);

    // add data to card placeholder
    archiveList.value.push(newArchive);

    // update file buffer
    fileBuffer.items.add(archiveFile);
  }
}
 
/**
 * update the archive list and buffer (remove an archive)
 *
 * @param {Number} index - index of the archive to remove
 */
function removeArchive(index) {
  // remove archive from card place holder
  let newArchiveList = [];

  for (var i = 0; i < archiveList.value.length; i++) {
    // manual filter by index with a for loop due to Vue reactivity with nested ref objects (i.e. Proxy)
    if (i !== index) {
      newArchiveList.push(archiveList.value[i]);
    }
  }
  
  archiveList.value = newArchiveList;

  // remove associated images
  // TODO  

  // remove file from file buffer
  fileBuffer.items.remove(index);
}
</script>

<template>
  <aside id="upload-sidebar" class="w-64 h-full transition-transform -translate-x-full translate-x-0" aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-200 flex flex-col space-y-3 relative">

      <ArchiveDropzone @filesUpdated="addArchives" /> 

      <span v-for="archive, i in archiveList">
        <ArchiveCard :index="i" :fileName="archive.filename" :fileSize="archive.readableSize" :nbImages="archive.images.length" @deleteItself="removeArchive" />
      </span>

      <ArchiveSubmit class="absolute bottom-0 inset-x-0"/>

    </div>
  </aside>
</template>
