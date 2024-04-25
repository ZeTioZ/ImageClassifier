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
    <div class="fixed bg-white rounded-xl shadow inset-16 flex flex-col">

      <!-- Modal navbar -->
      <nav class="bg-ls-vert-base relative rounded-t-xl">
        <h2 class="text-xl font-bold py-2 truncate px-16">{{ image.filename }}</h2>
        <button @click="closeModal" class="absolute inset-y-2 right-2 text-gray-500 hover:text-gray-700">
          <XMark class="w-6 h-6"/>
        </button>
      </nav>

      <!-- Modal body -->
      <div class="flex flex-1">
        <div class="w-2/3 m-2 bg-contain bg-center bg-no-repeat flex items-center justify-center" :style="`background-image: url(${imageURL})`">
          <!-- spinner -->
          <div v-if="!imageURL" class="w-full flex justify-center py-1.5">
            <svg aria-hidden="true" class="w-52 h-52 text-white animate-spin fill-ls-vert-base" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
          </div>
        </div>

        <div class="w-1/3 bg-gray-200 rounded-br-xl">
          <p class="text-base leading-relaxed text-gray-500 pt-5">
            <b>Mots-clés :</b>
          </p>
          <p class="flex text-base leading-relaxed text-gray-500 pb-[10px] justify-center items-center">
            <div class="mt-0.5 overflow-y-auto scrollbar-hide">
              <div class="flex m-3">
                <button @click="addTag" class="text-ls-bleu-fonce hover:bg-ls-bleu-fonce hover:text-white rounded text-sm p-1 transition duration-300 mb-1 me-1">
                  <Add class="w-6 h-6" />
                </button>
                <Tag v-for="tag in image.tags" @delete="tagToDel(tag)" :key="tag.tagname" :tagName="tag.tagname" :class="tag.cssColorClass" :inModal="'pomelo'"/>
              </div>
              <input v-if="add" id="tag" placeholder="Mot-clé à rajouter" @keyup.enter="tagToAdd" autocomplete="off" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-md block p-2 mx-2" />
            </div>
          </p>

          <p v-if="image.qualityTags.length > 0" class="text-base leading-relaxed text-gray-500 mb-[10px]">
            <b>Raisons de suppression :</b>
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
