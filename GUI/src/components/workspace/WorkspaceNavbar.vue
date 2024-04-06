<script setup>
import Funnel from '@/components/icons/Funnel.vue';
import Gear from '@/components/icons/Gear.vue';
import ModalConfigIA from './ModalConfigIA.vue';
import {ref} from 'vue';

const props = defineProps({
  searchTerms : Array,
  invertShearch: Boolean
});

const showModalC = ref(false);
function toggleModalConfigIA(){
  showModalC.value = !showModalC.value;
}
const emits = defineEmits(['toggleSortModal']);
</script>

<template>
  <nav class="w-full bg-ls-vert-base p-1">
    <div class="flex flex-wrap items-center justify-between mx-auto">
      <div>
        <h2 v-if="searchTerms.length > 0" class="text-white text-l font-bold">Recherche {{invertShearch?"sans ":"avec " }} les mots-clés {{searchTerms.join(", ")}}</h2>
      </div>
      <!-- hack to put right part on the right -->
      <span />

      <div class="block w-auto my-auto">
        <button @click="toggleModalConfigIA" class="text-ls-bleu-fonce hover:bg-ls-bleu-fonce hover:text-white rounded text-sm p-1 transition duration-300">
          <Gear class="w-6 h-6" />
        </button>
        <button @click="$emit('toggleSortModal')" class="text-ls-bleu-fonce hover:bg-ls-bleu-fonce hover:text-white rounded text-sm p-1 transition duration-300">
          <Funnel class="w-6 h-6" />
        </button>
      </div>

    </div>
  </nav>
<!-- MODALS -->
<ModalConfigIA v-if="showModalC" @close="toggleModalConfigIA"/>
</template>
