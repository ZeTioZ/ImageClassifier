<script setup>
import ImageCard from '@/components/image/ImageCard.vue';
import draggable from 'vuedraggable';
import { ref } from 'vue';

const props = defineProps(['workspaceName', 'images']);

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
      <draggable class="grid grid-cols-3 gap-4" v-model="draggableImages" item-key="index" @end="onEnd">
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
  console.log('Élément déplacé:', event);
}
</script>

<style scoped>
/* Adjust styles if necessary */
</style>

