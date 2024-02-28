<template>
  <aside id="upload-sidebar" class="z-40 w-64 h-full transition-transform -translate-x-full translate-x-0" aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-100 border-e border-black flex flex-col space-y-3">

      <!-- TODO: add dropzone to its own composent  -->
      <div class="flex items-center justify-center w-full">
        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">

          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-900 text-center"><span class="font-semibold">Cliquer pour uploader</span> ou glisser et déposer</p>            <p class="text-xs text-gray-500">.ZIP (max. 1GB)</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" />
        </label>
      </div> 


      <!-- TODO: make dynamic rendering for file cards -->
      <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100">
        <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-800">archive_camp5.zip</h5>
        <p class="text-sm font-normal text-gray-700">52 images (0.92GB)</p>
      </a>

      <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100">
        <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-800">2022_05_01.zip</h5>
        <p class="text-sm font-normal text-gray-700">203 images (1.85GB)</p>
      </a>


    </div>
  </aside>
</template>
