<script setup>
import { ref } from 'vue';
import ArchiveSubmitNewTag from '@/components/archive/ArchiveSubmitNewTag.vue';

const emit = defineEmits(['close', 'search']);

const newTag = ref('');   // text in the input
const Tags = ref([]);  // array containing the new tags
const invertShearch = ref(false);  // boolean to invert the search(ie: search without specific tags)

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
  emit('search', Tags.value, invertShearch.value);
  closeModal();
}
</script>

<template>
  <!-- Modal -->
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto" @click.self="closeModal">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3 text-center">
        <!-- Title -->
        <h3 class="text-lg leading-6 font-medium text-gray-900">Triez par tag</h3>
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

