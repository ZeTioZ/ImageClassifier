<script setup>
import { ref } from "vue";
const netteté = ref(0);
const length = ref(0);
const hight = ref(0);
const brigthness = ref(0);
const Tag = ref('');
const BlacklistedTags = ref([]);

const emit = defineEmits(['close']);

function closeModal() {
  emit('close');
}

function validateConfig() {
  console.log('Netteté:', netteté.value);
  console.log('Longueur:', length.value);
  console.log('Hauteur:', hight.value);
  console.log('Luminosité:', brigthness.value);
  console.log('Tag blacklisté:', BlacklistedTags.value);
  closeModal();
}

function BlacklistTags() {
  if (Tag.value) {
    BlacklistedTags.value.push(Tag.value);
    Tag.value = '';
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto z-50" @click.self="closeModal">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3 text-center">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header -->
          <div class="items-start justify-between p-5 border-b rounded-t">
            <h3 class="text-xl text-center font-semibold text-gray-900 lg:text-2xl">
              Configuration
            </h3>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <!--netteté-->
            <div class="flex justify-center items-center text-base leading-relaxed text-gray-500">
              <span>Netteté de l'image :</span>
              <input v-model="netteté" type="number" min="0" max="100" class="w-1/4 h-8 bg-gray-50 text-gray-900 text-s rounded-md p-1 border-none shadow-none"/>
            </div>
            <input v-model="netteté" type="range" min="0" max="100" value="0" step="10" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            <!--length-->
            <div class="flex justify-center items-center text-base leading-relaxed text-gray-500">
              <span>Largeur minimale de l'image : </span> 
              <input v-model="length" type="number" min="0" max="15000" class="w-1/4 h-8 bg-gray-50 text-gray-900 text-s rounded-md p-1 border-none shadow-none"/> 
            </div>
            <input v-model="length" type="range" min="0" max="15000" value="0" step="10" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            <!--heigth-->
            <div class="flex justify-center items-center text-base leading-relaxed text-gray-500">
              <span>Hauteur minimale de l'image :</span>
              <input v-model="hight" type="number" min="0" max="15000" class="w-1/4 h-8 bg-gray-50 text-gray-900 text-s rounded-md p-1 border-none shadow-none"/>
            </div>
            <input v-model="hight" type="range" min="0" max="15000" value="0" step="10" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            <!--brigtness-->
            <div class="flex justify-center items-center text-base leading-relaxed text-gray-500">
              <span>Luminosité minimale de l'image :</span>
              <input v-model="brigthness" type="number" min="0" max="3000" class="w-1/4 h-8 bg-gray-50 text-gray-900 text-s rounded-md p-1 border-none shadow-none"/>
            </div>
            <input v-model="brigthness" type="range" min="0" max="3000" value="0" step="10" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            <!---->
            <p class="text-base leading-relaxed text-gray-500">
              Mot-clé à blacklister : {{ BlacklistedTags.join(', ')}}
              <input v-model="Tag" id="tag" placeholder="Ex.: voiture, piscine, etc." @keyup.enter="BlacklistTags"
              autocomplete="off" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-l-md block p-1 w-full" />
            </p>
          </div>
          <!-- Modal footer -->
          <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
            <button type="button" @click="validateConfig" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" >Valider</button>
            <button type="button" @click="closeModal" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10" >Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

