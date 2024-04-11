<script setup>
import { ref } from 'vue';
import ArchiveSubmitNewTag from '@/components/archive/ArchiveSubmitNewTag.vue';
import Gear from '@/components/icons/Gear.vue';

const emit = defineEmits(['submit','openModalConfigIA']);

const newTag = ref('');   // text in the input
const newTags = ref([]);  // array containing the new tags

// function to add a new tag in the newTags array
const addNewTag = () => {
  if (newTag.value) {
    newTags.value.push(newTag.value);
    newTag.value = '';
  }
};

const newNameInput = ref('');   // text in the input
const newName = ref('');   // valid new name

// function to replace the newName with the newNameInput
const addNewName = () => {
  if (newNameInput.value) {
    newName.value = newNameInput.value;
    newNameInput.value = '';
  }
};

// function to remove a tag from the newTags array with its given index
const removeTag = (tagIndex) => {
  newTags.value.splice(tagIndex, 1);
};
</script>

<template>
  <div class="p-3 bg-ls-eclaireurs">
    <!-- tags -->
    <div>
      <!-- form -->
      <form v-on:submit.prevent="addNewTag">
        <div class="flex flex-wrap items-center justify-between mx-auto mb-2">
          <label for="new-tag" class="italic text-sm text-white">Mots-clés par défaut:</label>
          <!-- hack to put right part on the right -->
          <span />
          <button @click="$emit('openModalConfigIA')" class="text-white hover:bg-white hover:text-ls-bleu-fonce rounded text-sm p-1 transition duration-300">
            <Gear class="w-6 h-6" />
          </button>
        </div>

        <div class="flex flex-row w-full">
          <input v-model="newTag" id="new-tag" placeholder="Ex.: cérémonie, animateur, etc." autocomplete="off" class="bg-white text-gray-700 text-xs block p-1 w-full rounded-s focus:outline-none" />
          <button class="text-white bg-ls-vert-base p-1 w-10 rounded-e text-xl"><strong>+</strong></button>
        </div>
      </form>

      <!-- added tags list -->
      <ul class="overflow-y-auto max-h-24 text-sm space-y-1 text-white list-disc list-inside mt-2">
        <ArchiveSubmitNewTag v-for="tag, i in newTags" :tagName="tag" @remove="removeTag(i)" />
      </ul>
    </div>

    <!-- Nom des images -->
    <div>
      <!-- form -->
      <form v-on:submit.prevent="addNewName">
        <div class="mb-2">
          <label for="new-name" class="italic text-sm text-white">Nom des images par défaut: <span class="text-ls-vert-base">{{ newName }}</span></label>
        </div>
        <div class="flex flex-row w-full">
          <input v-model="newNameInput" id="new-name" placeholder="Ex.: Camp-53e-2018" autocomplete="off" class="bg-white text-gray-700 text-xs block p-1 w-full rounded-s focus:outline-none" />
          <button class="text-white bg-ls-vert-base p-1 w-10 rounded-e text-xl"><strong>✓</strong></button>
        </div>
      </form>
    </div>
    <!-- submit button-->
    <div class="mt-2">
      <button class="text-ls-bleu-fonce bg-white hover:bg-ls-bleu-fonce hover:text-ls-vert-base border hover:border-ls-vert-base font-medium rounded-full text-xl px-5 py-2 focus:outline-none w-full transition duration-300" @click="$emit('submit', newTags, newName)">Trier les images</button>
    </div>
  </div>
</template>
