import axios from 'axios';
import type { AxiosInstance } from 'axios';
import Shortlink from "../class/Shortlink";


interface ShortlinkApiService {
    getshortlink(shortlink: string): Promise<Shortlink>;
}

const createShortlinkApiService = (
    endpoint: string = import.meta.env.VITE_API_URL as string,
    username: string = import.meta.env.VITE_API_KEY as string,
    password: string = import.meta.env.VITE_API_SECRET as string
): ShortlinkApiService => {

    const apiClient: AxiosInstance = axios.create({
        baseURL: `https://${endpoint}/shortlink/`,
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
        async getshortlink(shortlink: string) {
            try {
                const response = await fetch('http://192.168.100.103:3003/shortlink/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ shortlink }),
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