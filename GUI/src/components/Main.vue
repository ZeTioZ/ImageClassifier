<script setup>
import Navbar from '@/components/navbar/Navbar.vue';
import Workspace from '@/components/workspace/Workspace.vue';
import SidebarUpload from '@/components/archive/SidebarUpload.vue';

// import ExampleAPI from '@/api/example.js';
//
// ExampleAPI
//   .getAll({})
//   .then(() => {
//     console.log("test");
//   })
//   .catch((e) => {
//     console.log(e);
//   });
</script>

<template>
  <main class="flex flex-col h-full">
    <!-- Main navbar -->
    <Navbar />

    <!-- Page content -->
    <div class="overflow-hidden flex-1 flex flex-row">
      <SidebarUpload />
      <Workspace />
    </div>
  </main>
</template>

