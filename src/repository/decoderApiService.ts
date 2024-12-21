import Decoder from "../class/Decoder";

interface DecoderApiService {

    decodeNumber(  decoder: number): Promise<Decoder>;
}

const createDecoderApiService = (): DecoderApiService => {

    return {

        /**
         * send datas for local src-server for verify decoder
         * @param decoder
         */
        async decodeNumber(decoder: number) {
            try {
                    const response = await fetch(`https://d.topup.cm/search/decoder/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ decoder }),
                });

                if (!response.ok) {
                     const errorText = await response.text();
                    console.error('Answer error:', response.status, errorText);
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                return Decoder.fromJson(data.response);
            } catch (error) {
                console.error('Error during decoding :', error);
                throw new Error('Unable to decode number.');
                throw new Error('Unable to decode number.');
            }
        }
    };
};

export default createDecoderApiService;