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
    <div class="flex-1 border-gray-500 border-2 rounded-lg bg-gray-100 p-2">

    </div>
  </div>
</template>
