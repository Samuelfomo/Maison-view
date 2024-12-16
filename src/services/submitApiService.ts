import axios from 'axios';
import type { AxiosInstance } from 'axios';
import PreSubscription from "../class/PreSubscription";

interface SubmitApiService {

    formSubmit(  datas: PreSubscription): Promise<PreSubscription>;

    payement(phoneNumber: string, guid: number, confirmed: boolean): Promise<any>;
}

const createSubmitApiService = (
    endpoint: string = import.meta.env.VITE_API_URL as string,
    username: string = import.meta.env.VITE_API_KEY as string,
    password: string = import.meta.env.VITE_API_SECRET as string
): SubmitApiService => {
    // Crée un client Axios configuré
    const apiClient: AxiosInstance = axios.create({
        baseURL: `https://${endpoint}/presubmit/`,
        headers: {
            'Content-Type': 'application/json',
        },
        auth: {
            username,
            password,
        },
    });

    return {
        /**
         * send datas for prepare ppayement off user
         * @param datas
         * @returns
         */
        async formSubmit(datas: PreSubscription) {
            try {
                // const response = await fetch('http://192.168.100.103:3003/subscription/renewal/', {
                const response = await fetch('http://localhost:5000/subscription/renewal', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        merchant: datas.merchant,
                        decoder: datas.decoder,
                        formula: datas.formula,
                        options: datas.options,
                        duration: datas.duration
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const data = await response.json();
                return PreSubscription.fromJson(data.response);
            } catch (error) {
                console.error('Erreur lors de l\'envoi des donnees :', error);
                throw new Error('Impossible d\'envoyer les donnees.');
            }
        },

        // New payment method
        async payement(phoneNumber: string, guid: number, confirmed: boolean) {
            try {
                console.log('confirmation',confirmed);
                const response = await fetch('http://localhost:5000/subscription/confirm/', {
                // const response = await fetch('http://192.168.100.103:3003/subscription/confirm/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        confirmed: confirmed,
                        subscription: guid,
                        mobile: phoneNumber
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Erreur de paiement: ${response.status}`);
                }
                const data = await response.json();
                if (data.status === 1) {
                    return {
                        success: true,
                        transactionId: guid || null,
                        message: 'Paiement réussi'
                    };
                } else {
                    return {
                        success: false,
                        message: data.message || 'Échec du paiement'
                    };
                }
            } catch (error) {
                console.error('Erreur lors du paiement :', error);
                throw new Error('Impossible de traiter le paiement.');
            }
        }

    };
};

export default createSubmitApiService;