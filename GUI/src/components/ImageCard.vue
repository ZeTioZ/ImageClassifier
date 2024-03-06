<script setup>
import Tag from '@/components/Tag.vue';
import VEllipsis from '@/components/icons/VEllipsis.vue';

const props = defineProps(['imgSrc', 'index', 'fileName', 'tags']);
</script>

<template>
  <!-- Image Container with a simple border -->
  <div class="relative border border-black rounded-lg overflow-hidden h-[200px] w-full">
    <!-- Image occupying 80% of the container -->
    <div class="h-2/3 w-full">
      <img :src="imgSrc" :alt="`Workspace Image ${index + 1}`" class="h-full w-full object-cover">
    </div>
    <!-- Three dots/menu icon -->
    <a href="#" class="absolute top-0 left-0">
      <div class="m-1 rounded-full bg-gray-100">
        <VEllipsis class="w-6 h-6" />
      </div>
    </a>
    <!-- Checkbox for selection -->
    <div class="absolute top-0 right-0 flex items-center m-2">
      <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    </div>
    <!-- Tag occupying the remaining 20% -->
    <div class="h-1/3 w-full flex flex-col justify-center p-1">
      <span class="text-sm font-bold text-center">{{ fileName }}</span>
      <div class="text-sm flex flex-row mt-2">
        <Tag v-for="tag in tags" :tagName="tag" class="bg-[#aa7777]" />
      </div>
    </div>
  </div>
</template>
