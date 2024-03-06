<script setup>
import Navbar from '@/components/navbar/Navbar.vue';
import DeletedItemsWorkspace from '@/components/workspace/DeletedItemsWorkspace.vue';
import SortedItemsWorkspace from '@/components/workspace/SortedItemsWorkspace.vue';
import SidebarUpload from '@/components/archive/SidebarUpload.vue';
</script>

<template>
  <main class="flex flex-col h-full">
    <Navbar />

    <div class="flex-1 flex flex-row">
      <SidebarUpload />

      <DeletedItemsWorkspace class="flex-1" />
      <SortedItemsWorkspace class="flex-1"/>
    </div>
  </main>
</template>

