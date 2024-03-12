<script setup>
import ImageCard from '@/components/image/ImageCard.vue';
import draggable from 'vuedraggable';
import { ref, defineProps } from 'vue';

const props = defineProps({
  workspaceName: String,
  images: Array
});

// Référence réactive pour les images (en supposant que vous souhaitiez permettre la réactivité)
const draggableImages = ref(props.images);
</script>

<template>
  <div class="flex flex-col text-center p-3 h-full">
    <div class="p-5">
      <h2 class="text-2xl font-bold">{{ props.workspaceName }}</h2>
    </div>
    <div class="flex-1 border-gray-500 border-2 rounded-lg bg-gray-100 p-2 overflow-auto">
      <draggable class="min-h-[200px] grid grid-cols-3 gap-4" group="images" v-model="draggableImages" item-key="index" @end="onEnd">
        <template #item="{ element, index }">
          <div class="flex flex-col items-center">
            <ImageCard :imgSrc="element.imgSrc" :index="index" fileName="filename.png" :tags="element.tags"/>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
