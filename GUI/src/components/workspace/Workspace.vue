<script setup>
import WorkspaceNavbar from '@/components/workspace/WorkspaceNavbar.vue';
import WorkspaceTable from '@/components/workspace/WorkspaceTable.vue';
import SortModal from '@/components/workspace/SortModal.vue';
import { ref, watch, computed } from 'vue';

import IMG1 from '@/assets/IMG/7.jfif';
import IMG2 from '@/assets/IMG/4.jfif';
import IMG3 from '@/assets/IMG/9.jfif';
import IMG4 from '@/assets/IMG/10.jfif';
import IMG5 from '@/assets/IMG/3.jpg';
import IMG7 from '@/assets/IMG/5.jfif';

// Définir les bonnes images avec leurs tags correspondants
const GoodImages = [
  { imgSrc: IMG1, tags: ['Enfant','Arbre' ,'Chapeau'] },
  { imgSrc: IMG2, tags: ['Rassemblement','Arbre'] },
  { imgSrc: IMG3, tags: ['Feu', 'Groupe'] },
  { imgSrc: IMG4, tags: ['Tobogan','Groupe'] },
  { imgSrc: IMG5, tags: ['Groupe','Danse','Drapeau'] },
  { imgSrc: IMG7, tags: ['Main', 'Groupe'] },
];

import IMG11 from '@/assets/IMG/1.webp';
import IMG12 from '@/assets/IMG/2.jpg';
import IMG13 from '@/assets/IMG/11.jfif';
import IMG14 from '@/assets/IMG/8.jfif';
import IMG15 from '@/assets/IMG/13.jfif';
import IMG16 from '@/assets/IMG/6.jpeg';

// Définir les mauvaises images avec leurs tags correspondants
const BadImages = [
  { imgSrc: IMG11, tags: ['Groupe', 'Assis'] },
  { imgSrc: IMG12, tags: ['Course','Arbre'] },
  { imgSrc: IMG13, tags: ['Roche'] },
  { imgSrc: IMG14, tags: ['Ville'] },
  { imgSrc: IMG15, tags: ['Livre','Flou'] },
  { imgSrc: IMG16, tags: ['Brouillard', 'Arbre'] },
];

const searchTerm = ref('');
const showModal = ref(false);
const refreshKey = ref(0);

function toggleModal() {
  showModal.value = !showModal.value;
}

// Fonction de filtrage 
function filterImages(imagesList) {
  if (!searchTerm.value) {
    return imagesList;
  }
  const matchedImages = imagesList.filter(image => 
    image.tags.some(tag => tag.toLowerCase().includes(searchTerm.value.toLowerCase()))
  );
  const unmatchedImages = imagesList.filter(image => 
    !image.tags.some(tag => tag.toLowerCase().includes(searchTerm.value.toLowerCase()))
  );

  //alternative ne retourner que les images correspondantes
  return matchedImages;
  // Retourner d'abord les images correspondantes, puis les autres
  // return [...matchedImages, ...unmatchedImages];
}

const filteredGoodImages = computed(() => filterImages(GoodImages));
const filteredBadImages = computed(() => filterImages(BadImages));

function handleSearch(term) {
  searchTerm.value = term;
  refreshKey.value++;
}

</script>

<template>
  <div class="flex-1 flex flex-col w-full">
    <!-- navbar -->
    <WorkspaceNavbar @toggleSortModal="toggleModal" />

    <!-- table (ie: columns) -->
    <div class="flex flex-row h-full">
      <WorkspaceTable class="w-1/2 border-e-2 border-gray-500" :key="refreshKey" workspaceName="À supprimer" :images="filteredBadImages" />
      <WorkspaceTable class="w-1/2" :key="refreshKey" workspaceName="Triées" :images="filteredGoodImages" />
    </div>
  </div>

  <!-- MODALS -->
  <SortModal v-if="showModal" @close="toggleModal" @search="handleSearch" />

</template>
