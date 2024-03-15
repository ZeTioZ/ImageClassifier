<script setup>
import Funnel from '@/components/icons/Funnel.vue';

const emits = defineEmits(['toggleSortModal']);
</script>

<template>
  <nav class="w-full bg-ls-vert-base p-1">
    <div class="flex flex-wrap items-center justify-between mx-auto">
     
      <!-- hack to put right part on the right -->
      <span />

      <div class="block w-auto my-auto">
        <button @click="$emit('toggleSortModal')" class="text-ls-bleu-fonce hover:bg-ls-bleu-fonce hover:text-white rounded text-sm p-1 transition duration-300">
          <Funnel class="w-6 h-6" />
        </button>
      </div>

    </div>
  </nav>
</template>
