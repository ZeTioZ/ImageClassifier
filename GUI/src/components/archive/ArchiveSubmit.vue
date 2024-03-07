<script setup>
import { ref } from 'vue';

import ArchiveSubmitNewTag from '@/components/archive/ArchiveSubmitNewTag.vue';

const newTag = ref('');
const newTags = ref([]);

const addNewTag = () => {
  if (newTag.value) {
    newTags.value.push(newTag.value);
    newTag.value = '';
  }
};
</script>

<template>
  <div class="p-3 m-2 border border-gray-800 bg-gray-100 rounded-md">
    <!-- tags -->
    <div>
      <!-- form -->
      <form v-on:submit.prevent="addNewTag">
        <div class="mb-2">
          <label for="new-tag" class="italic text-sm">Mots-clés par défaut</label>
        </div>
        <div class="flex flex-row w-full">
          <input v-model="newTag" id="new-tag" placeholder="Ex.: voiture, piscine, etc." autocomplete="off" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-l-md block p-1 w-full" />
          <button class="text-white bg-gray-500 hover:bg-gray-600 rounded-r-md p-1 w-8">+</button>
        </div>
      </form>

      <!-- added tags list -->
      <ul class="text-sm space-y-1 text-gray-700 list-disc list-inside mt-2">
        <ArchiveSubmitNewTag v-for="tag in newTags" :tagName="tag" @remove="" />
      </ul>
    </div>

    <!-- submit button-->
    <div class="mt-2">
      <button class="text-white bg-gray-700 hover:bg-gray-900 font-medium rounded-lg text-xl px-5 py-2 focus:outline-none w-full">Trier images</button>
    </div>
  </div>
</template>
