<script setup>
import { ref, computed } from 'vue';

import ArchiveDropzone from '@/components/archive/ArchiveDropzone.vue';
import ArchiveCard from '@/components/archive/ArchiveCard.vue';
import ArchiveSubmit from '@/components/archive/ArchiveSubmit.vue';

import { Archive } from '@/js/archive';
import { Tag } from '@/js/tag';
import { handleApiResponseForArchiveUploads } from '@/js/utils';
import { API } from '@/api/';


const emits = defineEmits(['onNewImages']);

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
    const archive = archiveList.value[i];

    // manual filter by index with a for loop due to Vue reactivity with nested ref objects (i.e. Proxy)
    if (i !== index) {
      // keep archive
      newArchiveList.push(archive);
    } else {
      // unload archive to free resources used for blob URLs
      archive.unload();
      console.log(`archive '${archive.filename}' unloaded`);
    }
  }
  
  archiveList.value = newArchiveList;

  // remove associated images
  // TODO

  // remove file from file buffer
  fileBuffer.items.remove(index);
}

/**
 * Submit archive(s), tags and batch name and call endpoint
 */
async function submit(newTags) {
  const files = archiveList.value.map(archive => archive.file);

  try {
    // get API response
    const response = await API.uploads.post(files, newTags, null);

    // load image objects from response and archives
    const images = await handleApiResponseForArchiveUploads(response.data, archiveList.value);
    
    emits('onNewImages', images);
  }
  catch (err) {
    // TODO: display the error visualy
    throw err;
  }
} 
</script>

<template>
  <aside id="upload-sidebar" class="w-64 h-full transition-transform -translate-x-full translate-x-0" aria-label="Sidebar">
    <div class="h-full overflow-y-clip bg-gray-200 flex flex-col relative justify-between">

      <ArchiveDropzone @filesUpdated="addArchives" class="p-3" /> 

      <div class="overflow-y-auto space-y-3 flex flex-col px-3 flex-1 scrollbar-hide">
        <span v-for="archive, i in archiveList">
          <ArchiveCard :index="i" :fileName="archive.filename" :fileSize="archive.readableSize" :nbImages="archive.images.length" @deleteItself="removeArchive" />
        </span>
      </div>

      <ArchiveSubmit @submit="submit" class="mt-3"/>

    </div>
  </aside>
</template>

