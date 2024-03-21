<script setup>
import Cloud from '@/components/icons/Cloud.vue';
import { loadZip, download } from '@/archives/archive-manager.js';

const emit = defineEmits(['filesUpdated']);

async function click () {
  const fileInput = document.getElementById("dropzone-file");

  let a = await loadZip(fileInput.files[0], 'cp437');
  download(a[0].file); 
}

function updateFileList(event) {
  emit('filesUpdated', event.target.files);
}
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-42 border-2 border-ls-bleu-fonce border-dashed rounded cursor-pointer bg-white transition duration-300 hover:border-ls-vert-base">
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <Cloud class="w-8 h-8 mb-4 text-ls-bleu-fonce" /> 
        <p class="mb-2 text-sm text-ls-bleu-fonce text-center"><strong>Cliquer pour uploader</strong><br>(ou glisser et déposer)</p>
        <p class="text-xs font-bold text-gray-700">.zip</p>
      </div>
      <input id="dropzone-file" type="file" accept=".zip" class="hidden" @change="updateFileList" multiple />
    </label>
    
    <button @click="click">click</button>

  </div> 
</template>
