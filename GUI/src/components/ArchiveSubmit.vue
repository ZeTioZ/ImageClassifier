<script setup>
import { ref } from 'vue';

import ArchiveSubmitNewTag from '@/components/ArchiveSubmitNewTag.vue';

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
  <div class="p-3">
    <!-- tags -->
    <div>
      <form v-on:submit.prevent="addNewTag">
        <label for="new-tag">Ajouter un mot-clé</label>
        <input v-model="newTag" id="new-tag" placeholder="Ex.: voiture, piscine, etc." />
        <button>+</button>
      </form>
      <ul>
        <ArchiveSubmitNewTag v-for="tag in newTags" :tagName="tag" @remove="" />
      </ul>
    </div>

    <!-- submit button-->
    <div>
      <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 focus:outline-none w-full">Trier images</button>
    </div>
  </div>
</template>
