<script setup>
import Workspace from '@/components/workspace/Workspace.vue';
import Funnel from '@/components/icons/Funnel.vue';
import Modal from '@/components/workspace/SortModal.vue';
import { ref } from 'vue';

import IMG1 from '@/assets/IMG/7.jfif';
import IMG2 from '@/assets/IMG/4.jfif';
import IMG3 from '@/assets/IMG/9.jfif';
import IMG4 from '@/assets/IMG/10.jfif';
import IMG5 from '@/assets/IMG/3.jpg';
import IMG7 from '@/assets/IMG/5.jfif';

const showModal = ref(false);

function toggleModal() {
  showModal.value = !showModal.value;
}

// Définir les images avec leurs tags correspondants
const images = [
  { imgSrc: IMG1, tags: ['Enfant','Arbre' ,'Chapeau'] },
  { imgSrc: IMG2, tags: ['Rassemblement','Arbre'] },
  { imgSrc: IMG3, tags: ['Feu', 'Groupe'] },
  { imgSrc: IMG4, tags: ['Tobogan','Groupe'] },
  { imgSrc: IMG5, tags: ['Groupe','Danse','Drapeau'] },
  { imgSrc: IMG7, tags: ['Main', 'Groupe'] },
];
</script>

<template>
  <div class="relative">
    <Workspace workspaceName="Triées" :images="images" />
    <!-- sort button (TODO: move to its own component later) -->
    <button @click="toggleModal" class="absolute top-0 right-0 text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm p-3 mt-6 me-3">
      <Funnel class="w-6 h-6" />
    </button>
    <!-- Modal conditionnel -->
    <Modal v-if="showModal" @close="toggleModal"/>
  </div>
</template>
