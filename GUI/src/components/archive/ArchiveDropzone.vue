<script setup>
import Cloud from '@/components/icons/Cloud.vue';
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-42 border-2 border-ls-bleu-fonce border-dashed rounded cursor-pointer bg-white">
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <Cloud class="w-8 h-8 mb-4 text-ls-bleu-fonce" /> 
        <p class="mb-2 text-sm text-ls-bleu-fonce text-center"><strong>Cliquer pour uploader</strong><br>(ou glisser et déposer)</p>
        <p class="text-xs font-bold text-gray-700">.zip</p>
      </div>
      <input id="dropzone-file" type="file" class="hidden" />
    </label>
  </div> 
</template>
