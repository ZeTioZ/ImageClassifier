<script setup>
import ImageCard from '@/components/ImageCard.vue';

const props = defineProps(['workspaceName', 'images']);
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
      <div class="grid grid-cols-3 gap-4">
        <div v-for="(image, index) in props.images" :key="index" class="flex flex-col items-center">
          <ImageCard :imgSrc="image" :index="index" fileName="filename.png" :tags="['scout', 'enfant']" />  
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Adjust styles if necessary */
</style>

