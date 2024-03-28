<script setup>
import WorkspaceNavbar from '@/components/workspace/WorkspaceNavbar.vue';
import WorkspaceTable from '@/components/workspace/WorkspaceTable.vue';
import SortModal from '@/components/workspace/SortModal.vue';
import { ref, watch, computed } from 'vue';

// tags
const tags = {
  enfant:         {name: 'Enfant',        color: 'bg-ls-vert-base'},
  arbre:          {name: 'Arbre',         color: 'bg-ls-vert-fonce'},
  chapeau:        {name: 'Chapeau',       color: 'bg-ls-bleu-fonce'},
  rassemblement:  {name: 'Rassemblement', color: 'bg-ls-louveteaux'},
  feu:            {name: 'Feu',           color: 'bg-ls-eclaireurs'},
  groupe:         {name: 'Groupe',        color: 'bg-ls-pionniers'},
  tobogan:        {name: 'Tobogan',       color: 'bg-ls-mondial'},
  danse:          {name: 'Danse',         color: 'bg-ls-prune'},
  drapeau:        {name: 'Drapeau',       color: 'bg-ls-orange'},
  main:           {name: 'Main',          color: 'bg-ls-bleu-clair'},
  assis:          {name: 'Assis',         color: 'bg-ls-rouge'},
  course:         {name: 'Course',        color: 'bg-ls-rose'},
  roche:          {name: 'Roche',         color: 'bg-gray-800'},
  ville:          {name: 'Ville',         color: 'bg-teal-800'},
  flou:           {name: 'Flou',          color: 'bg-indigo-800'},
  brouillard:     {name: 'Brouillard',    color: 'bg-red-800'},
  livre:          {name: 'Livre',         color: 'bg-black'}
};

import IMG1 from '@/assets/IMG/7.jfif';
import IMG2 from '@/assets/IMG/4.jfif';
import IMG3 from '@/assets/IMG/9.jfif';
import IMG4 from '@/assets/IMG/10.jfif';
import IMG5 from '@/assets/IMG/3.jpg';
import IMG7 from '@/assets/IMG/5.jfif';

// Définir les bonnes images avec leurs tags correspondants
const GoodImages = [
  { imgSrc: IMG1, tags: [tags['enfant'], tags['arbre'], tags['chapeau']] },
  { imgSrc: IMG2, tags: [tags['rassemblement'], tags['arbre']] },
  { imgSrc: IMG3, tags: [tags['feu'], tags['groupe']] },
  { imgSrc: IMG4, tags: [tags['tobogan'], tags['groupe']] },
  { imgSrc: IMG5, tags: [tags['groupe'], tags['danse'], tags['drapeau']] },
  { imgSrc: IMG7, tags: [tags['main'], tags['groupe']] },
];

import IMG11 from '@/assets/IMG/1.webp';
import IMG12 from '@/assets/IMG/2.jpg';
import IMG13 from '@/assets/IMG/11.jfif';
import IMG14 from '@/assets/IMG/8.jfif';
import IMG15 from '@/assets/IMG/13.jfif';
import IMG16 from '@/assets/IMG/6.jpeg';

// Définir les mauvaises images avec leurs tags correspondants
const BadImages = [
  { imgSrc: IMG11, tags: [tags['groupe'], tags['assis']] },
  { imgSrc: IMG12, tags: [tags['course'], tags['arbre']] },
  { imgSrc: IMG13, tags: [tags['roche']] },
  { imgSrc: IMG14, tags: [tags['ville']] },
  { imgSrc: IMG15, tags: [tags['livre'], tags['flou']] },
  { imgSrc: IMG16, tags: [tags['brouillard'], tags['arbre']] },
];

const searchTerms = ref([]);
const showModal = ref(false);
const refreshKey = ref(0);
const invertShearch = ref(false);  // boolean to invert the search(ie: search without specific tags)

function toggleModal() {
  showModal.value = !showModal.value;
}

// Fonction de filtrage 
function filterImages(imagesList) {
  if (!searchTerms.value || searchTerms.value.length === 0) {
    return imagesList;
  }
  if (!invertShearch.value){
  return imagesList.filter(image => 
    image.tags.some(imageTag =>
      searchTerms.value.some(searchTag =>
        imageTag.name.toLowerCase().includes(searchTag.toLowerCase())
      )
    )
  );
  }
  else{
  return imagesList.filter(image =>
    !image.tags.some(imageTag =>
      searchTerms.value.some(searchTag =>
        imageTag.name.toLowerCase().includes(searchTag.toLowerCase())
      )
    )
  );
  }
}

const filteredGoodImages = computed(() => filterImages(GoodImages));
const filteredBadImages = computed(() => filterImages(BadImages));

function handleSearch(terms) {
  invertShearch.value = terms[1];
  searchTerms.value = terms[0];
  refreshKey.value++;
}


// Référence réactive pour les images sélectionnées
const selectedImages = ref([]);

// Fonction pour basculer la sélection d'une image
function toggleImageSelection(imageIndex, workspace) {
  const imageID = {index: imageIndex, workspace: workspace};
  console.log(imageID);
  const selectedIndex = selectedImages.value.findIndex(
    (image) => image.index === imageIndex && image.workspace === workspace
  );
  console.log(selectedIndex);
  if (selectedIndex >= 0) {
    selectedImages.value.splice(selectedIndex, 1); // Désélectionner
  } else {
    selectedImages.value.push(imageID); // Sélectionner
  }
  console.log(imageIndex);
  console.log("selected images:",selectedImages.value);
}
// Fonction pour déplacer les images sélectionnées
function moveImages() {
  selectedImages.value.forEach((selectedImage) => {
    // Déterminer la source et la destination en fonction du workspace de l'image sélectionnée
    const source = selectedImage.workspace === 'Triées' ? GoodImages : BadImages;
    const target = selectedImage.workspace === 'Triées' ? BadImages : GoodImages;
    
    // Trouver l'image dans la source en utilisant l'index
    const image = source.find((img, index) => index === selectedImage.index);

    // Supprimer l'image de la source
    if (image) {
      source.splice(source.indexOf(image), 1);

      // Ajouter l'image à la destination
      target.push(image);
    }
  });

  // Réinitialiser les sélections après le déplacement
  selectedImages.value = [];
}
//Fonction pour renvoyer si l'image est sélectionnée ou non
function isImageSelected(imageIndex, workspace) {
  return selectedImages.value.some(
    (selection) => selection.index === imageIndex && selection.workspace === workspace
  );
}
// Fonction pour mettre à jour les indices des images sélectionnées après un déplacement
function updateSelectedImagesIndices(oldIndex, newIndex, newlist) {
  if (newlist) {
    // Si l'élément a été déplacé vers une nouvelle liste, ajustez les indices des éléments restants dans l'ancienne liste
    const updatedSelectedIndices = selectedImages.value.map(selectedIndex => {
      // Réduire les indices des éléments qui étaient après l'élément déplacé
      if (selectedIndex > oldIndex) {
        return selectedIndex - 1;
      }
      else if (selectedIndex === oldIndex) {
        return false;
      }
      return selectedIndex;
    });

    // Mettre à jour le tableau des indices sélectionnés
    selectedImages.value = updatedSelectedIndices;
  } else {
    // Gérer le réarrangement au sein de la même liste
    const updatedSelectedIndices = selectedImages.value.map(selectedIndex => {
      if (selectedIndex === oldIndex) {
        return newIndex;
      } else if (oldIndex < newIndex && selectedIndex > oldIndex && selectedIndex <= newIndex) {
        return selectedIndex - 1;
      } else if (oldIndex > newIndex && selectedIndex < oldIndex && selectedIndex >= newIndex) {
        return selectedIndex + 1;
      }
      return selectedIndex;
    });

    // Mettre à jour le tableau des indices sélectionnés
    selectedImages.value = updatedSelectedIndices;
  }

  console.log(selectedImages.value);
}
</script>

<template>
  <div class="flex-1 flex flex-col w-full">
    <!-- navbar -->
    <WorkspaceNavbar @toggleSortModal="toggleModal" />

    <!-- table (ie: columns) -->
    <div class="flex flex-row h-full">
      <WorkspaceTable class="w-1/2 border-e-2 border-gray-500" :key="refreshKey" workspaceName="À supprimer" 
      :images="filteredBadImages" :toggleImageSelection="toggleImageSelection" 
      :moveImages="moveImages"  :isImageSelected="isImageSelected" 
      :updateSelectedImagesIndices="updateSelectedImagesIndices"/>

      <WorkspaceTable class="w-1/2" :key="refreshKey" workspaceName="Triées" 
      :images="filteredGoodImages" :toggleImageSelection="toggleImageSelection" 
      :moveImages="moveImages"  :isImageSelected="isImageSelected" 
      :updateSelectedImagesIndices="updateSelectedImagesIndices"/>
    </div>
  </div>

  <!-- MODALS -->
  <SortModal v-if="showModal" @close="toggleModal" @search="handleSearch" />

</template>
