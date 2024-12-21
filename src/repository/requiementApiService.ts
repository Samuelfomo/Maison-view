import Requiement from "../class/Requiement";

interface DecoderApiService {
    formuleOptions(): Promise<Requiement>;
}

const createRequiementApiService = (): DecoderApiService => {
    return {

        /**
         * get requiements formules en options
         */
        async formuleOptions() {
            try {
                const response = await fetch('https://d.topup.cm/get/requirement', {
                    method: 'GET',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Answer error:', response.status, errorText);
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data = await response.json();
                return Requiement.fromJson(data.response);
            } catch (error) {
                console.error('Error when retrieving required elements:', error);
                throw new Error('Impossible to recover elements.');
            }
        }

    };
};

export default createRequiementApiService;


