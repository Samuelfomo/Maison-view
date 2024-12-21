const DecoderSearch = require('../services/DecoderSearch');
const DecoderErrors = require('../class/DecoderError');

const express = require('express');

const router = express.Router();
const decoderSearch = new DecoderSearch();

router.post('/:decoderData', async (req, res) => {
    const data = req.body.decoder;

    console.log('Requête reçue :', {
        body: req.body,
        url: req.url,
        method: req.method
    });

    if (!data){
        return res.status(400).json({ message: 'The field \'Decoder\' is mandatory!' });
    }

    console.log(`\n🔍 Recherche du décodeur :`,data);
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

// const express = require('express');
// const DecoderSearch = require('../services/DecoderSearch');
// const router = express.Router();
// const decoderSearch = new DecoderSearch();
//
// // Modifiez cette route pour correspondre exactement
// router.post('/decoder', async (req, res) => {
//     const data = req.body.decoder;
//
//     console.log('Requête reçue :', {
//         body: req.body,
//         url: req.url,
//         method: req.method
//     });
//
//     if (!data){
//         return res.status(400).json({ message: 'Le champ \'Decoder\' est obligatoire!' });
//     }
//
//     try {
//         const decoder = await decoderSearch.search(data);
//         if (!decoder) {
//             return res.status(404).json({ error: 'Decoder not found' });
//         }
//
//         return res.json(decoder);
//     } catch (error) {
//         console.error('Erreur lors de la recherche du décodeur:', error);
//         return res.status(500).json({
//             status: 'error',
//             message: 'Une erreur serveur est survenue',
//         });
//     }
// });
//
// module.exports = router;