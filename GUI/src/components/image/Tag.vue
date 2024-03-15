<script setup>
import Tag from '@/components/icons/Tag.vue';

const props = defineProps(['tagName', 'color']);
</script>

<template>
  <span class="text-gray-200 text-xs font-semibold me-1 mb-0.5 px-1.5 py-0.5 rounded-full flex flex-row items-center space-x-0.5">
    <!-- <Tag class="w-3 h-3" /> -->
    <span>{{ tagName }}</span>
  </span>
</template>
