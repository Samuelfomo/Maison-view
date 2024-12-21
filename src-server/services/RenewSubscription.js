const config = require('../utils/defaults');
const { Subscription } = require('../class/Subscription');
const axios = require('axios');

class RenewSubscription {
    constructor() {
        this.baseUrl = config.api.baseURL;
        this.username = config.api.username;
        this.password = config.api.password;
    }

    async Save(SubscriptionData) {
        try {
            const response = await axios.post(`${this.baseUrl}/subscription/renewal/`, SubscriptionData,
      {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(`${this.username}:${this.password}`).toString('base64')
                }
            });
            // return new Subscription(response.data);
            console.log('API response:', response.data);
            return response.data;

        } catch (error) {
            console.error('Subscription renewal failure :', error);
            return null;
        }
    }

    async Confirm(ConfirmData) {
        try {
            const response = await axios.put(`${this.baseUrl}/subscription/confirm/`, ConfirmData,
      {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(`${this.username}:${this.password}`).toString('base64')
                }
            });
            // return new Subscription(response.data);
            console.log('API response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Subscription confirm failure :', error);
            return null;
        }
    }
}

module.exports = RenewSubscription;