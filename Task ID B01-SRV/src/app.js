const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const formRouter = require('./routes/form');

const app = express();
const port = 80;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/form', formRouter);   //using form.js

//connecting to database
require('./config/database');


app.use(express.static(__dirname + '/../FrontEnd'));

//GET requests
app.get('/', (req, res) => {
    res.status(200).redirect('home.html');
});

app.get('/about', (req, res) => {
    res.status(201).redirect('about.html');
});

app.get('/form', (req, res) => {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    res.redirect('form.html');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
