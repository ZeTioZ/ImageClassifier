<script setup>
import Tag from '@/components/image/Tag.vue'
import {ref} from 'vue';
const props = defineProps(['imgSrc', 'index', 'fileName', 'tags', 'size', 'resolution']);
const showAdd = ref(false);
const showDel = ref(false);

function closeModal() {
  emit('close');
}
function toggleAdd(){
  showAdd.value = !showAdd.value;
}
function toggleDel(){
  showDel.value = !showDel.value;
}

</script>
<template>
<!-- Extra Large Modal -->
<div id="extralarge-modal" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full" @click.self="closeModal">
    <div class="relative w-full max-w-7xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal body -->
            <div class="flex ">
              <div class="w-2/3">
                <img :src="imgSrc" :alt="`Workspace Image ${index + 1}`" class="h-full w-full object-cover">
              </div>
              <div class="w-1/3">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <span> {{ fileName }} </span>
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Mots-clés :
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <span> {{ tags }} </span>
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <button type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600" @click="toggleAdd">Add</button> 
                  <div v-if="showAdd">
                    <input type="text" id="tagAdd" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tag to add" required />
                  </div>
                  <button type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600" @click="toggleDel">Delete</button>
                  <div v-if="showDel">
                    <input type="text" id="tagDel" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tag to delete" required />
                  </div>
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Détails :
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <span> {{ size }} </span>
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <span> {{ resolution }} </span>
                </p>
                <button type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600" @click="closeModal">Cancel</button>
              </div>
            </div>
        </div>
    </div>
</div>
</template>


<!---
<img :id="fileName" :src="imgSrc" :alt="`Workspace Image ${index + 1}`" class="h-full w-full object-cover">
-->
