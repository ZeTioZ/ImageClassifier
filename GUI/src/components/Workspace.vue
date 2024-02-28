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
        <div v-for="(image, index) in props.images" :key="index" class="flex flex-col items-center">
          <!-- Image Container with a simple border -->
          <div class="border border-black rounded-lg overflow-hidden" style="height: 200px; width: 200px;">
            <!-- Image occupying 80% of the container -->
            <div class="h-3/4 w-full">
              <img :src="image" :alt="`Workspace Image ${index + 1}`" class="h-full w-full object-cover">
            </div>
            <!-- Three dots/menu icon -->
            <div class="absolute top-0 right-0 p-2">
              <button class="text-lg leading-none">⋮</button>
            </div>
            <!-- Tag occupying the remaining 20% -->
            <div class="h-1/4 w-full flex flex-col justify-center p-1">
              <span class="text-sm font-bold text-center">Nom du fichier</span>
              <div class="text-sm overflow-auto">
                <span>tag1, tag2, tag3,... </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* Adjust styles if necessary */
</style>

