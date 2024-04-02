<script setup>
import Tag from '@/components/image/Tag.vue';
import Add from '@/components/icons/Add.vue';
import {ref} from "vue";
const add = ref(false)
const props = defineProps(['imgSrc', 'imgName', 'imgTags', 'imgSize', 'imgSup']);
const emit = defineEmits(['close', 'add', 'del']);

function closeModal() {
  emit('close');
}
function tagToAdd() {
  emit('add', addTag.value);
}
function tagToDel(term) {
  emit('del', term.value);
}
function addTag(){
  add = !add;
}

</script>
<template>
<!-- Extra Large Modal -->
<div id="extralarge-modal" tabindex="-1" class="fixed inset-0 top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto bg-gray-600 bg-opacity-50 md:inset-0 h-[calc(100%-1rem)] max-h-full" @click.self="closeModal">
    <div class="relative w-full max-w-7xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <div class="modal-header">
            <h2 class="text-xl font-bold">{{ imgName }}</h2>
          </div>
            <!-- Modal body -->
            <div class="flex ">
              <div class="w-2/3">
                <img :src="imgSrc" class="h-full w-full object-cover">
              </div>
              <div class="w-1/3">
                <p class="text-base leading-relaxed text-gray-500" style="margin-bottom: 1px;">
                  <b>Mots-clés :</b>
                </p>
                <p class="text-base leading-relaxed text-gray-500" style="margin-bottom: 10px;">
                  <div class="mt-0.5 overflow-y-auto scrollbar-hide">
                    <div class="flex m-3">
                      <Tag v-for="tag in imgTags" @delete="tagToDel()" :key="tag.name" :tagName="tag.name" :class="tag.color" :inModal="'pomelo'"/>
                      <Add class="w-6 h-5"@click=addTag/> 
                      <input v-if="add"id="tag" placeholder="Ex.: voiture, piscine, etc." @keyup.enter="tagToAdd" autocomplete="off" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-l-md block p-1 w-full" />                   
                    </div>
                  </div>
                </p>
                <p v-if="imgSup != null" class="text-base leading-relaxed text-gray-500" style="margin-bottom: 10px;">
                  <b>Raisons de suppression:</b>
                </p>
                <p v-if="imgSup != null" class="text-base leading-relaxed text-gray-500" style="margin-bottom: 10px;">
                  {{ imgSup }}
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400" style="margin-bottom: 1px;">
                  <b>Détails :</b>
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400" style="margin-bottom: 10px;">
                  398x456
                  <!--{{ imgSize }}-->
                </p>
                <button type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 " @click="closeModal">Retour</button>
              </div>
            </div>
        </div>
    </div>
</div>
</template>


<!---
<img :id="fileName" :src="imgSrc" :alt="`Workspace Image ${index + 1}`" class="h-full w-full object-cover">
-->
