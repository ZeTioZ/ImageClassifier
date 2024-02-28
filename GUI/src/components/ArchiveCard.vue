<script setup>
const props = defineProps(['fileName', 'fileSize', 'nbImages']); 
</script>

<template>
  <div class="relative">
    <a href="#" class="absolute top-0 right-0">
      <div class="p-1 m-1 rounded-full hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
      </div>
    </a>

    <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100">
      <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-800">{{ fileName }}</h5>
      <p class="text-sm font-normal text-gray-700">{{ nbImages }} images ({{ fileSize }})</p>
    </a>
  </div>
</template>
