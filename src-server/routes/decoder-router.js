const DecoderSearch = require('../services/DecoderSearch');
const DecoderErrors = require('../class/DecoderError');

const express = require('express');

const router = express.Router();
const decoderSearch = new DecoderSearch();

router.post('/:decoderData', async (req, res) => {
    const data = req.body.decoder;
    if (!data){
        return res.status(400).json({ message: 'The field \'Decoder\' is mandatory!' });
    }

    console.log(`\n🔍 Recherche 12 du décodeur :`,data);
    try {
        const decoder = await decoderSearch.search(data);
        if (!decoder) {
            return res.status(404).json({ error: 'Decoder not found' });
        }

        console.log('♥️ Decoder search Result');
        return res.json(decoder);
    } catch (error) {
        console.error('\n🔴 Erreur lors de la recherche du décodeur:', error);

        if (error instanceof DecoderErrors) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
            });
        }

        return res.status(500).json({
            status: 'error',
            message: 'Une erreur serveur est survenue',
        });
    }
});

module.exports = router;
