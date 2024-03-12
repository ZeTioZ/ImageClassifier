<script setup>
import Workspace from '@/components/workspace/Workspace.vue';
import Funnel from '@/components/icons/Funnel.vue';
import Modal from '@/components/workspace/SortModal.vue';
import { ref, watch, computed } from 'vue';

import IMG1 from '@/assets/IMG/7.jfif';
import IMG2 from '@/assets/IMG/4.jfif';
import IMG3 from '@/assets/IMG/9.jfif';
import IMG4 from '@/assets/IMG/10.jfif';
import IMG5 from '@/assets/IMG/3.jpg';
import IMG7 from '@/assets/IMG/5.jfif';

// Définir les images avec leurs tags correspondants
const images = [
  { imgSrc: IMG1, tags: ['Enfant','Arbre' ,'Chapeau'] },
  { imgSrc: IMG2, tags: ['Rassemblement','Arbre'] },
  { imgSrc: IMG3, tags: ['Feu', 'Groupe'] },
  { imgSrc: IMG4, tags: ['Tobogan','Groupe'] },
  { imgSrc: IMG5, tags: ['Groupe','Danse','Drapeau'] },
  { imgSrc: IMG7, tags: ['Main', 'Groupe'] },
];

const searchTerm = ref('');
const showModal = ref(false);
const refreshKey = ref(0);

function toggleModal() {
  showModal.value = !showModal.value;
}

// Filtrer les images en fonction du terme de recherche
const filteredImages = computed(() => {
  if (!searchTerm.value) {
    return images;
  }
  const matchedImages = images.filter(image => 
    image.tags.some(tag => tag.toLowerCase().includes(searchTerm.value.toLowerCase()))
  );
  const unmatchedImages = images.filter(image => 
    !image.tags.some(tag => tag.toLowerCase().includes(searchTerm.value.toLowerCase()))
  );
  
  // Retourner d'abord les images correspondantes, puis les autres
  return [...matchedImages, ...unmatchedImages];

  //alternative ne retourner que les images correspondantes
  return matchedImages;
  
});

function handleSearch(term) {
  searchTerm.value = term;
  refreshKey.value++;
}

</script>

<template>
  <div class="relative">
    <Workspace :key="refreshKey" workspaceName="Triées" :images="filteredImages" />
    <!-- sort button (TODO: move to its own component later) -->
    <button @click="toggleModal" class="absolute top-0 right-0 text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm p-3 mt-6 me-3">
      <Funnel class="w-6 h-6" />
    </button>
    <!-- Modal conditionnel -->
    <Modal v-if="showModal" @close="toggleModal" @search ="handleSearch" />
  </div>
</template>
