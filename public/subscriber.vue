<template>
  <div class="fixed top-4 right-4 z-50 name">
    <TransitionGroup v-if="alerts && alerts.length > 0" tag="div" name="alert">
      <div
          v-for="alert in alerts"
          :key="alert.id"
          :class="{
      'bg-green-500 text-white': alert.type === 'success',
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

                <!-- New hidden input for formula ID -->
                <input
                    type="hidden"
                    :id="`formula-code-${formula}`"
                    :value="getFormulaCode(formula)"
                />

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

                <!-- New hidden input for bouquet ID -->
                <input
                    type="hidden"
                    :id="`bouquet-id-${bouquet}`"
                    :value="getBouquetCode(bouquet)"
                />

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

      <div class="inline-block align-bottom bg-white rounded-lg border-gray-300  text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
        <!-- En-tête -->
        <div class="bg-black text-white text-center py-3">
          <h3 class="text-2xl font-bold font-roboto">Confirmer l’opération</h3>
        </div>

        <!-- Contenu principal -->
        <div class="bg-white px-6 py-4">
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <p class="font-bold  text-gray-700 font-roboto text-lg">Décodeur</p>
              <span class="font-bold text-gray-700 font-roboto text-lg flex-1 pl-1 relative">:</span>
              <p class="font-medium font-roboto text-md text-black">{{ confirmationData.decoder }}</p>
            </div>
            <div class="flex justify-between items-center">
              <p class="font-bold text-gray-700 font-roboto text-lg">Formule</p>
              <span class="font-bold text-gray-700 font-roboto text-lg flex-1 pl-4 relative">:</span>
              <p class=" font-medium font-roboto">{{ confirmationData.formula }}</p>
            </div>
            <div class="flex justify-between items-center">
              <p class="font-bold text-gray-700 font-roboto text-lg">Durée</p>
              <span class="font-bold text-gray-700 font-roboto text-lg flex-1 pl-9 relative">:</span>
              <p class=" font-medium font-roboto">{{ confirmationData.duration }} mois</p>
            </div>
            <div class="flex justify-between items-center">
              <p class=" font-bold text-gray-700 font-roboto text-lg">Options</p>
              <span class="font-bold text-gray-700 font-roboto text-lg flex-1 pl-5 relative">:</span>
              <ul class=" justify-items-end pl-10 space-y-2">
                <li v-for="option in confirmationData.options" :key="option" class="font-medium font-roboto ">{{ option }}</li>
              </ul>
            </div>
            <div class="flex justify-between items-center">
              <p class="font-bold text-gray-700 font-roboto text-lg">Total</p>
              <span class="font-bold text-gray-700 font-roboto text-lg flex-1 pl-12 relative">:</span>
              <p class=" font-medium font-roboto text-lg">{{ formatTotalAmount(confirmationData.total) }}</p>
            </div>
          </div>
        </div>

        <div hidden>
          {{ confirmationData.guid }}
        </div>

        <!-- Pied de page -->
        <div class=" px-4 py-3 flex justify-between items-center font-patrick-hand  border-b border-t border-gray-300">
          <p class="text-sm text-gray-600">
            La somme de <span class="font-bold text-lg">{{ formatTotalAmount(confirmationData.total) }}</span>
            (<span class="italic">{{ convertNumberToWords(confirmationData.total) }}</span>)
            sera débitée de votre compte.
          </p>
        </div>

        <div class="bg-gray-100 px-4 py-3 flex justify-between items-center">

          <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-full sm:text-sm"
              @click="cancelConfirmation()"
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
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {Alert} from '@/class/PreSubscription'
import router from '@/router'
import mtnLogo from '@/assets/images/mtn-logo.png'
import orangeLogo from '@/assets/images/orange-logo.png'


import { useRoute } from 'vue-router';
import createDecoderApiService from '@/services/decoderApiService'
import createShortlinkApiService from '@/services/shortlinkApiService'
import createRequiementApiService from '@/services/requiementApiService'
import createSubscriptionApiService from '@/services/submitApiService'

import PreSubscription from '@/class/PreSubscription'

const testDecoder = createDecoderApiService(
    import.meta.env.VITE_API_URL,
    import.meta.env.VITE_API_KEY,
    import.meta.env.VITE_API_SECRET
);

const testShortlink = createShortlinkApiService();

const requirement = createRequiementApiService();

const subscription = createSubscriptionApiService()

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
      alerts: [] as Alert[],
      confirmed: false as boolean,

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
        formula: '',
        options: [],
        duration: '',
        expiryDate: '',
        total: 0,
        phoneNumber: '',
        merchant: '',
        decoder: '',
        guid:''
      },

      resultrequis: null,
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
        this.showMessage('Veuillez entrer un numéro de mobile valide', 'warning');
        return
      }

      if (!this.selectedFormula) {
        this.showMessage('Veuillez choisir une formule', 'warning');
        return
      }

      const presubmitData = new PreSubscription(
          null,
          null,
          this.decoderCode,
          this.merchant || 444229,
          this.getFormulaCode(this.selectedFormula),
          this.getBouquetCode(this.selectedbouquets) || [],
          parseInt(this.selectedDuration),
          null,
          null,
      )
      try {
        const response = await subscription.formSubmit(presubmitData);
        if (response){
          console.log('les donnees recu de l\'api sont :', this.decoderCode, this.decoder)
          this.showConfirmationModal =  true;
          this.confirmationData.decoder = this.decoderCode;
          this.confirmationData.formula = this.selectedFormula;
          this.confirmationData.options = this.selectedbouquets;
          this.confirmationData.duration = this.selectedDuration;
          this.confirmationData.expiryDate = this.formattedExpiryDate;
          this.confirmationData.amount = this.calculateTotal();
          this.confirmationData.total = this.calculateTotal();
          this.confirmationData.phoneNumber = this.phoneNumber;
          this.confirmationData.merchant = this.merchant;
          this.confirmationData.guid = response.code;
          console.log('guid',this.confirmationData.guid, 'phone', this.phoneNumber)
        }
        else {
          this.showMessage('La pré-inscription a réussi mais la confirmation est impossible', 'error');
        }

      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
        this.showMessage(`Échec de la pré-inscription : ${errorMessage}`, 'error');
      }
    },

    async confirmSubscription() {
      this.confirmed = true;
      try {
        console.log('confirm', this.confirmed)
        const paymentResult = await subscription.payement(this.phoneNumber, parseInt(this.confirmationData.guid), this.confirmed);
        if (paymentResult.success) {
          // Payment successful
          this.showMessage('Paiement en cours, vous allez recevoir le message de confirmation! Transaction ID: ' + paymentResult.transactionId,'success');
          this.showConfirmationModal = false;
        } else {
          // Payment failed
          this.showMessage('Échec du paiement : ' + paymentResult.message, 'error');
        }
        await this.clearSubscription();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
        this.showMessage(`Échec du paiement : ${errorMessage}`, 'error');
      }
      finally {
        // Reset confirmed to false after the operation
        this.confirmed = false;
      }
    },

    cancelConfirmation() {
      console.log('cancel', this.confirmed)
      this.confirmed = false;
      this.showConfirmationModal = false;
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

        // Store the full result to use in ID lookup methods
        this.resultrequis = resultrequis;

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
        this.showMessage('Erreur lors de la récupération des données', error, 'error');
        console.error('Erreur lors de la récupération des données', error);
      }
    },

    getFormulaCode(formula: Formula): string | null {
      const foundFormula = this.resultrequis.formules.find(
          f => f.name === formula
      );
      return foundFormula ? (foundFormula.code) : null;
    },

    getBouquetCode(): string[] | null {
      return this.selectedbouquets.map(bouquet => {
        const foundBouquet = this.resultrequis.options.find(
            o => o.name === bouquet
        );
        return foundBouquet ? foundBouquet.code : null;
      }).filter(code => code !== null);
    },

    showMessage(msg: string, type: 'success' | 'warning' | 'error' = 'success') {
      // Évite les doublons de message
      if (this.alerts.some(alert => alert.message === msg)) return;

      const id = Date.now();
      this.alerts.push({
        id,
        title: this.getAlertTitle(type), // Titre dynamique basé sur le type
        message: msg,
        type: type
      });

      // Faire disparaître l'alerte après 3 secondes
      setTimeout(() => {
        this.removeAlert(id);
      }, 3000);
    },

    // Méthode pour obtenir le titre approprié
    getAlertTitle(type: 'success' | 'warning' | 'error'): string {
      switch(type) {
        case 'success': return 'Succès';
        case 'warning': return 'Attention';
        case 'error': return 'Erreur';
      }
    },

    removeAlert(id: number | string) {
      this.alerts = this.alerts.filter(alert => alert.id !== id);
    },

    formatTotalAmount(amount: number, currency: string = 'XAF', separatorChar: string = ' '): string {
      const roundedAmount = Math.round(amount);
      return roundedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separatorChar) + ` ${currency}`;
    },

    convertNumberToWords(num: number): string {
      // Tableau des unités
      const unites = [
        '', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf',
        'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize',
        'dix-sept', 'dix-huit', 'dix-neuf'
      ];

      // Tableau des dizaines
      const dizaines = [
        '', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante',
        'soixante', 'quatre-vingt', 'quatre-vingt'
      ];

      // Fonction récursive pour convertir les centaines
      const convertHundreds = (n: number): string => {
        if (n === 0) return '';

        if (n === 100) return 'cent';

        if (n < 100) {
          if (n < 20) return unites[n];

          const dizaine = Math.floor(n / 10);
          const unite = n % 10;

          // Cas spéciaux pour 70, 80, 90
          if (dizaine === 7) return dizaines[6] + (unite === 0 ? '' : '-' + (unite === 1 ? 'et-un' : unites[unite + 10]));
          if (dizaine === 9) return dizaines[8] + (unite === 0 ? '' : '-' + unites[unite + 10]);

          // Cas général
          return dizaines[dizaine] +
              (unite === 0 ? '' :
                  (dizaine === 8 ? '-' : (unite === 1 ? ' et ' : '-')) +
                  unites[unite]);
        }

        // Pour les centaines
        const centaines = Math.floor(n / 100);
        const reste = n % 100;

        return (centaines === 1 ? 'cent' : unites[centaines] + ' cent') +
            (reste === 0 ? '' : ' ' + convertHundreds(reste));
      };

      // Gestion des cas spéciaux
      if (num === 0) return 'zéro';

      let result = '';
      const milliards = Math.floor(num / 1000000000);
      const millions = Math.floor((num % 1000000000) / 1000000);
      const milliers = Math.floor((num % 1000000) / 1000);
      const reste = num % 1000;

      // Construction du résultat
      if (milliards > 0) {
        result += convertHundreds(milliards) + (milliards === 1 ? ' milliard ' : ' milliards ');
      }

      if (millions > 0) {
        result += convertHundreds(millions) + (millions === 1 ? ' million ' : ' millions ');
      }

      if (milliers > 0) {
        result += (milliers === 1 ? 'mille ' : convertHundreds(milliers) + ' mille ');
      }

      if (reste > 0 || (milliards === 0 && millions === 0 && milliers === 0)) {
        result += convertHundreds(reste);
      }

      return result.trim() + ' francs CFA';
    },

    clearSubscription(){
      this.phoneNumber = '';
      this.mobileOperator = null;
      this.selectedFormula = '';
      this.selectedbouquets = [];
      this.selectedDuration = '01';
      this.formattedExpiryDate = '';
      this.subscriberName = '';
      this.decoderCode = '';
      this.decoderFormula = '';
    }

  },

 props: {
    shortlink: {
      type: String,
      default: null,
    },
    decoder: {
      type: Object,
      default: null,
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
      this.showMessage('decoder verification successful', 'success');
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
          this.showMessage('Error during decoding decoder:', error, 'error');
          console.error('Error during decoding decoder:', error);
          router.push({ name: 'home' });
        }
        this.isLoading = false;
        this.showMessage('access confirmed', 'success');
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
              this.showMessage('Error during decoding shortlink:', error, 'error');
              console.error('Error during decoding shortlink:', error);
              router.push({ name: 'home' });
            }
          }
        } catch (error) {
          this.showMessage('Error during shortlink retrieval:', error, 'error');
          console.error('Error during shortlink retrieval:', error);
          router.push({ name: 'home' });
        }
        this.isLoading = false;
        this.showMessage('access confirmed', 'success');
      }
    }
    await this.getrequiement();
  }
})
</script>

