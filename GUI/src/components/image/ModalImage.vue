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
<div id="extralarge-modal" tabindex="-1" data-draggable="false" class="fixed z-10 bg-gray-600 bg-opacity-50 inset-0" @click.self="closeModal">
    <div class="relative">
        <!-- Modal content -->
        <div class="fixed bg-white rounded-lg shadow items-center justify-center inset-20 min-h-[250px]">
          <nav class="w-full bg-ls-vert-base">
            <h2 class="text-xl font-bold pt-2 pb-2">{{ imgName }}</h2>
            <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <XMark class="w-6 h-6"/>
            </button>
          </nav>
            <!-- Modal body -->
            <div class="flex">
              <div class="flex w-2/3 border-e-2 border-gray-500 min-h-[206px]">
                <img :src="imgSrc" alt="full" class="h-[calc(100vh-12.77rem)] w-full object-cover p-2 rounded-lg min-h-[206px]">
              </div>
              <div class="w-1/3 min-h-[206px]">
                <p class="text-base leading-relaxed text-gray-500 pb-[1px]">
                  <b>Mots-clés :</b>
                </p>
                <p class="flex text-base leading-relaxed text-gray-500 pb-[10px] justify-center items-center">
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
