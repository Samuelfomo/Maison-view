<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-2">
    <div
        v-if="isLoading"
        class="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 backdrop-blur-sm">
      <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
      <p class="ml-4 font-medium" style="color: #FF4200">Chargement...</p>
    </div>

    <div class="bg-gray-100 rounded-lg w-full max-w-md p-3 ">
      <div class="flex flex-wrap h-14 shadow-lg shadow-gray-600">
        <!-- Carte -->
        <div class="bg-gray-800 rounded-t-lg p-1 flex-1 w-full">
          <div class="text-lg mb-2">
            <p class=" text-center text-white font-roboto pt-2"> Renouvellement de mon abonnement </p>
          </div>
        </div>
      </div>
      <div class="bg-white shadow-lg shadow-gray-600 rounded-b-lg w-full max-w-md p-3">

        <div class="space-y-1 mb-8">
          <h6 class="text-lg font-patrick-hand" style="color: #FF4200">Votre decodeur</h6>
          <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <!-- Header -->
            <div class="bg-gray-200 p-2 border-gray-400 border-b-2">
              <h6 class="text-lg text-black font-roboto mb-0 text-center">{{ decoderCode }}</h6>
            </div>

            <!-- Card Body -->
            <div class="p-4 bg-gray-200 border-gray-400 border-b-2">
              <div class="flex items-center justify-between">
                <span class="text-gray-600 capitalize font-roboto text-left">formule</span>
                <span class="text-black uppercase font-roboto text-right">{{ decoderFormula }}</span>
              </div>
              <div class="flex items-center justify-between mt-2">
                <span class="text-gray-600 font-roboto text-left">Date d'échéance</span>
                <span class="uppercase font-roboto text-right" style="color: #FF4200">{{ formattedExpiryDate }}</span>
              </div>
            </div>

            <!-- Footer -->
            <div class="bg-gray-100 p-4 text-lg text-center border-gray-400 border-b-2">
              <span class="text-gray-600 font-roboto uppercase">{{ subscriberName }}</span>
            </div>
          </div>
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- Formule -->
          <div>
            <label class="block text-lg font-patrick-hand" style="color: #FF4200">Choisir votre formule *</label>
            <div class="mb-8 bg-gray-950 rounded-lg border-gray-400 border-b-2 pb-2 pt-4">
              <div
                  v-for="formula in availableFormulas"
                  :key="formula"
                  class="flex items-center mb-2 w-full cursor-pointer"
                  @click="selectedFormula = formula"
              >
                <label :for="`wifi-toggle-${formula}`" class="cursor-pointer ml-3">
                  <div class="relative">
                    <input
                        type="radio"
                        :id="`wifi-toggle-${formula}`"
                        class="sr-only peer"
                        v-model="selectedFormula"
                        :value="formula"
                    />
                    <div class="block w-6 h-4 bg-gray-300 rounded-full peer-checked:bg-orange-100"></div>
                    <div class="dot absolute left-0 top-0 w-4 h-4 bg-white peer-checked:bg-orange-500 rounded-full transition-all peer-checked:translate-x-3"></div>
                  </div>
                </label>
                <span class="ml-2 text-white uppercase font-roboto text-sm">{{ formula }}</span>
                <span class="ml-auto mr-2 text-white uppercase font-roboto text-sm text-end">{{ getPriceForFormula(formula) }} XAF</span>
              </div>
            </div>
          </div>

          <!-- Bouquets -->
          <div>
            <label class="block text-lg font-patrick-hand text-gray-700" style="color: #FF4200">Ajouter des options à votre bouquet</label>
            <div class="mb-8 bg-gray-950 rounded-lg border-gray-400 border-b-2 pb-2 pt-4">
              <div
                  v-for="bouquet in availableBouquets"
                  :key="bouquet"
                  class="flex items-center mb-2 w-full cursor-pointer"
                  @click="toggleBouquet(bouquet)"
              >
                <label :for="`wifi-toggle-${bouquet}`" class="cursor-pointer ml-3">
                  <div class="relative">
                    <input
                        type="checkbox"
                        :id="`wifi-toggle-${bouquet}`"
                        class="sr-only peer"
                        :checked="selectedbouquets.includes(bouquet)"
                        @change="toggleBouquet(bouquet)"
                    />
                    <div class="block w-6 h-4 bg-gray-300 rounded-full peer-checked:bg-orange-100"></div>
                    <div class="dot absolute left-0 top-0 w-4 h-4 bg-white peer-checked:bg-orange-500 rounded-full transition-all peer-checked:translate-x-3"></div>
                  </div>
                </label>
                <span class="ml-2 text-white uppercase font-roboto text-sm">{{ bouquet }}</span>
                <span class="ml-auto mr-2 text-white uppercase font-roboto text-sm text-end">
                {{ getPriceForBouquet(bouquet) }} XAF
              </span>
              </div>
            </div>
          </div>

          <!-- Rest of the form remains the same -->
          <div class="" hidden>
            <input type="number" name="decoder" id="decoder" value="" v-model="decoder" disabled>
            <input type="number" name="merchant" id="merchant" value="" v-model="merchant" disabled>
          </div>


          <!-- Durée d'Abonnement -->
          <div>
            <label class="block text-lg font-patrick-hand text-gray-700" style="color: #FF4200">Choisir la durée (Mois)</label>
            <div class="flex mt-1 w-full mb-8">
              <button
                  v-for="month in subscriptionMonths"
                  :key="month"
                  type="button"
                  @click="selectedDuration = month"
                  :class="`p-1 w-full rounded-none ${selectedDuration === month ? 'bg-gray-950 text-white' : 'bg-gray-300 text-black'}`"
              >
                {{ month }}
              </button>
            </div>
          </div>

          <!-- Numéro Mobile -->
          <div>
            <label class="block text-lg font-patrick-hand text-gray-700" style="color: #FF4200">Entrer un numero mobile pour le payement *</label>
            <div class="relative mb-4 border-gray-600 border-2 rounded-lg">
              <div v-if="mobileOperator" class="absolute inset-y-0 left-0 pr-3 flex items-center pointer-events-none">
                <img
                    :src="mobileOperatorLogo"
                    :alt="mobileOperator"
                    class="w-14 h-14 rounded-lg"
                />
              </div>
              <input
                  v-model="phoneNumber"
                  type="tel"
                  placeholder="Entrez votre numéro.  .  . "
                  @input="detectMobileOperator"
                  class="mt-1 p-3 text-end block font-roboto w-full rounded-lg shadow-sm text-lg focus:ring-0 focus:outline-none"
              />
            </div>
          </div>

          <!-- Bouton Payer -->
          <button
              type="submit"
              class="w-full font-roboto bg-green-500 text-white py-3 rounded-md hover:bg-green-950 transition duration-300"
          >
            PAYER {{ calculateTotal() }} XAF
          </button>
        </form>
      </div>
    </div>
  </div>


  <div v-if="showConfirmationModal" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
        <!-- En-tête -->
        <div class="bg-black text-white text-center py-3">
          <h3 class="text-2xl font-bold font-roboto">Confirmer l’opération</h3>
        </div>

        <!-- Contenu principal -->
        <div class="bg-white px-6 py-4">
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <p class="font-medium  text-gray-700 font-patrick-hand text-lg">Décodeur :</p>
              <p class="font-bold font-roboto">{{ confirmationData.decoder }}</p>
            </div>
            <div class="flex justify-between items-center">
              <p class="font-medium text-gray-700 font-patrick-hand text-lg">Formule :</p>
              <p class="font-bold font-roboto">{{ confirmationData.formula }}</p>
            </div>
            <div class="flex justify-between items-center">
              <p class="font-medium text-gray-700 font-patrick-hand text-lg">Durée :</p>
              <p class="font-bold font-roboto">{{ confirmationData.duration }} mois</p>
            </div>
            <div class="flex justify-between items-center">
              <p class="font-medium text-gray-700 font-patrick-hand text-lg">Montant :</p>
              <p class="font-bold font-roboto">{{ confirmationData.amount }} XAF</p>
            </div>
            <div class="flex justify-between items-center">
              <p class="font-medium text-gray-700 font-patrick-hand text-lg">Options :</p>
              <ul class="font-bold font-roboto">
                <li v-for="option in confirmationData.options" :key="option">{{ option }}</li>
              </ul>
            </div>
            <div class="flex justify-between items-center">
              <p class="font-medium text-gray-700 font-patrick-hand text-lg">Total :</p>
              <p class="font-bold text-orange-500 font-roboto">{{ confirmationData.total }} XAF</p>
            </div>
          </div>
        </div>

        <!-- Pied de page -->
        <div class=" px-4 py-3 flex justify-between items-center font-patrick-hand">
          <p class="text-sm text-gray-600">
            La somme de <span class="font-bold">{{ confirmationData.total }}</span> sera débitée par Orange Money.
          </p>
        </div>

        <div class="bg-gray-100 px-4 py-3 flex justify-between items-center">

          <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-full sm:text-sm"
              @click="showConfirmationModal = false"
          >
            Annuler
          </button>
          <button
              type="button"
              class="ml-1 mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-full sm:text-sm"
              @click="confirmSubscription"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  </div>



  <!--  <div v-if="showConfirmationModal" class="fixed z-10 inset-0 overflow-y-auto">-->
<!--    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">-->
<!--      <div class="fixed inset-0 transition-opacity" aria-hidden="true">-->
<!--        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>-->
<!--      </div>-->

<!--      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>-->

<!--      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">-->
<!--        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:h-16 sm:w-16 mt-4">-->
<!--          <svg class="h-9 w-9 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">-->
<!--            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
<!--                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-5-5.917V4a2 2 0 10-4 0v1.083A6.002 6.002 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m7 0a3 3 0 11-6 0h6z"-->
<!--            />-->
<!--          </svg>-->
<!--        </div>-->
<!--        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">-->
<!--          <div class="sm:flex sm:items-start">-->
<!--            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">-->
<!--              <h3 class="text-2xl leading-6 font-medium font-roboto text-gray-900 text-center ml-10 pb-3 mt-0" id="modal-title">-->
<!--                Confirmer votre réabonnement-->
<!--              </h3>-->
<!--              &lt;!&ndash; Contenu spécifique de confirmation &ndash;&gt;-->
<!--              <div class="mt-4 space-y-4">-->
<!--                <div class="flex items-center">-->
<!--                  <p class="font-medium font-patrick-hand text-lg mr-4">Formule d'abonnement:</p>-->
<!--                  <p class="font-roboto font-bold text-xl">{{ confirmationData.formula }}</p>-->
<!--                </div>-->

<!--                <div>-->
<!--                  <p class="font-medium font-patrick-hand text-lg">Options:</p>-->
<!--                  <ul class="list-disc pl-6 flex text-xl font-bold font-roboto">-->
<!--                    <li class="ml-16" v-for="option in confirmationData.options" :key="option">{{ option }}</li>-->
<!--                  </ul>-->
<!--                </div>-->

<!--                <div class="flex items-center">-->
<!--                  <p class="font-medium font-patrick-hand text-lg mr-4">Durée:</p>-->
<!--                  <p class="font-roboto font-bold text-xl">{{ confirmationData.duration }} mois</p>-->
<!--                </div>-->

<!--                <div class="flex items-center">-->
<!--                  <p class="font-medium font-patrick-hand text-lg mr-4">Montant total:</p>-->
<!--                  <p class="font-roboto font-bold text-xl">{{ confirmationData.total }} XAF</p>-->
<!--                </div>-->

<!--                <div class="flex items-center">-->
<!--                  <p class="font-medium font-patrick-hand text-lg mr-4">Date d'expiration:</p>-->
<!--                  <p class="font-roboto font-bold text-xl" style="color: #FF4200">{{ confirmationData.expiryDate }}</p>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        &lt;!&ndash; Boutons &ndash;&gt;-->
<!--        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">-->
<!--          <button-->
<!--              type="button"-->
<!--              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-full sm:text-sm"-->
<!--              @click="confirmSubscription"-->
<!--          >-->
<!--            Confirmer-->
<!--          </button>-->
<!--          <button-->
<!--              type="button"-->
<!--              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-full sm:text-sm"-->
<!--              @click="showConfirmationModal = false"-->
<!--          >-->
<!--            Annuler-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->


</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import router from '../../../src/router'
import mtnLogo from '../../../src/assets/images/mtn-logo.png'
import orangeLogo from '../../../src/assets/images/orange-logo.png'


import { useRoute } from 'vue-router';
import createDecoderApiService from '@/services/decoderApiService'
import createShortlinkApiService from '@/services/shortlinkApiService'
import createRequiementApiService from '@/services/requiementApiService'

import PreSubscription from '@/data/class/PreSubscription'


const testDecoder = createDecoderApiService(
    "drive.topupbackup.com",
    "cee47ec8-4ae7-46dc-b131-dc00eb43d02e",
    "eG2ZA4Jr#c}y(FED{N8_fS"
);

const testShortlink = createShortlinkApiService(
    "drive.topupbackup.com",
    "cee47ec8-4ae7-46dc-b131-dc00eb43d02e",
    "eG2ZA4Jr#c}y(FED{N8_fS"
);

const requirement = createRequiementApiService(
    "drive.topupbackup.com",
    "cee47ec8-4ae7-46dc-b131-dc00eb43d02e",
    "eG2ZA4Jr#c}y(FED{N8_fS"
);

// Types pour les formules et opérateurs
type Formula = string;

type Bouquet = string;
type MobileOperator = 'MTN' | 'Orange' | null


export default defineComponent({
  name: 'interface',
  data() {
    return {
      mtnLogo,
      orangeLogo,
      isLoading : ref(false),

      // hidden id code
      merchant: null as number,
      decoder: 0 as number,

      // Types dynamiques pour chaque propriété
      selectedFormula: '' as Formula,
      selectedbouquets: [] as Bouquet[],
      selectedDuration: '01' as string,
      phoneNumber: '' as string,
      mobileOperator: null as MobileOperator,

      // Liste des mois d'abonnement disponibles
      subscriptionMonths: ['01', '03', '06', '12', '24'] as string[],

      decoderCode: '',
      decoderFormula: '',
      formattedExpiryDate: '',
      subscriberName: '',

      // Dynamiques et initialement vides
      availableFormulas: [] as Formula[],
      availableBouquets: [] as Bouquet[],

      // Prix par défaut si non fournis par l'API
      formulaPrices: {} as Record<Formula, number>,
      bouquetPrices: {} as Record<Bouquet, number>,

      showConfirmationModal: false,
      confirmationData: {
        formula: this.selectedFormula,
        options: this.selectedbouquets,
        duration:this.selectedDuration,
        expiryDate: this.formattedExpiryDate,
        total: 0,
        phoneNumber: this.phoneNumber,
        merchant: this.merchant,
        decoder: this.decoder,
      },
    }
  },
  computed: {
    // Computed property pour le logo de l'opérateur mobile
    mobileOperatorLogo(): string {
      switch(this.mobileOperator) {
        case 'MTN': return this.mtnLogo
        case 'Orange': return this.orangeLogo
        default: return ''
      }
    }
  },
  methods: {
    getPriceForFormula(formula: Formula): number {
      return this.formulaPrices[formula] || 0;
    },

    getPriceForBouquet(bouquet: Bouquet): number {
      return this.bouquetPrices[bouquet] || 0;
    },

    detectMobileOperator() {
      const regexNumberCam = /^(\+237|237)?6(2[0]\d{6}|[5-9]\d{7})$/;
      const orangeRegex = /^(\+237|237)?6(5[5-9]|8[5-9]|9[0-9])\d{6}$/;
      const mtnRegex = /^(\+237|237)?6(5[0-4]|7[0-9]|8[0-4])\d{6}$/;

      const cleanedPhoneNumber = this.phoneNumber.replace(/\s+/g, '');
      // Vérifie si le numéro est camerounais
      if (regexNumberCam.test(cleanedPhoneNumber)) {
        // Vérifie si c'est un numéro MTN
        if (mtnRegex.test(cleanedPhoneNumber)) {
          this.mobileOperator = 'MTN';
        }
        else if (orangeRegex.test(cleanedPhoneNumber)) {
          this.mobileOperator = 'Orange';
        }
        else {
          this.mobileOperator = null
        }
      }
      else {
        this.mobileOperator = null;
      }
    },

    calculateTotal(): number {
      let total = 0;
      if (this.selectedFormula) {
        total += this.getPriceForFormula(this.selectedFormula) * parseInt(this.selectedDuration);
      }

      this.selectedbouquets.forEach(bouquet => {
        total += this.getPriceForBouquet(bouquet) * parseInt(this.selectedDuration);
      });

      return total;
    },

    async submitForm() {
      if (!this.phoneNumber || !this.mobileOperator) {
        alert('Veuillez entrer un numéro de mobile valide')
        return
      }

      if (!this.selectedFormula) {
        alert('Veuillez choisir une formule')
        return
      }

      const presubmitData = new PreSubscription(
          null,
          null,
          this.merchant,
          this.selectedFormula,
          this.selectedbouquets,
          parseInt(this.selectedDuration),
          this.phoneNumber,
          this.calculateTotal()
      )
      try {
        this.showConfirmationModal =  true;
        const response = await presubmitData.prepareConfirm();
        console.log(response)
        if (response.confirmationToken){
          router.push({
            name: 'subscription-confirmation',
            query: { token: response.confirmationToken }
          });
          console.log(presubmitData)
          alert('Formulaire soumis avec succès!')
        }
        else {
          alert('La pré-inscription a réussi mais la confirmation est impossible');
        }

      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
        alert(`Échec de la pré-inscription : ${errorMessage}`);
      }
    },

    toggleBouquet(bouquet: Bouquet) {
      if (this.selectedbouquets.includes(bouquet)) {
        this.selectedbouquets = this.selectedbouquets.filter(b => b !== bouquet);
      } else {
        this.selectedbouquets.push(bouquet);
      }
    },

    formatDate(date: Date): string {
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    },

    async getrequiement() {
      this.isLoading = true;
      try {
        const resultrequis = await requirement.formuleOptions();

        // For formulas
        this.availableFormulas = resultrequis.formules.map(formula => formula.name || formula.getName());
        this.formulaPrices = resultrequis.formules.reduce((acc, formula) => {
          acc[formula.name || formula.getName()] = formula.amount || formula.getAmount();
          return acc;
        }, {});

        // For options/bouquets
        this.availableBouquets = resultrequis.options.map(option => option.name || option.getName());
        this.bouquetPrices = resultrequis.options.reduce((acc, option) => {
          acc[option.name || option.getName()] = option.amount || option.getAmount();
          return acc;
        }, {});
        this.isLoading = false;
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    }


  },

 props: {
    shortlink: {
      type: String,
      default: null, // Utilisé si c'est un ID
    },
    decoder: {
      type: Object,
      default: null, // Utilisé si c'est un objet
    },
  },
  setup() {
    const route = useRoute();
    return { route };
  },
  mounted: async function () {

    this.isLoading = true;
    const decoderFromRoute = this.route.query.decoder;

    if (decoderFromRoute) {

      const result = await testDecoder.decodeNumber(Number(decoderFromRoute));
      console.log(result.finished)
      if (result) {
        this.decoderCode = result.device?.toString() || '';
        this.decoderFormula = result.formula.name || '';
        this.subscriberName = result.subscriber?.lastname && result.subscriber?.firstname ? `${result.subscriber?.lastname} ${result.subscriber?.firstname}` : '';
        this.formattedExpiryDate = this.formatDate(new Date(result.finished.toString()) || new Date());
      }
      this.isLoading = false
    }

    if (this.shortlink) {

      if (this.shortlink.length === 14) {
        try {
          console.log('le numero de decodeur est :', this.shortlink);
          const result = await testDecoder.decodeNumber(Number(this.shortlink));
          console.log(result.finished);
          if (result) {
            this.decoderCode = result.device?.toString() || '';
            this.decoderFormula = result.formula.name || '';
            this.subscriberName = result.subscriber?.lastname && result.subscriber?.firstname ? `${result.subscriber?.lastname} ${result.subscriber?.firstname}` : '';
            this.formattedExpiryDate = this.formatDate(new Date(result.finished.toString()) || new Date());
          }
        } catch (error) {
          console.error('Error during decoding decoder:', error);
          router.push({ name: 'home' });
        }
        this.isLoading = false;
      } else {
        console.log('shorlink', this.shortlink);
        try {
          const result = await testShortlink.getshortlink(this.shortlink);
          console.log(result.merchant);
          if (result) {
            this.decoder = result.decoder.toString() || '';
            this.merchant = result.merchant.toString() || '';
            try {
              const decodeResult = await testDecoder.decodeNumber(result.decoder);
              console.log(decodeResult.finished);
              if (decodeResult) {
                this.decoderCode = decodeResult.device?.toString() || '';
                this.decoderFormula = decodeResult.formula.name || '';
                this.subscriberName = decodeResult.subscriber?.lastname && decodeResult.subscriber?.firstname ? `${decodeResult.subscriber?.lastname} ${decodeResult.subscriber?.firstname}` : '';
                this.formattedExpiryDate = this.formatDate(new Date(decodeResult.finished.toString()) || new Date());
              }
            } catch (error) {
              console.error('Error during decoding shortlink:', error);
              router.push({ name: 'home' });
            }
          }
        } catch (error) {
          console.error('Error during shortlink retrieval:', error);
          router.push({ name: 'home' });
        }
        this.isLoading = false;
      }
    }
    await this.getrequiement();
  }
})
</script>

