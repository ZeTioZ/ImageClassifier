<script setup>
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
        <div v-for="(image, index) in props.images" :key="index" class="max-w-xs mx-auto">
          <img :src="image" :alt="`Workspace Image ${index + 1}`" class="rounded shadow">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add styles if necessary */
</style>
