<script setup>
import Tag from '@/components/image/Tag.vue';
import Add from '@/components/icons/Add.vue';
import XMark from '@/components/icons/XMark.vue';
import { ref } from "vue";

const props = defineProps(['parent', 'image']);
const emit = defineEmits(['close', 'add', 'del']);

const add = ref(false);
const imageURL = ref('');

function closeModal() {
  emit('close');
}

function tagToAdd(event) {
  emit('add', event.target.value);
}

function tagToDel(term) {
  emit('del', term);
}

function addTag(){
  add.value = !add.value;
}

async function getImageURL() {
  imageURL.value = await props.image.getBlobURL(false);
}

getImageURL();
</script>

<template>
  <!-- Extra Large Modal -->
  <div id="extralarge-modal" tabindex="-1" data-draggable="false" class="fixed z-10 bg-gray-600 bg-opacity-50 inset-0" @click.self="closeModal">

    <!-- Modal content -->
    <div class="fixed bg-white rounded-xl shadow inset-16">

      <!-- Modal navbar -->
      <nav class="bg-ls-vert-base relative rounded-t-xl">
        <h2 class="text-xl font-bold py-2 truncate px-16">{{ image.filename }}</h2>
        <button @click="closeModal" class="absolute inset-y-2 right-2 text-gray-500 hover:text-gray-700">
          <XMark class="w-6 h-6"/>
        </button>
      </nav>

      <!-- Modal body -->
      <div class="flex h-fit">
        <div class="w-2/3 grid place-content-center">
          <img :src="imageURL" alt="full" class="p-2 rounded-lg object-contain max-h-fit" />
        </div>

        <div class="w-1/3 bg-gray-200 rounded-br-xl">
          <p class="text-base leading-relaxed text-gray-500 pb-[1px]">
            <b>Mots-clés :</b>
          </p>
          <p class="flex text-base leading-relaxed text-gray-500 pb-[10px] justify-center items-center">
          <div class="mt-0.5 overflow-y-auto scrollbar-hide">
            <div class="flex m-3">
              <button @click="addTag" class="text-ls-bleu-fonce hover:bg-ls-bleu-fonce hover:text-white rounded text-sm p-1 transition duration-300">
                <Add class="w-6 h-6" />
              </button>
              <Tag v-for="tag in image.tags" @delete="tagToDel(tag)" :key="tag.tagname" :tagName="tag.tagname" :class="tag.cssColorClass" :inModal="'pomelo'"/>
            </div>
            <input v-if="add" id="tag" placeholder="Mot-clé à rajouter" @keyup.enter="tagToAdd" autocomplete="off" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-l-md block p-2 mx-2" />
          </div>
          </p>
          <p v-if="image.qualityTags.length > 0" class="text-base leading-relaxed text-gray-500 mb-[10px]">
            <b>Raisons de suppression:</b>
          </p>
          <div v-if="image.qualityTags.length > 0" class="flex m-3 text-base leading-relaxed text-gray-500 justify-center mb-[10px]">
            <Tag v-for="tag in image.qualityTags" @delete="tagToDel(tag)" :key="tag.tagname" :tagName="tag.tagname" :class="tag.cssColorClass" :inModal="'pomelo'"/>
          </div>
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 mb-[1px]">
            <b>Détails :</b>
          </p>
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 mb-[1px]">
            {{ image.readableSize }}
          </p>
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 mb-[1px]">
            {{ image.width }} x {{ image.height }}
          </p>
        </div>
      </div>

    </div>

  </div>
</template>
