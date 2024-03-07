<script setup>
import XMark from '@/components/icons/XMark.vue';

const props = defineProps(['tagName']);
const emits = defineEmits(['remove']);
</script>

<template>
  <li class="flex items-center">
    <button @click="$emit('remove')" class="bg-red-500 text-white">
      <XMark class="w-4 h-4" />
    </button>
    <span class="ms-1">{{ tagName }}</span>
  </li>
</template>
