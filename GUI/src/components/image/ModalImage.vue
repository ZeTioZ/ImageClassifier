<script setup>
  import Tag from '@/components/image/Tag.vue';
  import Add from '@/components/icons/Add.vue';
  import XMark from '@/components/icons/XMark.vue';
  import {ref} from "vue";
  const add = ref(false)
  const props = defineProps(['parent', 'imgSrc', 'imgName', 'imgTags', 'imgResol', 'imgSize', 'imgSup']);
  const emit = defineEmits(['close', 'add', 'del']);

  function closeModal() {
    emit('close');
  }
  function tagToAdd() {
    emit('add', addTag.value);
  }
  function tagToDel(term) {
    emit('del', term.value);
  }
  function addTag(){
    add.value = !add.value;
  }
</script>

<template>
<!-- Extra Large Modal -->
<div id="extralarge-modal" tabindex="-1" data-draggable="false" class="fixed inset-0 top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto bg-gray-600 bg-opacity-50 md:inset-0 h-screen" @click.self="closeModal">
    <div class="relative">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <div class="modal-header">
            <h2 class="text-xl font-bold pt-2">{{ imgName }}</h2>
          </div>
          <button @click="closeModal" class="absolute top-0 right-0 m-3 text-gray-500 hover:text-gray-700">
            <XMark class="w-6 h-6"/>
          </button>
            <!-- Modal body -->
            <div class="flex">
              <div class="w-2/3">
                <img :src="imgSrc" alt="full" class="h-full w-full object-cover p-2">
              </div>
              <div class="w-1/3">
                <p class="text-base leading-relaxed text-gray-500 pb-[1px]">
                  <b>Mots-clés :</b>
                </p>
                <p class="text-base leading-relaxed text-gray-500 pb-[10px]">
                  <div class="mt-0.5 overflow-y-auto scrollbar-hide">
                    <div class="flex m-3">
                      <button @click="addTag" class="text-ls-bleu-fonce hover:bg-ls-bleu-fonce hover:text-white rounded text-sm p-1 transition duration-300">
                        <Add class="w-6 h-6" />
                      </button>
                      <Tag v-for="tag in imgTags" @delete="tagToDel()" :key="tag.name" :tagName="tag.name" :class="tag.color" :inModal="'pomelo'"/>
                    </div>
                    <input v-if="add" id="tag" placeholder="Mot-clé à rajouter" @keyup.enter="tagToAdd" autocomplete="off" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-l-md block p-2 mx-2" />
                  </div>
                </p>
                <p v-if="imgSup != null" class="text-base leading-relaxed text-gray-500" style="margin-bottom: 10px;">
                  <b>Raisons de suppression:</b>
                </p>
                <p v-if="imgSup != null" class="text-base leading-relaxed text-gray-500" style="margin-bottom: 10px;">
                  {{ imgSup }}
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400" style="margin-bottom: 1px;">
                  <b>Détails :</b>
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400" style="margin-bottom: 1px;">
                  354 Mo
                  <!--{{ imgResol }}-->
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400" style="margin-bottom: 10px;">
                  398x456
                  <!--{{ imgSize }}-->
                </p>

              </div>
            </div>
        </div>
    </div>
</div>
</template>


<!---
<img :id="fileName" :src="imgSrc" :alt="`Workspace Image ${index + 1}`" class="h-full w-full object-cover">
-->
