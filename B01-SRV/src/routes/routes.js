const express = require('express');
const router = express.Router();
const path = require('path');

router.use((req, res, next) => {
    res.renderFile = file => res.status(200).sendFile(path.join(__dirname, '/../../FrontEnd', file));
    next();
});

//GET requests
router.get('/', (req, res) => {
    res.renderFile('home.html');
});

router.get('/about', (req, res) => {
    res.renderFile('about.html');
});

router.get('/form', (req, res) => {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    res.renderFile('form.html');
});

module.exports = router;
