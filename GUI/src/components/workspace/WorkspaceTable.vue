<script setup>
import ImageCard from '@/components/image/ImageCard.vue';
import draggable from 'vuedraggable';
import { ref, watchEffect } from 'vue';
import arow from '@/components/icons/Arow.vue';

const props = defineProps({
  workspaceName: String,
  images: Object,
  toggleImageSelection: Function,
  moveImages: Function,
  isImageSelected: Function,
  updateImagesIndices: Function,
  selectedImages: Object,
});

// Référence réactive pour les images 
const draggableImages = ref([]);

watchEffect(() => {
  draggableImages.value = props.images.value;
});


// Fonction appelée lorsque le déplacement des images est terminé
function onEnd(event) {
  var newlist = false;
  // Vérifie si l'élément a été déplacé vers une liste différente
  newlist = event.from !== event.to;

  // Affiche les indices de départ et d'arrivée
  console.log('Nouvelle liste:', newlist)
  console.log('Indice de départ:', event.oldIndex);
  console.log('Nouvel indice:', event.newIndex);

  console.log('Images:', draggableImages.value)

  // Mettre à jour les indices dans selectedImages en fonction du déplacement
  props.updateImagesIndices(event.oldIndex, event.newIndex, newlist, props.workspaceName);
}

</script>

<template>
  <div class="flex flex-col text-center h-full">
    <!-- Title -->
    <div class="flex justify-between p-2">
      <div>
        <h2 class="text-xl font-bold text-ls-bleu-fonce underline decoration-ls-vert-base decoration-2">{{ props.workspaceName }}</h2>
      </div>
      <div>
        <!--si aucune image n'est séléctioné alors gris claire sans over et si une ou plusieurs image séléctionée gris foncé avec over-->
        <button v-if="props.selectedImages.length === 0" class=" px-1 py-1 bg-gray-300 text-white text-base font-medium rounded-md w-full shadow-sm ">
          <arow class="w-6 h-6" />
        </button>
        <button v-else @click="moveImages(props.workspaceName)" class=" px-1 py-1 bg-gray-700 hover:bg-gray-800 focus:outline-none
          focus:ring-4 focus:ring-gray-300 text-white text-base font-medium rounded-md w-full shadow-sm ">
          <arow class="w-6 h-6" />
        </button>
      </div>
    </div>
    <!-- Workspace where images are managed -->
    <div class="flex-1 p-2 pt-0 pb-12 overflow-y-auto scrollbar-hide">
      <draggable class="min-h-[400px] grid grid-cols-3 gap-4" group="images" v-model="draggableImages" item-key="index" @end="onEnd">
        <template #item="{ element, index }">
          <div class="flex flex-col items-center" @click="toggleImageSelection(index, props.workspaceName)">
            <ImageCard :image="element" :index="index" :selected="isImageSelected(index, props.workspaceName)" />
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
