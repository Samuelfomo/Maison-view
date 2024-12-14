<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-2">
    <div
        v-if="isLoading"
        class="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 backdrop-blur-sm">
      <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
      <p class="ml-4 font-medium" style="color: #FF4200">Chargement...</p>
    </div>


    <div class="bg-white shadow-lg rounded-lg max-w-md w-full ">
      <header class="bg-white  py-2 px-4 rounded-t-lg text-center h-32">
        <img :src="topup" alt="Topup" class="max-w-52 mx-auto mt-8"/>
      </header>
      <div class="p-4">
        <h2 class="text-xl text-center font-bold mb-8">Retrouvez mon abonnement</h2>
        <p class="text-gray-600 mb-4">Entrez le numéro de votre décodeur</p>
        <div class="relative">
          <input
              v-model="decoderNumber"
              type="search"
              placeholder="Numéro de décodeur"
              class="w-full px-6 py-2 text-lg border-2 border-gray-300 rounded-xl
                 focus:outline-none focus:border-orange-500 focus:ring-2
                 focus:ring-orange-200 transition duration-300
                 placeholder-gray-400"
          />
        </div>

        <button
            @click="searchDecoder"
            :disabled="!decoderNumber"
            class="w-full bg-orange-500 text-white font-bold py-3 mt-8 rounded-xl hover:bg-orange-600
            transition duration-300"
        >
          Rechercher
        </button>

        <div class="text-center text-sm text-gray-500 mt-4 mb-2">
          Besoin d'aide ? <a href="#" class="text-orange-600 hover:underline">Contactez-nous</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import topup from '@/assets/images/topup_logo.svg'
import createDecoderApiService from '@/services/decoderApiService'

import { useRouter } from 'vue-router';

const router = useRouter();

const decoderNumber = ref('');
const isLoading = ref(false)

const searchDecoder = async () => {
  isLoading.value = true

  try {
    const testDecoder = createDecoderApiService();

    const result =  await testDecoder.decodeNumber( parseInt(decoderNumber.value));
    if(result){
      await router.push({
        name: 'Subscriber',
        query: { decoder: result.device.toString()  }
        // query: { decoder: JSON.stringify(result)   }
      });
    }
    // Rest of the code remains the same...
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
  } finally {
    isLoading.value = false;
  }
}

</script>

<style scoped>
/* Styles personnalisés supplémentaires si nécessaire */
</style>