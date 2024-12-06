const express = require('express');
const { searchDecoderNumber, createShortlink, fetchRequirement } = require('./service');

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

module.exports = router;
