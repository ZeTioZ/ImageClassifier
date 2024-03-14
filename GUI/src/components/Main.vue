<script setup>
import Navbar from '@/components/navbar/Navbar.vue';
import Workspace from '@/components/workspace/Workspace.vue';
import SidebarUpload from '@/components/archive/SidebarUpload.vue';

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
      <Workspace class="flex-1"/>
    </div>
  </main>
</template>

