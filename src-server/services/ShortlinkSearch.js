const config = require('../utils/defaults');
const { Shortlink } = require('../class/Shortlink');
const axios = require('axios');

class ShortlinkSearch {
    constructor() {
        this.baseUrl = config.api.baseURL;
        this.username = config.api.username;
        this.password = config.api.password;
    }

    async search(shortlink) {
        try {
            const response = await axios.put(`${this.baseUrl}/shortlink/`, {
                shortlink: shortlink
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(`${this.username}:${this.password}`).toString('base64')
                }
            });
            // return new Shortlink(response.data);
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.error('Decoder search failed:', error);
            return null;
        }
    }
}

module.exports = ShortlinkSearch;