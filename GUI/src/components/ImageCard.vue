<script setup>
import Tag from '@/components/Tag.vue';

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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
        </svg>
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
