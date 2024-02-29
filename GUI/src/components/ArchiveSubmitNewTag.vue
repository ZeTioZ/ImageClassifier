<script setup>
const props = defineProps(['tagName']);
const emits = defineEmits(['remove']);
</script>

<template>
  <li>
    {{ tagName }}
    <button @click="$emit('remove')">Remove</button>
  </li>
</template>
