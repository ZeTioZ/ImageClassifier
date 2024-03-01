<script setup>
import Workspace from '@/components/Workspace.vue';

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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path fill-rule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>
