<script setup>
import Cloud from '@/components/icons/Cloud.vue';
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <Cloud class="w-8 h-8 mb-4 text-gray-700" /> 
        <p class="mb-2 text-sm text-gray-900 text-center"><span class="font-semibold">Cliquer pour uploader</span><br> ou glisser et déposer</p>            <p class="text-xs text-gray-500">.ZIP</p>
      </div>
      <input id="dropzone-file" type="file" class="hidden" />
    </label>
  </div> 
</template>
