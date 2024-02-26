<script setup>
import Navbar from '@/components/Navbar.vue';
import DeletedItemsWorkspace from '@/components/DeletedItemsWorkspace.vue';
import SortedItemsWorkspace from '@/components/SortedItemsWorkspace.vue';
</script>

<template>
  <Navbar />

  <!-- Side component to add later  -->
 
  <div class="flex flex-row">
    <DeletedItemsWorkspace />
    <SortedItemsWorkspace />
  </div>
</template>

