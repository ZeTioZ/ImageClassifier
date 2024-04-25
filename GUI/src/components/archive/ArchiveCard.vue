<script setup>
import XMark from '@/components/icons/XMark.vue';

const emit = defineEmits(['deleteItself']);

const props = defineProps(['index', 'fileName', 'fileSize', 'nbImages']);
</script>

<template>
  <div class="relative">
    <a href="#" class="absolute top-0 right-0" @click="$emit('deleteItself', index)"> 
      <div class="p-1 m-1 rounded-full text-ls-bleu-fonce hover:bg-gray-100">
        <XMark class="w-4 h-4"/>
      </div>
    </a>

    <div class="block max-w-sm p-6 bg-white rounded">
      <h5 class="mb-2 text-lg font-semibold tracking-tight text-ls-bleu-fonce">{{ fileName }}</h5>
      <p class="text-sm font-normal text-gray-700"><strong>{{ nbImages }} images</strong> ({{ fileSize }})</p>
    </div>
  </div>
</template>
