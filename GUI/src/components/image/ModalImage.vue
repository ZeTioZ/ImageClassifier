<script setup>
import Tag from '@/components/image/Tag.vue'
import {ref} from 'vue';
const props = defineProps(['imgSrc', 'imgName', 'imgTags', 'imgSize']);
const showAdd = ref(false);
const showDel = ref(false);
const emit = defineEmits(['close', 'add', 'del']);

function closeModal() {
  emit('close');
}
function toggleAdd(){
  showAdd.value = !showAdd.value;
}
function toggleDel(){
  showDel.value = !showDel.value;
}
function tagToAdd() {
  emit('add', addTag.value);
}
function tagToDel() {
  emit('del', delTag.value);
}

</script>
<template>
<!-- Extra Large Modal -->
<div id="extralarge-modal" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto bg-gray-600 bg-opacity-50 md:inset-0 h-[calc(100%-1rem)] max-h-full" @click.self="closeModal">
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
                      <Tag v-for="tag in imgTags" :key="tag.name" :tagName="tag.name" :class="tag.color" />
                    </div>
                  </div>
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400" style="margin-bottom: 10px;">
                  <button type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10" @click="toggleAdd">Ajouter</button> 
                  <div v-if="showAdd">
                    <input v-model="addTag" type="text" id="tagAdd" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Mot-clé à ajouter" @keyup.enter="tagToAdd"/>
                  </div>
                  <button type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10" @click="toggleDel">Supprimer</button>
                  <div v-if="showDel">
                    <input v-model="delTag" type="text" id="tagDel" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Mot-clé à supprimer" @keyup.enter="tagToDel"/>
                  </div>
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
