const express = require('express');
const { searchDecoderNumber, createShortlink, fetchRequirement, createPresubmit, confirmedPay } = require('./service');
const router = express.Router();

// Route pour décoder un numéro
router.post('/search/decoder/number', async (req, res) => {
    const { decoder } = req.body;
    try {
        const response = await searchDecoderNumber(decoder);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la requête vers l\'API', error: error.message });
    }
});

// Route pour créer un shortlink
router.post('/shortlink', async (req, res) => {
    const { shortlink } = req.body;
    try {
        const response = await createShortlink(shortlink);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la requête vers l\'API', error: error.message });
    }
});

// Route pour récupérer des exigences
router.get('/requirement', async (req, res) => {
    try {
        const response = await fetchRequirement();
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la requête vers l\'API', error: error.message });
    }
});

router.post('/subscription/renewal', async (req, res) =>{
    const {merchant, decoder, formula, options, duration} = req.body;
    if(!formula || !duration || !decoder){
        return res.status(400).json({ message: 'messing_required_fields' });
    }

    try {
        const response = await createPresubmit(merchant, decoder, formula, options, duration);
        res.json(response.data);

    } catch (error){
        res.status(500).json({ message: 'Erreur lors de la requête vers l\'API', error: error.message });
    }
})
router.post('/subscription/confirm', async (req, res) =>{
    const {confirmed, subscription, mobile} = req.body;
    // console.log('donnees recues',req.body);

    if (confirmed === undefined || confirmed === null || typeof confirmed !== 'boolean') {
        return res.status(400).json({ message: 'missing_required_fields' });
    }

    try {
        const response = await confirmedPay(confirmed, subscription, mobile);
        res.json(response.data);

    } catch (error){
        res.status(500).json({ message: 'Erreur lors de la requête vers l\'API', error: error.message });
    }
})

module.exports = router;
