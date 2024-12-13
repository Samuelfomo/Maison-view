const config = require('../utils/defaults');
const { Decoder } = require('../class/Decoders');
const axios = require('axios');
const { DecoderErrors } = require("../class/DecoderErrors");

class DecoderSearch {
    constructor() {
        this.baseUrl = config.api.baseURL;
        this.username = config.api.username;
        this.password = config.api.password;
    }

    async search(decoderNumber) {
        try {
            const response = await axios.put(`${this.baseUrl}/search/decoder/number/`, {
                decoder: decoderNumber
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(`${this.username}:${this.password}`).toString('base64')
                }
            });
            // return new Decoder(response.data);
            console.log(response);
            return response.data;

        } catch (error) {
            if (error instanceof DecoderErrors) {
                console.error('Decoder search failed:', error);
            }
            return null;
        }
    }
}

module.exports = DecoderSearch;