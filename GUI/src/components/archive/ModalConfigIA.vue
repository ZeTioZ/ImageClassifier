<script setup>
import {onMounted, ref } from "vue";
import { API } from '@/api/';
import XMark from '@/components/icons/XMark.vue';

const netteté = ref(0);
const length = ref(0);
const hight = ref(0);
const brigthness = ref(0);
const Tag = ref('');
const BlacklistedTags = ref([]);

const emit = defineEmits(['close']);

// Charger les configurations après que le composant soit monté
onMounted(async () => {
  try {
    const { data } = await API.configs.get(); // Assurez-vous que cette méthode correspond à celle définie dans AI-config pour récupérer la configuration
    // Supposons que la réponse inclue des champs correspondants à vos paramètres
    netteté.value = data.blur_precision || 0;
    length.value = data.image_min_width || 0;
    hight.value = data.image_min_height || 0;
    brigthness.value = data.image_min_brightness || 0;
    if (data.banned_tags) {
      BlacklistedTags.value = [...data.banned_tags];
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la configuration:", error);
    // Gérer l'erreur comme il convient
  }
});


async function updateAIConfig(updatedConfig) {
  try {
    // Envoie les données mises à jour au serveur
    await API.configs.post(updatedConfig);
    console.log('Configuration mise à jour avec succès');
    closeModal(); // Ferme le modal après la mise à jour réussie
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la configuration :", error);
    // Gérer l'erreur comme il convient
  }
}

function rebotConfig() {
  netteté.value = 151;
  length.value = 400;
  hight.value = 400;
  brigthness.value = 51;
  BlacklistedTags.value = ["nasty"];
}

function validateConfig() {
  const updatedConfig = {
    blur_precision: netteté.value,
    image_min_width: length.value,
    image_min_height: hight.value,
    image_min_brightness: brigthness.value,
    banned_tags: BlacklistedTags.value
  };
  updateAIConfig(updatedConfig);
  closeModal();
}

function BlacklistTags() {
  if (Tag.value) {
    BlacklistedTags.value.push(Tag.value);
    Tag.value = '';
  }
}

function remove(index){
  BlacklistedTags.value.splice(index, 1);
}

function closeModal() {
  emit('close');
}
</script>

<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto z-50" @click.self="closeModal">
    <div class="relative top-20 mx-auto p-5 w-96 rounded-md bg-white">
      <div class="mt-3 text-center">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg">

          <!-- Modal header -->
          <div class="items-start justify-between p-5 rounded-t">
            <h3 class="text-xl text-center font-semibold text-gray-900 lg:text-2xl">
              Configuration de l'IA
            </h3>
            <h4 class="text-sm text-gray-500"> Modifiez les paramètres de l'IA pour le tri automatisé des images.</h4>
          </div>

          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <!--netteté-->
            <div class="flex justify-center items-center text-base leading-relaxed text-gray-500">
              <span>Netteté :</span>
              <input v-model="netteté" type="number" min="0" max="3000" class="ms-1 w-1/4 h-8 bg-gray-50 text-gray-900 text-s rounded-md p-1 shadow-none"/>
            </div>
            <input v-model="netteté" type="range" min="0" max="3000" value="0" step="10" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ">
            <!--length-->
            <div class="flex justify-center items-center text-base leading-relaxed text-gray-500">
              <span>Largeur minimale :</span> 
              <input v-model="length" type="number" min="0" max="5000" class="ms-1 w-1/4 h-8 bg-gray-50 text-gray-900 text-s rounded-md p-1 shadow-none"/> 
            </div>
            <input v-model="length" type="range" min="0" max="5000" value="0" step="10" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            <!--heigth-->
            <div class="flex justify-center items-center text-base leading-relaxed text-gray-500">
              <span>Hauteur minimale :</span>
              <input v-model="hight" type="number" min="0" max="5000" class="ms-1 w-1/4 h-8 bg-gray-50 text-gray-900 text-s rounded-md p-1 shadow-none"/>
            </div>
            <input v-model="hight" type="range" min="0" max="5000" value="0" step="10" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            <!--brigtness-->
            <div class="flex justify-center items-center text-base leading-relaxed text-gray-500">
              <span>Luminosité :</span>
              <input v-model="brigthness" type="number" min="0" max="100" class="ms-1 w-1/4 h-8 bg-gray-50 text-gray-900 text-s rounded-md p-1 shadow-none"/>
            </div>
            <input v-model="brigthness" type="range" min="0" max="100" value="0" step="10" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            <!---->
            <p class="text-base leading-relaxed text-gray-500">
              Mot-clé à blacklister : 
              <span v-for="(tag, index) in BlacklistedTags" :key="index">
                {{ tag }}
                <button @click="remove(index)" class="bg-blue-700 text-white rounded">
                  <XMark class="w-3 h-3" />
                </button>             
              </span>
              <input v-model="Tag" id="tag" placeholder="Ex.: voiture, piscine, etc." @keyup.enter="BlacklistTags"
              autocomplete="off" class="bg-gray-50 text-gray-900 text-xs rounded block p-1 w-full border" />
            </p>
          </div>

          <!-- Modal footer -->
          <div class="flex justify-evenly items-center p-6 space-x-2 rounded-b">
            <button type="button" @click="validateConfig" class="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" >Valider</button>
            <button type="button" @click="rebotConfig" class="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" >Réinitialiser</button>
            <button type="button" @click="closeModal" class="text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-sm font-medium px-5 py-2.5 focus:z-10" >Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

