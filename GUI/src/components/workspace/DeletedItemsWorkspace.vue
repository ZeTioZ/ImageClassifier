<script setup>
import Workspace from '@/components/workspace/Workspace.vue';

import IMG1 from '@/assets/IMG/1.webp';
import IMG2 from '@/assets/IMG/2.jpg';
import IMG3 from '@/assets/IMG/11.jfif';
import IMG4 from '@/assets/IMG/8.jfif';
import IMG5 from '@/assets/IMG/13.jfif';
import IMG6 from '@/assets/IMG/6.jpeg';

// Définir les images avec leurs tags correspondants
const images = [
  { imgSrc: IMG1, tags: ['Groupe', 'Assis'] },
  { imgSrc: IMG2, tags: ['Course','Arbre'] },
  { imgSrc: IMG3, tags: ['Roche'] },
  { imgSrc: IMG4, tags: ['Ville'] },
  { imgSrc: IMG5, tags: ['Livre','Flou'] },
  { imgSrc: IMG6, tags: ['Brouillard', 'Arbre'] },
];
</script>

<template>
  <Workspace workspaceName="À supprimer" :images="images" />
</template>
