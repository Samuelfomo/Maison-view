import axios from 'axios';
import type { AxiosInstance } from 'axios';
import Shortlink from "../data/class/Shortlink";


interface ShortlinkApiService {
    getshortlink(shortlink: string): Promise<Shortlink>; // Remplacez `any` par un type spécifique si nécessaire
}

const createShortlinkApiService = (
    endpoint: 'drive.topupbackup.com',
    username: 'cee47ec8-4ae7-46dc-b131-dc00eb43d02e',
    password: 'eG2ZA4Jr#c}y(FED{N8_fS'
): ShortlinkApiService => {

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
         * @param shortlink
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

        async getshortlink(shortlink: string) {
            try {
                const response = await fetch('http://localhost:3003/shortlink', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ shortlink: shortlink }),
                });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                return Shortlink.fromJson(data.response);
            } catch (error) {
                console.error('Erreur lors du décodage :', error);
                throw new Error('Impossible de décoder le numéro.');
            }
        }

    };
};

export default createShortlinkApiService;