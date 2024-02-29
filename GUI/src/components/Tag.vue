<script setup>
const props = defineProps(['tagName', 'color']);
</script>

<template>
  <span class="text-gray-200 text-xs font-medium me-2 px-2 py-0.5 rounded">{{ tagName }}</span>
</template>
