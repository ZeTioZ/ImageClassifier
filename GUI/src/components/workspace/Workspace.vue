<script setup>
import ImageCard from '@/components/image/ImageCard.vue';
import draggable from 'vuedraggable';
import { ref } from 'vue';

const props = defineProps(['workspaceName', 'images']);

//référence réactive pour les images
const draggableImages = ref(props.images);

</script>

<template>
  <div class="flex flex-col text-center p-3 h-full">
    <!-- Title -->
    <div class="p-5">
      <h2 class="text-2xl font-bold">{{ props.workspaceName }}</h2>
    </div>

    <!-- Workspace where images are managed -->
    <div class="flex-1 border-gray-500 border-2 rounded-lg bg-gray-100 p-2 overflow-auto">
      <!-- Images Display -->
      <draggable class="min-h-[200px] grid grid-cols-3 gap-4" group="images" v-model="draggableImages" item-key="index" @end="onEnd">
        <template #item="{ element, index }">
          <div class="flex flex-col items-center">
            <ImageCard :imgSrc="element" :index="index" fileName="filename.png" :tags="['scout', 'enfant']"/>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
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

