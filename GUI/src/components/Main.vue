<script setup>
import Navbar from '@/components/Navbar.vue';
import DeletedItemsWorkspace from '@/components/DeletedItemsWorkspace.vue';
import SortedItemsWorkspace from '@/components/SortedItemsWorkspace.vue';
import Workspace from '@/components/Workspace.vue';
</script>

<template>
  <main class="flex flex-col h-full">
    <Navbar />

    <!-- Side component to add later  -->

    <!-- <div class="flex flex-row"> -->
    <!--   <DeletedItemsWorkspace /> -->
    <!--   <SortedItemsWorkspace /> -->
    <!-- </div> -->
    <div class="flex-1">
      <Workspace workspaceName="À supprimer" :images="[]" />
    </div>
  </main>
</template>

