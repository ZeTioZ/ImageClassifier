<script setup>
import Navbar from '@/components/Navbar.vue';
import DeletedItemsWorkspace from '@/components/DeletedItemsWorkspace.vue';
import SortedItemsWorkspace from '@/components/SortedItemsWorkspace.vue';
// import Workspace from '@/components/Workspace.vue';
</script>

<template>
  <main class="flex flex-col h-full">
    <Navbar />

    <!-- Side component to add later  -->

    <div class="flex-1 flex flex-row">
      <DeletedItemsWorkspace class="flex-1" />
      <SortedItemsWorkspace class="flex-1"/>
    </div>
  </main>
</template>

