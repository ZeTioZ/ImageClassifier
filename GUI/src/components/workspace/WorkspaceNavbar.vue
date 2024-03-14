<script setup>
import Funnel from '@/components/icons/Funnel.vue';


const emits = defineEmits(['toggleSortModal']);
</script>

<template>
  <nav class="w-full bg-ls-vert-base h-12">
    <button @click="$emit('toggleSortModal')" class="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm p-1">
      <Funnel class="w-6 h-6" />
    </button>
  </nav>
</template>
