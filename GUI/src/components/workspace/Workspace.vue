<script setup>
import WorkspaceNavbar from '@/components/workspace/WorkspaceNavbar.vue';
import WorkspaceTable from '@/components/workspace/WorkspaceTable.vue';
import SortModal from '@/components/workspace/SortModal.vue';
import { GoodImages, BadImages, tags } from './ImageData';
import { ref, watch, computed } from 'vue';

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
