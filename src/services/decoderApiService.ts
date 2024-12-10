import axios from 'axios';
import type { AxiosInstance } from 'axios';
import Decoder from "../data/class/Decoder";

interface DecoderApiService {

    decodeNumber(  decoder: number): Promise<Decoder>;
}

const createDecoderApiService = (
    endpoint: string = import.meta.env.VITE_API_URL_VU as string,
    username: string = import.meta.env.VITE_API_KEY as string,
    password: string = import.meta.env.VITE_API_SECRET as string

): DecoderApiService => {
    // Crée un client Axios configuré
    const apiClient: AxiosInstance = axios.create({
        baseURL: `https://${endpoint}/search/decoder/number/`,
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
         * send datas for local server for verify decoder
         * @param decoder
         */
        async decodeNumber(decoder: number) {
            try {

                // const response = await fetch('https://d.topup.cm/search/decoder/number', {
                const response = await fetch('https://d.topup.cm/search/decoder/number/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ decoder }),
                });

                console.log(await response.text());

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const data = await response.json();
                return Decoder.fromJson(data.response);
            } catch (error) {
                console.error('Erreur lors du décodage :', error);
                throw new Error('Impossible de décoder le numéro.');
            }
        }

        // async decodeNumber(decoder: number) {
        //     try {
        //         const response = await apiClient.post('', { decoder });
        //         console.log(await response);
        //         return Decoder.fromJson(response.data.response);
        //     } catch (error) {
        //         console.error('Erreur lors du décodage :', error);
        //         throw new Error('Impossible de décoder le numéro.');
        //     }
        // }


    };
};

export default createDecoderApiService;