<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close', 'search']);
const newTag = ref('');

function closeModal() {
  emit('close');
}

function searchTags() {
  emit('search', newTag.value);
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
        <!-- Input -->
        <div class="mt-2 px-7 py-3">
          <input v-model="newTag" id="new-tag" placeholder="Ex.: voiture, piscine, etc." @keyup.enter="searchTags"
            autocomplete="off" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-l-md block p-1 w-full" />
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

