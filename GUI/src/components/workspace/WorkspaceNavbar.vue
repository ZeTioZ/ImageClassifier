<script setup>
import Funnel from '@/components/icons/Funnel.vue';
import Reset from '@/components/icons/Reset.vue';


const props = defineProps({
  searchTerms : Array,
  invertShearch: Boolean,
  strictSearch: Boolean
});


const emits = defineEmits(['toggleSortModal','resetSearch']);
</script>

<template>
  <nav class="w-full bg-ls-vert-base p-1">
    <div class="flex flex-wrap items-center justify-between mx-auto">
      <div>
        <h2 v-if="searchTerms.length > 0" class="text-white text-xl font-bold">Recherche {{strictSearch? "stricte ":""}} {{invertShearch?"sans ":"avec " }} les mots-clés : {{searchTerms.join(", ")}}</h2>
      </div>
      <!-- hack to put right part on the right -->
      <span />

      <div class="block w-auto my-auto">

        <button v-if="searchTerms.length > 0" @click="$emit('resetSearch')" class="text-ls-bleu-fonce hover:bg-ls-bleu-fonce hover:text-white rounded text-sm p-1 transition duration-300">
          <Reset class="w-6 h-6" />
        </button>
        <button @click="$emit('toggleSortModal')" class="text-ls-bleu-fonce hover:bg-ls-bleu-fonce hover:text-white rounded text-sm p-1 transition duration-300">
          <Funnel class="w-6 h-6" />
        </button>

      </div>

    </div>
  </nav>
</template>
