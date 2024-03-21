<script setup>
const emit = defineEmits(['close']);

function closeModal() {
  emit('close');
}
</script>

<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto z-50" @click.self="closeModal">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3 text-center">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
              Configuration
            </h3>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Blur precision :
              <input id="steps-range" type="range" min="0" max="100" value="0" step="10" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
            </p>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Image minimum width :   
              <input id="steps-range" type="range" min="0" max="100" value="0" step="10" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
            </p>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Image minimum height :
              <input id="steps-range" type="range" min="0" max="200" value="0" step="10" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
            </p>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Image minimum luminance :
              <input id="steps-range" type="range" min="0" max="100" value="0" step="10" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
            </p>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Tag à blacklisté :
              <input v-model="Tag" id="tag" placeholder="Ex.: voiture, piscine, etc." @keyup.enter="BlacklistTags"
              autocomplete="off" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-l-md block p-1 w-full" />
            </p>
          </div>
          <!-- Modal footer -->
          <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Validate</button>
            <button type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600" @click="closeModal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

