import Requiement from "../data/class/Requiement";
import axios, {AxiosInstance} from "axios";

interface DecoderApiService {
    formuleOptions(): Promise<Requiement>;
}

const createRequiementApiService = (
    endpoint: 'drive.topupbackup.com',
    username: 'cee47ec8-4ae7-46dc-b131-dc00eb43d02e',
    password: 'eG2ZA4Jr#c}y(FED{N8_fS'
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
        // async formuleOptions() {
        //     try {
        //         const response = await fetch('http://localhost:5000/requirement', {
        //             method: 'GET',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //         });
        //
        //         if (!response.ok) {
        //             throw new Error(`Erreur HTTP: ${response.status}`);
        //         }
        //
        //         const data=  await response.json();
        //
        //          console.log(Requiement.fromJson(data.response));
        //         return Requiement.fromJson(data.response);
        //     } catch (error) {
        //         console.error('Erreur lors de la recuperation des elements requis :', error);
        //         throw new Error('Impossible de recuperer les elements.');
        //     }
        // }

        async formuleOptions() {
            try {
                const response = await fetch('http://localhost:3003/requirement', {
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