const RenewSubscription = require('../services/RenewSubscription');

const express = require('express');

const router = express.Router();
const prepareSubscription = new RenewSubscription();

router.post('/renewal/', async (req, res) => {
    const {merchant,decoder,duration,formula,options} = req.body;

    const SubscriptionData = {merchant, decoder, duration, formula, options};
    if(!formula || !duration || !decoder || !merchant){
        return res.status(400).json({ message: 'messing_required_fields' });
    }

    console.log(`\n🙏 votre abonnement en cours de validation est:`,SubscriptionData);
    try {
        const subscription = await prepareSubscription.Save(SubscriptionData);
        if (!subscription) {
            return res.status(404).json({ error: 'failed subscription' });
        }

        console.log('♥️ Subscription search Result');
        return res.json(subscription);
    } catch (error) {
        console.error('\n🔴 Error during subscription preparation', error);

        return res.status(500).json({
            status: 'error',
            message: 'A server error has occurred',
        });
    }
});

router.post('/confirm/', async (req, res) => {
    const {confirmed,subscription,mobile} = req.body;

    if (!subscription || !mobile || confirmed === undefined || confirmed === null || typeof confirmed !== 'boolean') {
        return res.status(400).json({ message: 'missing_required_fields' });
    }

    const ConfirmData = {confirmed, subscription, mobile};

    console.log(`\n😊 votre abonnement en cours de validation est:`,ConfirmData);
    try {
        const confirmed = await prepareSubscription.Confirm(ConfirmData);
        if (!confirmed) {
            return res.status(404).json({ error: 'failed subscription' });
        }

        console.log('♥️ Confirm Subscription search Result');
        return res.json(confirmed);
    } catch (error) {
        console.error('\n🔴 Error during subscription Confirm', error);

        return res.status(500).json({
            status: 'error',
            message: 'A server error has occurred',
        });
    }
});

module.exports = router;
