import axios from 'axios';
import type { AxiosInstance } from 'axios';
import Decoder from "../data/class/Decoder";

interface DecoderApiService {

    decodeNumber(  decoder: number): Promise<Decoder>; // Remplacez `any` par un type spécifique si nécessaire
}

const createDecoderApiService = (
    endpoint: 'drive.topupbackup.com',
    username: 'cee47ec8-4ae7-46dc-b131-dc00eb43d02e',
    password: 'eG2ZA4Jr#c}y(FED{N8_fS'
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
         * 23800456666977
         * @param decoder
         * @returns
         */
        // async  decodeNumber(decoder: number) {
        //     try {
        //         const response = await fetch('http://localhost:5000/search/decoder/number', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify({ decoder }),
        //         });
        //
        //         // const data = await response.json();
        //         const data = await Decoder.todecoderAPIResponse(JSON.stringify(response.json()));
        //         return data;
        //     } catch (error) {
        //         console.error('Erreur lors du décodage:', error);
        //         throw new Error('Impossible de décoder le numéro.');
        //     }
        // }

        async decodeNumber(decoder: number) {
            try {
                const response = await fetch('http://localhost:3003/search/decoder/number', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ decoder }),
                });

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

    };
};

export default createDecoderApiService;