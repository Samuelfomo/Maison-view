import Requiement from "../data/class/Requiement";
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
                const response = await fetch('https://d.topup.cm/requirement', {
                    method: 'GET',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const data = await response.json();

                // Crée un objet Requiement à partir du JSON
                return Requiement.fromJson(data.response);

            } catch (error) {
                console.error('Erreur lors de la recuperation des elements requis :', error);
                throw new Error('Impossible de recuperer les elements.');
            }
        }

    };
};

export default createRequiementApiService;