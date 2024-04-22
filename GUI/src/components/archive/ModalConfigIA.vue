<script setup>
import {onMounted, ref } from "vue";
import { API } from '@/api/';
import XMark from '@/components/icons/XMark.vue';
import Check from '@/components/icons/Check.vue';
import Reset from '@/components/icons/Reset.vue';
import { notify } from '@kyvg/vue3-notification';

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
    notify({
      type: "error",
      title: "Erreur",
      text: `Quelque chose s'est mal passé lors de la récupération de la configuration: ${error.code || 'UNK_ERR'}`
    });

    throw error;
  }
});


async function updateAIConfig(updatedConfig) {
  try {
    // Envoie les données mises à jour au serveur
    await API.configs.post(updatedConfig);

    notify({
      type: "success",
      title: "Paramètres mis à jour",
      text: "Les paramètres ont été mis à jours avec succès."
    });

    closeModal(); // Ferme le modal après la mise à jour réussie
  } catch (error) {
    notify({
      type: "error",
      title: "Erreur",
      text: `Quelque chose s'est mal passé lors de la mise à jour des paramètres: ${error.code || 'UNK_ERR'}`
    });

    throw error;
  }
}

function rebotConfig() {
  netteté.value = 151;
  length.value = 400;
  hight.value = 400;
  brigthness.value = 51;
  BlacklistedTags.value = ["nasty"];

  notify({
    type: "info",
    title: "Paramètres réinitialisés",
    text: "Les paramètres de l'IA ont été réinitialisés."
  });
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
          <div class="items-start justify-between p-5">
            <h3 class="text-xl text-center font-semibold text-gray-900 lg:text-2xl">
              Configuration de l'IA
            </h3>
            <h4 class="text-sm text-gray-500">Modifiez les paramètres de l'IA pour le tri automatisé des images.</h4>
          </div>

          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <!--netteté-->
            <div class="flex justify-center items-center text-base leading-relaxed text-gray-500">
              <span>Netteté :</span>
              <input v-model="netteté" type="number" min="0" max="3000" class="ms-1 w-1/4 h-8 bg-gray-50 text-gray-900 text-s rounded-md p-1 shadow-none"/>
            </div>
            <input v-model="netteté" type="range" min="0" max="3000" value="0" step="10" class="w-full h-1 bg-gray-200 slider rounded-lg">
            <!--length-->
            <div class="flex justify-center items-center text-base leading-relaxed text-gray-500">
              <span>Largeur minimale :</span> 
              <input v-model="length" type="number" min="0" max="5000" class="ms-1 w-1/4 h-8 bg-gray-50 text-gray-900 text-s rounded-md p-1 shadow-none"/> 
            </div>
            <input v-model="length" type="range" min="0" max="5000" value="0" step="10" class="w-full h-1 bg-gray-200 slider rounded-lg">
            <!--heigth-->
            <div class="flex justify-center items-center text-base leading-relaxed text-gray-500">
              <span>Hauteur minimale :</span>
              <input v-model="hight" type="number" min="0" max="5000" class="ms-1 w-1/4 h-8 bg-gray-50 text-gray-900 text-s rounded-md p-1 shadow-none"/>
            </div>
            <input v-model="hight" type="range" min="0" max="5000" value="0" step="10" class="w-full h-1 bg-gray-200 slider rounded-lg">
            <!--brigtness-->
            <div class="flex justify-center items-center text-base leading-relaxed text-gray-500">
              <span>Luminosité :</span>
              <input v-model="brigthness" type="number" min="0" max="100" class="ms-1 w-1/4 h-8 bg-gray-50 text-gray-900 text-s rounded-md p-1 shadow-none"/>
            </div>
            <input v-model="brigthness" type="range" min="0" max="100" value="0" step="10" class="w-full h-1 bg-gray-200 slider rounded-lg">
            <!---->
            <div>
            <p class="text-base leading-relaxed">Mots-clés à blacklister :</p>
            <div class="p-0 text-gray-500 flex justify-center items-center" v-for="(tag, index) in BlacklistedTags" :key="index">
              <button @click="remove(index)" class="bg-ls-rouge text-white rounded border">
                <XMark class="w-3 h-3" />
              </button>             
              <p class="ms-1">{{ tag }}</p>
            </div>
            <input v-model="Tag" id="tag" placeholder="Ex.: voiture, piscine, etc." @keyup.enter="BlacklistTags"
              autocomplete="off" class="bg-gray-50 text-gray-900 text-xs rounded block p-1 mt-3 w-full border" />
            </div>
          </div>

          <!-- Modal footer -->
          <div class="flex justify-evenly items-center p-6 space-x-2">
            <button type="button" @click="validateConfig" class="text-white bg-ls-vert-base font-medium rounded-full text-sm px-5 py-2.5 text-center w-1/2 flex flex-row items-center justify-center">
              <Check/>
              <span class="ms-1">Appliquer</span>
            </button>
            <button type="button" @click="rebotConfig" class="text-white bg-ls-rouge font-medium rounded-full text-sm px-5 py-2.5 text-center w-1/2 flex flex-row items-center justify-center">
              <Reset/>
              <span class="ms-1">Réinitialiser</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.slider {
  -webkit-appearance: none;
  outline: none;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background-color: var(--ls-bleu-fonce);
  cursor: pointer;
}

.slider::-moz-range-thumb {
  background-color: var(--ls-bleu-fonce);
  cursor: pointer;
}
</style>
