<script setup>
import WorkspaceNavbar from '@/components/workspace/WorkspaceNavbar.vue';
import WorkspaceTable from '@/components/workspace/WorkspaceTable.vue';
import SortModal from '@/components/workspace/SortModal.vue';
import { GoodImages, BadImages } from './ImageData.vue';
import { ref, computed } from 'vue';

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

// Fonction pour déplacer les images sélectionnées d'un workspace spécifique
function moveImages(workspace) {
  // Collecter les images à déplacer sans les retirer immédiatement
  const imagesToMove = selectedImages.value
    .filter(selectedImage => selectedImage.workspace === workspace)
    .map(selectedImage => ({
      ...selectedImage,
      image: workspace === 'Triées' ? GoodImages[selectedImage.index] : BadImages[selectedImage.index]
    }));
  console.log(imagesToMove);
  // Déplacer les images collectées
  imagesToMove.forEach(({ image, index }) => {
    const source = workspace === 'Triées' ? GoodImages : BadImages;
    const target = workspace === 'Triées' ? BadImages : GoodImages;

    // Suppression de l'image de la source
    source.splice(source.findIndex(img => img === image), 1);

    // Ajout de l'image à la destination
    target.push(image);
  });

  // Réinitialiser les sélections après le déplacement
  selectedImages.value = selectedImages.value.filter(selectedImage => selectedImage.workspace !== workspace);
  // Mettre à jour la clé de rafraîchissement pour forcer le re-rendu des tables
  refreshKey.value++;
}

//Fonction pour renvoyer si l'image est sélectionnée ou non
function isImageSelected(imageIndex, workspace) {
  return selectedImages.value.some(
    (selection) => selection.index === imageIndex && selection.workspace === workspace
  );
}

// Fonction pour mettre à jour les indices des images après un déplacement drag-and-drop
function updateImagesIndices(oldIndex, newIndex, movedToNewList, fromWorkspace) {
  if (movedToNewList) {
    // Identifier l'espace de travail cible en fonction de l'espace de travail d'origine
    const targetWorkspace = fromWorkspace === 'Triées' ? 'À supprimer' : 'Triées';
    const source = fromWorkspace === 'Triées' ? GoodImages : BadImages;
    const target = fromWorkspace === 'Triées' ? BadImages : GoodImages;

    // Extraire l'image de la source
    const [movedImage] = source.splice(oldIndex, 1);

    // Ajouter l'image à la destination à la position `newIndex`
    target.splice(newIndex, 0, movedImage);
  } else {
    // Si l'image reste dans le même espace de travail, réorganiser simplement les images
    const imagesList = fromWorkspace === 'Triées' ? GoodImages : BadImages;

    // Extraire l'image déplacée
    const [reorderedImage] = imagesList.splice(oldIndex, 1);

    // Réinsérer l'image à sa nouvelle position
    imagesList.splice(newIndex, 0, reorderedImage);
  }

  // Vider selected images
  selectedImages.value = [];
  
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
      :updateImagesIndices="updateImagesIndices"/>

      <WorkspaceTable class="w-1/2" :key="refreshKey" workspaceName="Triées" 
      :images="filteredGoodImages" :toggleImageSelection="toggleImageSelection" 
      :moveImages="moveImages"  :isImageSelected="isImageSelected" 
      :updateImagesIndices="updateImagesIndices"/>
    </div>
  </div>

  <!-- MODALS -->
  <SortModal v-if="showModal" @close="toggleModal" @search="handleSearch" />

</template>
