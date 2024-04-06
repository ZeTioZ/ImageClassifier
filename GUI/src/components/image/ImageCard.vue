<script setup>
import Tag from '@/components/image/Tag.vue';
import VEllipsis from '@/components/icons/VEllipsis.vue';

const props = defineProps(['imgSrc', 'index', 'fileName', 'tags', 'selected']);
</script>

<template>
  <!-- Image Container -->
  <div class="relative rounded  overflow-hidden w-full p-1"
    :class="[props.selected ? 'bg-blue-200' : 'bg-gray-200']">

    <!-- Image header -->
    <div class="flex justify-between py-1 ps-2">
      <!-- Image name -->
      <span class="font-semibold inline-block align-middle my-auto text-ls-bleu-fonce truncate">{{ fileName }}</span>
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
          <Tag v-for="tag in tags" :key="tag.tagname" :tagName="tag.displayName" :class="tag.cssColorClass" />
        </div>
      </div>
    </div>
  </div>
</template>

