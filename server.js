const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./router');
const config = require('./src-server/utils/defaults');
const routerDecoder = require("./src-server/routes/decoder-router");
const routerRequiement = require("./src-server/routes/requiement-router");


const app = express();
const port = process.env.PORT || 3003;

app.use(cors());

app.use(express.json());

// app.use('/', router);
app.use(`/`, routerDecoder);
app.use(`/`, routerRequiement);
// app.use(`/${config.local.version}`, router);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    // console.log(`Server running at https://d.topup.cm`);
});