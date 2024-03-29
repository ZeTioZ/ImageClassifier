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
function updateSelectedImagesIndices(oldIndex, newIndex, movedToNewList, fromWorkspace) {
    if (movedToNewList) {
        // Pour le déplacement vers une nouvelle liste
        selectedImages.value = selectedImages.value.filter(selection =>
            !(selection.index === oldIndex && selection.workspace === fromWorkspace)
        );
    } else {
        // Réarrangement au sein de la même liste
        selectedImages.value.forEach(selection => {
            if (selection.workspace !== fromWorkspace) {
                // Pas d'ajustement nécessaire si l'image n'est pas dans la liste affectée
                return;
            }

            if (selection.index === oldIndex) {
                // Mise à jour de l'indice pour l'image déplacée
                selection.index = newIndex;
            } else if (oldIndex < newIndex) {
                // L'image a été déplacée vers le bas, ajustement des indices nécessaire pour les images entre les deux positions
                if (selection.index > oldIndex && selection.index <= newIndex) {
                    selection.index -= 1;
                }
            } else if (oldIndex > newIndex) {
                // L'image a été déplacée vers le haut, ajustement des indices nécessaire pour les images entre les deux positions
                if (selection.index < oldIndex && selection.index >= newIndex) {
                    selection.index += 1;
                }
            }
        });
    }

    // Filtre pour supprimer toute sélection invalide après mise à jour
    selectedImages.value = selectedImages.value.filter(selection => selection.index !== false);
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
