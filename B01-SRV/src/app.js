const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//connecting to database
require('./database/database');

//importing the routers
const formRouter = require('./routes/formroutes');
const router = require("./routes/routes");

const app = express();
const port = 80;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/../FrontEnd'));

app.use('/form', formRouter);   //using formroutes.js
app.use(router);  //using routes.js


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
