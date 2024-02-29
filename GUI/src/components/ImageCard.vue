<script setup>
const props = defineProps(['imgSrc', 'index', 'fileName', 'tags']);
</script>

<template>
  <!-- Image Container with a simple border -->
  <div class="border border-black rounded-lg overflow-hidden" style="height: 200px; width: 200px;">
    <!-- Image occupying 80% of the container -->
    <div class="h-3/4 w-full">
      <img :src="imgSrc" :alt="`Workspace Image ${index + 1}`" class="h-full w-full object-cover">
    </div>
    <!-- Three dots/menu icon -->
    <div class="absolute top-0 right-0 p-2">
      <button class="text-lg leading-none">⋮</button>
    </div>
    <!-- Tag occupying the remaining 20% -->
    <div class="h-1/4 w-full flex flex-col justify-center p-1">
      <span class="text-sm font-bold text-center">{{ fileName }}</span>
      <div class="text-sm overflow-auto">
        <span>tag1, tag2, tag3,... </span>
      </div>
    </div>
  </div>
</template>
