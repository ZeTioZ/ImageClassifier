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
  <Workspace workspaceName="Triées" :images="[IMG1,IMG2,IMG3,IMG4,IMG5,IMG7]" />
</template>
