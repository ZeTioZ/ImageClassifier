<script setup>
const props = defineProps(['fileName', 'fileSize', 'nbImages']); 
</script>

<template>
  <div>
    <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100">
      <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-800">{{ fileName }}</h5>
      <p class="text-sm font-normal text-gray-700">{{ nbImages }} images ({{ fileSize }})</p>
    </a>
  </div>
</template>
