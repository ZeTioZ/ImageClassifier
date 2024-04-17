<script setup>
import WorkspaceNavbar from '@/components/workspace/WorkspaceNavbar.vue';
import WorkspaceTable from '@/components/workspace/WorkspaceTable.vue';
import SortModal from '@/components/workspace/SortModal.vue';
import { ref, computed } from 'vue';
import { Image } from '@/js/image';

const searchTerms = ref([]);
const showModal = ref(false);
const refreshKey = ref(0);
const invertSearch = ref(false);  // boolean to invert the search(ie: search without specific tags)
const strictSearch = ref(false);  // boolean to search only the images with all the tags

const resetSearch = () => {
  searchTerms.value = [];
  invertSearch.value = false;
  strictSearch.value = false;
  refreshKey.value++;
};


// base images lists from props
const goodImages = computed(() => Image.IMAGES.filter(img => !img.toBeDeleted));
const badImages = computed(() => Image.IMAGES.filter(img => img.toBeDeleted));

// computed ref, filtering constantly the images when a change is applied
const filteredGoodImages = computed(() => ref(filterImages(goodImages)));
const filteredBadImages = computed(() => ref(filterImages(badImages)));

/**
* Function to display or hide the filter modal
*/
function toggleModal() {
  showModal.value = !showModal.value;
}

// Fonction de filtrage 
function filterImages(imagesList) {
  if (!searchTerms.value || searchTerms.value.length === 0) {
    return imagesList.value;
  }

  return imagesList.value.filter(image => {
    const tagMatched = strictSearch.value ? 
      searchTerms.value.every(searchTerm => 
        image.tags.some(imageTag => 
          imageTag.displayName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ) : 
      image.tags.some(imageTag => 
        searchTerms.value.some(searchTag => 
          imageTag.displayName.toLowerCase().includes(searchTag.toLowerCase())
        )
      );

    // if invert search, invert tag matched
    return !invertSearch.value ? tagMatched : !tagMatched;
  });
}

function handleSearch(terms) {
  invertSearch.value = terms[1];
  searchTerms.value = terms[0];
  strictSearch.value = terms[2];
  refreshKey.value++;
}

// Référence réactive pour les images sélectionnées
const selectedImages = ref([]);

// Fonction pour basculer la sélection d'une image
function toggleImageSelection(imageIndex, workspace) {
  const imageID = {index: imageIndex, workspace: workspace};
  const selectedIndex = selectedImages.value.findIndex(
    (image) => image.index === imageIndex && image.workspace === workspace
  );
  if (selectedIndex >= 0) {
    selectedImages.value.splice(selectedIndex, 1); // Désélectionner
  } else {
    selectedImages.value.push(imageID); // Sélectionner
  }
}

// Fonction pour déplacer les images sélectionnées d'un workspace spécifique
function moveImages(workspace) {
  // Collecter les images à déplacer sans les retirer immédiatement
  const imagesToMove = selectedImages.value
    .filter(selectedImage => selectedImage.workspace === workspace)
    .map(selectedImage => ({
      ...selectedImage,
      image: workspace === 'Triées' ? goodImages.value[selectedImage.index] : badImages.value[selectedImage.index]
    }));

  // Déplacer les images collectées
  imagesToMove.forEach(({ image, index }) => {
    const source = workspace === 'Triées' ? goodImages.value : badImages.value;
    const target = workspace === 'Triées' ? badImages.value : goodImages.value;

    // Suppression de l'image de la source
    source.splice(source.findIndex(img => img === image), 1);

    // Ajout de l'image à la destination
    target.push(image);

    // modification du flag toBeDeleted de l'image
    image.toBeDeleted = !image.toBeDeleted;
  });

  // Réinitialiser les sélections après le déplacement
  selectedImages.value = selectedImages.value.filter(selectedImage => selectedImage.workspace !== workspace);
  // Mettre à jour la clé de rafraîchissement pour forcer le re-rendu des tables
  refreshKey.value++;
}

// Fonction pour renvoyer si l'image est sélectionnée ou non
function isImageSelected(imageIndex, workspace) {
  // console.log(imageIndex, workspaceName);
  return selectedImages.value.some(
    (selection) => selection.index === imageIndex && selection.workspace === workspace
  );
}

// Fonction pour mettre à jour les indices des images après un déplacement drag-and-drop
function updateImagesIndices(oldIndex, newIndex, movedToNewList, fromWorkspace) {
  if (movedToNewList) {
    // Identifier l'espace de travail cible en fonction de l'espace de travail d'origine
    const targetWorkspace = fromWorkspace === 'Triées' ? 'À supprimer' : 'Triées';
    const source = fromWorkspace === 'Triées' ? goodImages.value : badImages.value;
    const target = fromWorkspace === 'Triées' ? badImages.value : goodImages.value;

    // Extraire l'image de la source
    const [imageToMove] = source.splice(oldIndex, 1);

    // Ajouter l'image à la destination à la position `newIndex`
    target.splice(newIndex, 0, imageToMove);

    // update image toBeDeleted flag
    imageToMove.toBeDeleted = !imageToMove.toBeDeleted;
  } else {
    // Si l'image reste dans le même espace de travail, réorganiser simplement les images
    const imagesList = fromWorkspace === 'Triées' ? goodImages.value : badImages.value;

    // Extraire l'image déplacée
    const [imageToReorder] = imagesList.splice(oldIndex, 1);

    // Réinsérer l'image à sa nouvelle position
    imagesList.splice(newIndex, 0, imageToReorder);
  }

  // Vider selected images après le déplacement si l'image a changé de place
  if (movedToNewList || oldIndex !== newIndex){
    selectedImages.value = [];
  }  
}
</script>

<template>
  <div class="flex-1 flex flex-col w-full">
    <!-- navbar -->
    <WorkspaceNavbar :searchTerms="searchTerms" :invertShearch="invertSearch" :strictSearch="strictSearch" @toggleSortModal="toggleModal" @resetSearch="resetSearch" />

    <!-- table (ie: columns) -->
    <div class="flex flex-row h-full">
      <WorkspaceTable class="w-1/2 border-e-2 border-gray-500" :key="refreshKey" workspaceName="À supprimer"
        :images="filteredBadImages" :toggleImageSelection="toggleImageSelection" 
        :moveImages="moveImages"  :isImageSelected="isImageSelected" 
        :updateImagesIndices="updateImagesIndices"
        :selectedImages="selectedImages"/>

      <WorkspaceTable class="w-1/2" :key="refreshKey" workspaceName="Triées"
        :images="filteredGoodImages" :toggleImageSelection="toggleImageSelection" 
        :moveImages="moveImages"  :isImageSelected="isImageSelected" 
        :updateImagesIndices="updateImagesIndices"
        :selectedImages="selectedImages"/>
    </div>
  </div>

  <!-- MODALS -->
  <SortModal v-if="showModal" @close="toggleModal" @search="handleSearch" />

</template>
