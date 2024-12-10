const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./router');



const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(cors({
    origin: 'https://d.topup.cm',
    methods: ['GET', 'POST']
}));

app.use(express.json());

app.use('/router', router);

// Servir les fichiers statiques du dossier dist
app.use(express.static(path.join(__dirname, 'dist')));

// Route qui renvoie à index.html pour toutes les requêtes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at https://d.topup.cm ${port}`);
    // console.log(`Server running at https://d.topup.cm`);
});