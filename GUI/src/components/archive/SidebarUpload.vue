<script setup>
import { ref, computed } from 'vue';

import ArchiveDropzone from '@/components/archive/ArchiveDropzone.vue';
import ArchiveCard from '@/components/archive/ArchiveCard.vue';
import ArchiveSubmit from '@/components/archive/ArchiveSubmit.vue';
import ModalConfigIA from './ModalConfigIA.vue';

import { Archive } from '@/js/archive';
import { Tag } from '@/js/tag';
import { Image } from '@/js/image';
import { handleApiResponseForArchiveUploads } from '@/js/utils';
import { API } from '@/api/';
import { notify } from "@kyvg/vue3-notification";


const emits = defineEmits(['onNewImages']);

// buffer used to store changeable file references before submitting them to the backend,
// allowing user to select file more than once without a reset
const fileBuffer = new DataTransfer();

// data to display in archive cards, each one representing an archive object
const archiveList = ref([]);

// loading button status
const isLoading = ref(false);

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
    
    // push notif 
    notify({
      type: "info",
      title: "Archive chargée",
      text: `Le fichier '${newArchive.filename}' a été chargé.`
    });
  }
}
 
/**
 * update the archive list and buffer (remove an archive)
 *
 * @param {Number} index - index of the archive to remove
 */
function removeArchive(index) {
  // ignore if the files are being uploaded
  if (isLoading.value) {
    return;
  }

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

      // push notif 
      notify({
        type: "info",
        title: "Archive déchargée",
        text: `Le fichier '${archive.filename}' a été déchargé.`
      });
    }
  }
  
  archiveList.value = newArchiveList;

  // remove file from file buffer
  fileBuffer.items.remove(index);
}

/**
 * Submit archive(s), tags and batch name and call endpoint
 */
async function submit(newTags, newName) {
  const files = archiveList.value.map(archive => archive.file);

  try {
    isLoading.value = true;

    // get API response
    const response = await API.uploads.post(files, newTags, newName);

    // load image objects from response and archives
    const images = await handleApiResponseForArchiveUploads(response.data, archiveList.value);
    

    // update image list
    Image.IMAGES = images;

    // archives uploaded success message
    notify({
      type: "success",
      title: "Classification terminée",
      text: "Les images ont été triées et classiffiées par l'IA."
    });
  }

  catch (err) {
    // display error 
    notify({
      type: "error",
      title: "Erreur",
      text: `Une erreur est survenue lors du traitement des images: ${err.code || 'UNK_ERR'}`
    });

    throw err;

  } finally {
    isLoading.value = false;
  }
} 

const showModalC = ref(false);
function toggleModalConfigIA(){
  showModalC.value = !showModalC.value;
}

</script>

<template>
  <aside id="upload-sidebar" class="w-64 h-full transition-transform -translate-x-full translate-x-0" aria-label="Sidebar">
    <div class="h-full overflow-y-clip bg-gray-200 flex flex-col relative justify-between">

      <ArchiveDropzone @filesUpdated="addArchives" class="p-3" :isLoading="isLoading" /> 

      <div class="overflow-y-auto space-y-3 flex flex-col px-3 flex-1 scrollbar-hide">
        <span v-for="archive, i in archiveList">
          <ArchiveCard :index="i" :fileName="archive.filename" :fileSize="archive.readableSize" :nbImages="archive.images.length" @deleteItself="removeArchive" />
        </span>
      </div>

      <ArchiveSubmit @submit="submit" @openModalConfigIA="toggleModalConfigIA" :isLoading="isLoading" class="mt-3"/>

    </div>
  </aside>
  <!-- MODALS -->
  <ModalConfigIA v-if="showModalC" @close="toggleModalConfigIA"/>
</template>
