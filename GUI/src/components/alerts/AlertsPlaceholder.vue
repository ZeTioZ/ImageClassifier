<script setup>
import Alert from '@/components/alerts/Alert.vue';
</script>

<template>
  <Alert v-for="i in 3" type="info" />
</template>
