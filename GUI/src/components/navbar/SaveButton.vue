<script setup>
import Download from '@/components/icons/Download.vue';
import { Tag } from '@/js/tag.js';
import { Image } from '@/js/image.js';
import { API } from '@/api'; 

async function save() {
  const JSON = {};

  JSON["classes"] = Tag.TAGS.map(t => t.tagname);

  Image.IMAGES.forEach(image => JSON[image.hash] = image.toJSON());

  await API.tags.post(JSON);
}
</script>

<template>
  <a href="#" class="
    block flex flex-row py-2 px-3 border rounded-full items-center
    text-ls-bleu-fonce font-semibold bg-white 
    transition duration-300 
    hover:bg-ls-bleu-fonce hover:text-ls-vert-base hover:border-ls-vert-base
  " @click="save">
    <Download class="w-6 h-6" />
    <span class="ms-1">Sauvegarder</span>
  </a>
</template>
