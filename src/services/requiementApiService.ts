import Requiement from "../class/Requiement";
import axios, {AxiosInstance} from "axios";

interface DecoderApiService {
    formuleOptions(): Promise<Requiement>;
}

const createRequiementApiService = (
    endpoint: string = import.meta.env.VITE_API_URL as string,
    username: string = import.meta.env.VITE_API_KEY as string,
    password: string = import.meta.env.VITE_API_SECRET as string
): DecoderApiService => {
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
         * get requiements formules en options
         */
        async formuleOptions() {
            try {
                const response = await fetch('http://192.168.100.103:3003/get/requirement', {
                    method: 'GET',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                return Requiement.fromJson(data.response);
            } catch (error) {
                console.error('Erreur lors de la recuperation des elements requis :', error);
                throw new Error('Impossible de recuperer les elements.');
            }
        }

    };
};

export default createRequiementApiService;