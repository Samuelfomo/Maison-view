const ShortlinkSearch = require('../services/ShortlinkSearch');

const express = require('express');

const router = express.Router();
const shortlinkSearch = new ShortlinkSearch();

router.post('/:shortlinkData', async (req, res) => {
    const data = req.body.shortlink;
    if (!data){
        return res.status(400).json({ message: 'The field \'Shortlink\' is mandatory!' });
    }

    console.log(`\n🔍 Recherche 02 du décodeur Shortlink:`,data);
    try {
        const shortlink = await shortlinkSearch.search(data);
        if (!shortlink) {
            return res.status(404).json({ error: 'Search Decoder by shortlink not found' });
        }

        console.log('♥️ Shortlink search Result');
        return res.json(shortlink);
    } catch (error) {
        console.error('\n🔴 Erreur lors de la recherche du décodeur:', error);

        return res.status(500).json({
            status: 'error',
            message: 'Une erreur serveur est survenue',
        });
    }
});

module.exports = router;
