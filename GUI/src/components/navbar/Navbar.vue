<script setup>
import Download from '@/components/icons/Download.vue'; 
</script>

<template>
  <nav class="bg-ls-bleu-fonce">
    <div class="flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" class="flex items-center space-x-3 space-x-reverse">
        <!-- <img src="" class="h-8" alt="" /> -->
        <span class="self-center text-2xl font-bold whitespace-nowrap text-white">Image Classifier</span>
      </a>
      <div class="block w-auto" id="navbar-solid-bg">
        <ul class="flex flex-row font-medium rounded-lg space-x-8 mt-0 border-0 bg-transparent">
          <!-- <li> -->
          <!--   <a href="#" class="block py-2 p-0 text-white font-semibold rounded border-0">Action1</a> -->
          <!-- </li> -->
          <!-- <li> -->
          <!--   <a href="#" class="block py-2 p-0 text-white font-semibold rounded border-0">Action2</a> -->
          <!-- </li> -->
          <!-- <li> -->
          <!--   <a href="#" class="block py-2 p-0 text-white font-semibold rounded border-0">Action3</a> -->
          <!-- </li> -->
          <li>
            <a href="#" class="block py-2 px-3 p-0 text-ls-bleu-fonce font-semibold rounded-full bg-white flex flex-row items-center transition duration-300 hover:bg-ls-bleu-fonce hover:text-white border border-white">
              <Download class="w-6 h-6" />
              <span class="ms-1">Sauvegarder</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
