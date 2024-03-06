<script setup>
import Workspace from '@/components/Workspace.vue';
import Funnel from '@/components/icons/Funnel.vue';

import IMG1 from '@/assets/IMG/7.jfif';
import IMG2 from '@/assets/IMG/4.jfif';
import IMG3 from '@/assets/IMG/9.jfif';
import IMG4 from '@/assets/IMG/10.jfif';
import IMG5 from '@/assets/IMG/3.jpg';
import IMG7 from '@/assets/IMG/5.jfif';
</script>

<template>
  <div class="relative">
    <Workspace workspaceName="Triées" :images="[IMG1,IMG2,IMG3,IMG4,IMG5,IMG7]" />

    <!-- sort button (TODO: move to its own component later) -->
    <button class="absolute top-0 right-0  text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm p-3 mt-6 me-3">
      <Funnel class="w-6 h-6" />
    </button>
  </div>
</template>
