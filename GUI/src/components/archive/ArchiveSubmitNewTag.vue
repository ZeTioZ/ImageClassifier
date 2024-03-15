<script setup>
import XMark from '@/components/icons/XMark.vue';

const props = defineProps(['tagName']);
const emits = defineEmits(['remove']);
</script>

<template>
  <li class="flex items-center">
    <button @click="$emit('remove')" class="bg-ls-rouge text-white rounded border">
      <XMark class="w-4 h-4" />
    </button>
    <p class="ms-1 text-white">{{ tagName }}</p>
  </li>
</template>
