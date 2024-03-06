<script setup>
import HEllipsis from '@/components/icons/HEllipsis.vue';

const props = defineProps(['fileName', 'fileSize', 'nbImages']); 
</script>

<template>
  <div class="relative">
    <a href="#" class="absolute top-0 right-0">
      <div class="p-1 m-1 rounded-full hover:bg-gray-100">
        <HEllipsis class="w-6 h-6"/>
      </div>
    </a>

    <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100">
      <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-800">{{ fileName }}</h5>
      <p class="text-sm font-normal text-gray-700">{{ nbImages }} images ({{ fileSize }})</p>
    </a>
  </div>
</template>
