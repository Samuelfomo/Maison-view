// const express = require('express');
// const RequiementSearch = require('../repository/RequiementSearchs');
// const router = express.Router();
//
// const requiementSearch = new RequiementSearch();
//
// // Route pour récupérer des exigences
// router.get('/requirement', async (req, res) => {
//     try {
//         const requiement = await requiementSearch.search();
//         if (!requiement) {
//             return res.status(404).json({ error: 'requiement not found' });
//         }
//
//         console.log('♥️ requiement search Result');
//         return res.json(requiement);
//     } catch (error) {
//         console.error('\n🔴 Erreur lors de la recherche des elements:', error);
//         return res.status(500).json({
//             status: 'error',
//             message: 'Une erreur serveur est survenue'
//         });
//     }
// });
//
// module.exports = router;

const express = require('express');
const RequirementSearch = require('../services/RequiementSearch');
const router = express.Router();

const requirementSearch = new RequirementSearch();

// Route pour récupérer des exigences
router.get('/requirement', async (req, res) => {
    try {
        const requirements = await requirementSearch.search();

        if (!requirements || (Array.isArray(requirements) && requirements.length === 0)) {
            return res.status(404).json({ error: 'requiement not found' });
        }

        console.log('♥️ requiement search Result');
        return res.json(requirements);
    } catch (error) {
        console.error('\n❌ Erreur lors de la recherche des éléments:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Une erreur serveur est survenue'
        });
    }
});

module.exports = router;
