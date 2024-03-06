<script setup>
import Navbar from '@/components/Navbar.vue';
import DeletedItemsWorkspace from '@/components/DeletedItemsWorkspace.vue';
import SortedItemsWorkspace from '@/components/SortedItemsWorkspace.vue';
import SidebarUpload from '@/components/SidebarUpload.vue';

import ExampleAPI from '@/api/example.js';

ExampleAPI
  .getAll({})
  .then(() => {
    console.log("test");
  })
  .catch((e) => {
    console.log(e);
  });
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

