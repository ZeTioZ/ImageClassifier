<script setup>
import { ref } from 'vue';
import ArchiveSubmitNewTag from '@/components/archive/ArchiveSubmitNewTag.vue';

const emit = defineEmits(['close', 'search']);

const newTag = ref('');   // text in the input
const Tags = ref([]);  // array containing the new tags
const invertSearch = ref(false);  // boolean to invert the search(ie: search without specific tags)
const strictSearch = ref(false);  // boolean to search only the images with all the tags
const showTooltip = ref(false);
const showTooltipStrict = ref(false);

// function to add a new tag in the Tags array
const addNewTag = () => {
  if (newTag.value) {
    Tags.value.push(newTag.value);
    newTag.value = '';
  }
};
// function to remove a tag from the Tags array with its given index
const removeTag = (tagIndex) => {
  Tags.value.splice(tagIndex, 1);
};

function closeModal() {
  emit('close');
}

function searchTags() {
  addNewTag();
  emit('search', [Tags.value, invertSearch.value, strictSearch.value]);
  closeModal();
}
</script>

<template>
  <!-- Modal -->
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto" @click.self="closeModal">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3 text-center">
        <!-- Title -->
        <h3 class="text-lg leading-6 font-medium text-gray-900">Triez par mots-clés</h3>
        <!-- added tags list -->
        <ul class="text-sm space-y-1 text-black-700 list-disc list-inside mt-2">
          <ArchiveSubmitNewTag v-for="tag, i in Tags" :tagName="tag" @remove="removeTag(i)" />
        </ul>
        <!-- Input -->
        <div class="mt-2 px-7 py-3 flex flex-row w-full">
          <input v-model="newTag" id="new-tag" placeholder="Ex.: cérémonie, animateur, etc." @keyup.enter="addNewTag"
            autocomplete="off" class="bg-white border border-gray-300 text-gray-700 text-xs block p-1 w-full rounded-s focus:outline-none" />
          <button @click="addNewTag" class="text-white bg-ls-vert-base p-1 w-10 rounded-e text-xl"><strong>+</strong></button>
        </div>
        <!-- Toggle pour inverser la recherche -->
          <div class="mt-4 relative">
            <label for="toggleInvertSearch" class="flex items-center cursor-pointer">
              <!-- Toggle -->
              <div class="relative">
                <input type="checkbox" id="toggleInvertSearch" class="sr-only" v-model="invertSearch">
                <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                <div class="toggle-dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
              </div>
              <!-- Label -->
              <span @mouseenter="showTooltip = true" @mouseleave="showTooltip = false" class="ml-3 text-gray-700 font-medium">
                Recherche excluante
              </span>
              <div v-if="showTooltip" class="absolute left-32 ml-3 w-64 bg-black text-white p-2 rounded-md shadow-lg text-xs">
                Exclut les éléments contenant les mots-clés spécifiés.
              </div>
            </label>
          </div>

          <!-- Toggle pour la recherche stricte -->
          <div class="mt-4 relative">
            <label for="toggleStrictSearch" class="flex items-center cursor-pointer">
              <!-- Toggle -->
              <div class="relative">
                <input type="checkbox" id="toggleStrictSearch" class="sr-only" v-model="strictSearch">
                <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                <div class="toggle-dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
              </div>
              <!-- Label -->
              <span @mouseenter="showTooltipStrict = true" @mouseleave="showTooltipStrict = false" class="ml-3 text-gray-700 font-medium">
                Recherche stricte
              </span>
              <div v-if="showTooltipStrict" class="absolute left-32 ml-3 w-64 bg-black text-white p-2 rounded-md shadow-lg text-xs">
                N'affiche/n'exclus que les éléments contenant tous les mots-clés spécifiés.
              </div>
            </label>
          </div>

        <!-- Search button -->
        <div class="items-center px-4 py-3">
          <button id="ok-btn" @click="searchTags" 
            class="px-4 py-2 bg-gray-700 hover:bg-gray-800 focus:outline-none
            focus:ring-4 focus:ring-gray-300 text-white text-base font-medium rounded-md w-full shadow-sm ">
            Chercher
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.toggle-dot {
  border: 2px solid var(--ls-gris);
  transition: transform 0.2s ease-in-out;
}
/* Fond du toggle quand il est coché */
input:checked ~ .w-10 {
  background-color: var(--ls-bleu-fonce); /* Bleu */
}

/*changer la couleur du dot lorsqu'il est coché */
input:checked ~ .toggle-dot {
  border: 2px solid var(--ls-bleu-fonce);
  background-color: #FFF; 
  transform: translateX(24px);
}
</style>
