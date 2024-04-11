<script setup>
import SaveButton from '@/components/navbar/SaveButton.vue';
</script>

<template>
  <nav class="bg-ls-bleu-fonce">
    <div class="flex flex-wrap items-center justify-between mx-auto p-2 px-4">
      <a href="#" class="flex items-center space-x-3 space-x-reverse">
        <img src="@/components/icons/Logo.png" class="h-12 m-2" alt="Scout Lens" />
        <span class="self-center text-2xl font-bold whitespace-nowrap text-white">Scout Lens</span>
      </a>

      <div class="block w-auto" id="navbar-solid-bg">
        <ul class="flex flex-row font-medium rounded-lg space-x-8 mt-0 border-0 bg-transparent">
          <li>
            <SaveButton /> 
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
