<script setup>
import X from '@/components/icons/XMark.vue';
const props = defineProps(['tagName', 'color', 'inModal']);
const emits = defineEmits(['delete']);

function deleteTag(term) {
  emits('delete', term.value);
}
</script>

<template>
  <span class="text-gray-200 text-xs font-semibold me-1 mb-1 px-1.5 py-0.5 rounded-full flex flex-row items-center space-x-0.5">
    <span>{{ tagName }}</span>
      <div v-if="inModal == 'pomelo'">
        <button @click="deleteTag" class="text-black-500 hover:text-red-500 focus:outline-none">
        <X class="w-3 h-3 mt-1"/> 
      </button>
    </div>
  </span>
</template>
