<script setup>
import Alert from '@/components/alerts/Alert.vue';
import {newAlert, ALERTS} from '@/js/alerts.js';

</script>

<template>
  <div class="absolute bottom-0 end-0 m-3 flex flex-col-reverse">
    <Alert type="danger" />
  </div>
</template>
