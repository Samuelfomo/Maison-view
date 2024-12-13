const axios = require('axios');
require('dotenv').config();

const user = process.env.VITE_API_KEY;
const pass = process.env.VITE_API_SECRET;

const apiUrl = process.env.VITE_API_URL;

const base64Credentials = Buffer.from(`${user}:${pass}`).toString('base64');

const apiClient = axios.create({
    baseURL: apiUrl,
    headers: {
        'Authorization': `Basic ${base64Credentials}`,
    },
});

// Service pour décoder un numéro
const searchDecoderNumber = (decoder) => {
    return apiClient.put('/search/decoder/number/', { decoder });
};

// Service pour gerer un shortlink
const createShortlink = (shortlink) => {
    return apiClient.put('/shortlink/', { shortlink });
};

const createPresubmit = (merchant, decoder, formula, options, duration) => {
    return apiClient.put('/subscription/renewal/', { merchant, decoder, formula, options, duration });
};


const confirmedPay = async (confirmed, subscription, mobile) => {
    try {
        return await apiClient.put('/subscription/confirm/', {
            confirmed,
            subscription,
            mobile
        });
        // console.log('Réponse de l\'API :', response.data);
    } catch (error) {
        console.error('Erreur lors de l\'appel API :', {
            message: error.message,
            status: error.response?.status || 'Status inconnu',
            data: error.response?.data || 'Pas de réponse',
        });
        throw error;
    }
};


// Service pour récupérer des exigences
const fetchRequirement = () => {
    return apiClient.get('/requirement/');
};

// Export des fonctions
module.exports = {
    searchDecoderNumber,
    createShortlink,
    fetchRequirement,
    createPresubmit,
    confirmedPay
};

