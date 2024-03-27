<script setup>
import ImageCard from '@/components/image/ImageCard.vue';
import draggable from 'vuedraggable';
import { ref } from 'vue';
import '@/assets/css/scrollbar-hide.css'; 

const props = defineProps({
  workspaceName: String,
  images: Array
});

// Référence réactive pour les images 
const draggableImages = ref(props.images);

function onEnd(event) {
  // Vérifie si l'élément a été déplacé vers une liste différente
  if (event.from !== event.to) {
    // TO DO modifier les information de l'image 
    console.log('L\'élément a été déplacé vers une autre liste.');

    // Affiche les indices de départ et d'arrivée
    console.log('Indice de départ:', event.oldIndex);
    console.log('Nouvel indice:', event.newIndex);

    console.log(draggableImages.value)

    } else {
    console.log('L\'élément a été réorganisé dans la même liste.');
  }
}
</script>

<template>
  <div class="flex flex-col text-center h-full">
    <!-- Title -->
    <div class="p-2">
      <h2 class="text-xl font-bold text-ls-bleu-fonce underline decoration-ls-vert-base decoration-2">{{ props.workspaceName }}</h2>
    </div>
    <!-- Workspace where images are managed -->
    <div class="flex-1 p-2 pt-0 pb-12 overflow-y-auto scrollbar-hide">
      <draggable class="min-h-[400px] grid grid-cols-3 gap-4" group="images" v-model="draggableImages" item-key="index" @end="onEnd">
        <template #item="{ element, index }">
          <div class="flex flex-col items-center">
            <ImageCard :imgSrc="element.imgSrc" :index="index" fileName="filename.png" :tags="element.tags"/>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
