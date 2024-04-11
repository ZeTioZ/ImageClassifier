<script setup>
import { ref } from 'vue';
import ArchiveSubmitNewTag from '@/components/archive/ArchiveSubmitNewTag.vue';
import Gear from '@/components/icons/Gear.vue';

const emit = defineEmits(['submit', 'openModalConfigIA']);
const props = defineProps(['isLoading']);

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
      <div class="flex flex-wrap items-center justify-between mx-auto mb-2">
        <label for="new-tag" class="italic text-sm text-white">Mots-clés par défaut:</label>
        <!-- hack to put right part on the right -->
        <span />
        <button @click="$emit('openModalConfigIA')" class="text-white hover:bg-white hover:text-ls-bleu-fonce rounded text-sm p-1 transition duration-300">
          <Gear class="w-6 h-6" />
        </button>
      </div>
      <!-- form -->
      <form v-on:submit.prevent="addNewTag">
        <div class="flex flex-row w-full">
          <input v-model="newTag" :disabled="isLoading" id="new-tag" placeholder="Ex.: cérémonie, animateur, etc." autocomplete="off" class="bg-white text-gray-700 text-xs block p-1 w-full rounded-s focus:outline-none" />
          <button class="text-white bg-ls-vert-base p-1 w-10 rounded-e text-xl" :disabled="isLoading"><strong>+</strong></button>
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
          <input v-model="newNameInput" :disabled="isLoading" id="new-name" placeholder="Ex.: Camp-53e-2018" autocomplete="off" class="bg-white text-gray-700 text-xs block p-1 w-full rounded-s focus:outline-none" />
          <button class="text-white bg-ls-vert-base p-1 w-10 rounded-e text-xl" :disabled="isLoading"><strong>✓</strong></button>
        </div>
      </form>
    </div>

    <!-- submit button-->
    <div class="mt-2">
      
      <div v-if="isLoading" class="w-full flex justify-center py-1.5">
        <svg aria-hidden="true" class="w-[34px] h-[34px] text-white animate-spin fill-ls-vert-base" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      </div>

      <button v-else class="text-ls-bleu-fonce bg-white hover:bg-ls-bleu-fonce hover:text-ls-vert-base border hover:border-ls-vert-base font-medium rounded-full text-xl px-5 py-2 focus:outline-none w-full transition duration-300" @click="$emit('submit', newTags, newName)">Trier les images</button>
    </div>
  </div>
</template>
