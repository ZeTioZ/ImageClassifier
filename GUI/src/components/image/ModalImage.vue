<script setup>
import Tag from '@/components/image/Tag.vue'
const props = defineProps(['imgSrc', 'index', 'fileName', 'tags', 'size', 'resolution']);

</script>
<template>
<!-- Extra Large Modal -->
<div id="extralarge-modal" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full" @click.self="closeModal">
    <div class="relative w-full max-w-7xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="extralarge-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="flex flex-row h-full">
              <img :id="fileName" :src="imgSrc" :alt="`Workspace Image ${index + 1}`" class="h-full w-full object-cover">
              <span> {{ fileName }} </span>
              <span> Mots-clés : </span>
              <span> {{ tags }} </span>
              <span> Détails : </span>
              <span> {{ size }} </span>
              <span> {{ resolution }} </span>
            </div>
        </div>
    </div>
</div>
</template>


<!---
<img :id="fileName" :src="imgSrc" :alt="`Workspace Image ${index + 1}`" class="h-full w-full object-cover">
-->
