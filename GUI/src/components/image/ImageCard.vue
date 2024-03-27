<script setup>
import Tag from '@/components/image/Tag.vue';
import VEllipsis from '@/components/icons/VEllipsis.vue';

import '@/assets/css/scrollbar-hide.css'; 

const props = defineProps(['imgSrc', 'index', 'fileName', 'tags', 'imageSelection']);
</script>

<template>
  <!-- Image Container -->
  <div class="relative rounded bg-gray-200 overflow-hidden w-full p-1">

    <!-- Image header -->
    <div class="flex justify-between py-1 ps-2">
      <!-- Image name -->
      <span class="font-semibold inline-block align-middle my-auto text-ls-bleu-fonce">{{ fileName }}</span>
      <!-- Three dots/menu icon -->
      <a href="#" class="rounded-full hover:bg-gray-300 transition duration-300 text-ls-bleu-fonce p-1">
        <VEllipsis class="w-4 h-4" />
      </a>
    </div>

    <!-- Image in the container -->
    <div class="h-40 w-full p-1">
      <img :src="imgSrc" :alt="`Workspace Image ${index + 1}`" class="h-full w-full object-cover rounded">
    </div>

    <!-- Tags -->
    <div class="w-full flex flex-col p-1">
      <!-- Container pour les tags avec défilement horizontal -->
      <div class="mt-0.5 overflow-y-auto scrollbar-hide">
        <div class="flex">
          <Tag v-for="tag in tags" :key="tag.name" :tagName="tag.name" :class="tag.color" />
          <!-- <Tag v-for="tag in tags" :key="tag" :tagName="tag" :class="tag.color" /> -->
          <!-- <Tag v-for="tag in tags" :key="tag" :tagName="tag" :class="tag.color" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

