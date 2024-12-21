import axios from 'axios';
import type { AxiosInstance } from 'axios';
import PreSubscription from "../class/PreSubscription";

interface SubmitApiService {

    formSubmit(  datas: PreSubscription): Promise<PreSubscription>;

    payement(phoneNumber: string, guid: number, confirmed: boolean): Promise<any>;
}

const createSubmitApiService = (): SubmitApiService => {

    return {
        /**
         * send datas for prepare ppayement off user
         * @param datas
         * @returns
         */
        async formSubmit(datas: PreSubscription) {
            try {
                const response = await fetch('https://d.topup.cm/subscription/renewal/', {
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
                console.error('Error sending data :', error);
                throw new Error('Cannot send data.');
            }
        },

        // New payment method
        async payement(phoneNumber: string, guid: number, confirmed: boolean) {
            try {
                console.log('confirmation',confirmed);

                const response = await fetch('https://d.topup.cm/subscription/confirm/', {
                    // const response = await fetch('api/subscription/confirm/', {
                // const response = await fetch('https://66.179.251.205:5000/subscription/confirm/', {
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
                    const errorText = await response.text();
                    console.error('incorrect answer:', response.status, errorText);
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const data = await response.json();
                if (data.status === 1) {
                    return {
                        success: true,
                        transactionId: guid || null,
                        message: 'Successful payment'
                    };
                } else {
                    return {
                        success: false,
                        message: data.message || 'Payment failed'
                    };
                }
            } catch (error) {
                console.error('Error during payment :', error);
                throw new Error('Impossible to process payment.');
            }
        }

    };
};

export default createSubmitApiService;