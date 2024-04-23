<script setup>
import Tag from '@/components/image/Tag.vue'
import VEllipsis from '@/components/icons/VEllipsis.vue';
import ModalImage from './ModalImage.vue';
import { ref } from 'vue';
import { Tag as TagObject } from '@/js/tag.js';

const props = defineProps(['index', 'selected', 'image']);

const showModalI = ref(false);

function toggleModalImage() {
  showModalI.value = !showModalI.value;
}

function handleAdd(term) {
  props.image.tags.push(new TagObject(term, term))
}

function handleDel(term) {
  for (let tag in props.image.tags) {
    if (props.image.tags[tag] === term) {
      props.image.tags.splice(tag, 1);
    }
  }

  for (let tag in props.image.qualityTags) {
    if (props.image.qualityTags[tag] === term) {
      props.image.qualityTags.splice(tag, 1);
    }
  }
}
</script>

<template>
  <!-- Image Container -->
  <div class="relative rounded overflow-hidden w-full h-full p-1"
    :class="[props.selected ? 'bg-blue-200' : 'bg-gray-200']">

    <!-- Image header -->
    <div class="flex justify-between py-1 ps-2">
      <!-- Image name -->
      <span class="font-semibold inline-block align-middle my-auto text-ls-bleu-fonce truncate">{{ image.filename }}</span>
      <!-- Three dots/menu icon -->
      <a href="#" class="rounded-full hover:bg-gray-300 transition duration-300 text-ls-bleu-fonce p-1" @click="event => event.stopPropagation() & toggleModalImage()">
        <VEllipsis class="w-4 h-4"/>
      </a>
    </div>

    <!-- Image in the container -->
    <div class="h-40 w-full p-1">
      <img :src="image._thumbnailBlobURL" :alt="`Workspace Image ${index + 1}`" class="h-full w-full object-cover rounded">
    </div>

    <!-- Tags -->
    <div class="w-full p-1">
      <!-- Container pour les tags avec défilement horizontal -->
      <div class="mt-0.5 overflow-y-auto scrollbar-hide">
        <div class="flex flex-wrap">
          <Tag v-for="tag in image.tags" :key="tag.tagname" :tagName="tag.displayName" :class="tag.cssColorClass" />
          <Tag v-for="tag in image.qualityTags" :key="tag.tagname" :tagName="tag.displayName" :class="tag.cssColorClass" />
        </div>
      </div>
    </div>
  </div>

  <!-- MODALS -->
  <ModalImage v-if="showModalI"
    @close="toggleModalImage" @add="handleAdd" @del="handleDel" @click="event => event.stopPropagation()" :image="image"/>
</template>

