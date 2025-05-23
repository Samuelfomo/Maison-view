<template>

  <div class="fixed top-4 right-4 z-50 name">
    <TransitionGroup v-if="alerts && alerts.length > 0" tag="div" name="alert">
      <div
          v-for="alert in alerts"
          :key="alert.id"
          :class="{
      'bg-green-500 text-white font-bold': alert.type === 'success',
      'bg-red-500 text-white': alert.type === 'error',
      'bg-yellow-500 text-black': alert.type === 'warning',
      'px-9 py-5 rounded shadow-lg mb-2': true
    }"
      >
        <strong>{{ alert.title }}:</strong> {{ alert.message }}
        <button @click="removeAlert(Number(alert.id))" class="ml-2 text-xs text-gray-200">X</button>
      </div>
    </TransitionGroup>
  </div>

  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-2">
    <div
        v-if="isLoading"
        class="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50 backdrop-blur-sm z-10">
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

<script setup lang="ts" >
import { ref } from 'vue'
import topup from '@/assets/images/topup_logo.svg'
import createDecoderApiService from '@/repository/decoderApiService'
import type {Alert} from '@/class/PreSubscription'
import { useRouter } from 'vue-router';

const router = useRouter();

const decoderNumber = ref('');
const isLoading = ref(false);
const alerts = ref<Alert[]>([]);


const searchDecoder = async () => {
  isLoading.value = true

  try {
    if (!decoderNumber) {
      showMessage('Please enter a decoder number', 'warning');
      return null;
    }

    if (!/^\d{14}$/.test(decoderNumber.value)) {
      showMessage('Decoder number must be a numeric value of exactly 14 digits', 'warning');
      return null;
    }
    const testDecoder = createDecoderApiService();

    const result =  await testDecoder.decodeNumber( parseInt(decoderNumber.value));
    if(result){
      await router.push({
        name: 'Subscriber',
        query: { decoder: result.device.toString()  }
        // query: { decoder: JSON.stringify(result)   }
      });
    }
    else{
      showMessage('No decoder found', 'error');
    }
    // Rest of the code remains the same...
  } catch (error) {
    showMessage('Error during search:', 'error');
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

const getAlertTitle = (type: 'success' | 'warning' | 'error'): string => {
  switch(type) {
    case 'success': return 'Succès';
    case 'warning': return 'Attention';
    case 'error': return 'Erreur';
    default: return '';
  }
};

const showMessage = (msg: string, type: 'success' | 'warning' | 'error' = 'success') => {
  if (alerts.value.some(alert => alert.message === msg)) return;

  const id = Date.now();
  alerts.value.push({
    id,
    title: getAlertTitle(type),
    message: msg,
    type: type
  });

  setTimeout(() => {
    removeAlert(id);
  }, 3000);
};


const removeAlert = (id: string | number) => {
  alerts.value = alerts.value.filter(alert => alert.id !== id);
};

</script>

<style scoped>
/* Styles personnalisés supplémentaires si nécessaire */
</style>