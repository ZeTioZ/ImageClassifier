<script setup>
import HEllipsis from '@/components/icons/HEllipsis.vue';

const props = defineProps(['fileName', 'fileSize', 'nbImages']); 
</script>

<template>
  <div class="relative m-1">
    <a href="#" class="absolute top-0 right-0">
      <div class="p-1 m-1 rounded-full text-ls-bleu-fonce hover:bg-gray-100">
        <HEllipsis class="w-6 h-6"/>
      </div>
    </a>

    <div class="block max-w-sm p-6 bg-white rounded">
      <h5 class="mb-2 text-lg font-semibold tracking-tight text-ls-bleu-fonce">{{ fileName }}</h5>
      <p class="text-sm font-normal text-gray-700"><strong>{{ nbImages }} images</strong> ({{ fileSize }})</p>
    </div>
  </div>
</template>
