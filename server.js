const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
// require('dotenv').config({ path: './config/.env' });

const config = require('./src-server/utils/defaults');
// const http = require('http');

const routerDecoder = require("./src-server/routes/decoder-router");
const routerRequiement = require("./src-server/routes/requiement-router");
const routerShortlink = require("./src-server/routes/shortlink-router");
const routerSubscriber = require("./src-server/routes/subscription-router");

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

// app.use(cors());
app.use(cors({
    origin: ['https://d.topup.cm', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use(`/${config.local.version}`, routerDecoder);
app.use(`/search`, routerDecoder);
app.use(`/`, routerShortlink);
app.use(`/get`, routerRequiement);
app.use(`/subscription`, routerSubscriber);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at https://${host}`);
});
// const server = http.createServer(app);
// server.listen(port, ()=> console.log(`Server running at http://localhost:${port}`));
