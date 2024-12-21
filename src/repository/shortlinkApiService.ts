import Shortlink from "../class/Shortlink";

interface ShortlinkApiService {
    getshortlink(shortlink: string): Promise<Shortlink>;
}

const createShortlinkApiService = (): ShortlinkApiService => {
    return {
        /**
         * @param shortlink
         * @returns
         */
        async getshortlink(shortlink: string) {
            try {
                    const response = await fetch('https://d.topup.cm/shortlink/', {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ shortlink }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Answer error:', response.status, errorText);
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data = await response.json();
                return Shortlink.fromJson(data.response);
            } catch (error) {
                console.error('Error during decoding :', error);
                throw new Error('Unable to decode number.');
            }
        }

    };
};

export default createShortlinkApiService;