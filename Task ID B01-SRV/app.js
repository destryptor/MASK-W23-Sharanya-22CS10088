//declaring constants and initialising them
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = 80;

const uri = 'mongodb://127.0.0.1:27017/TaskRound';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

//connecting to the MongoDB database
mongoose.connect(uri, options)
    .then(() => {
        console.log("Connected to database 'TaskRound' successfully!");
    })
    .catch((error) => {
        console.log("Error in connecting to database: ", error);
    });

var db = mongoose.connection;

//initialising the app
const app = express();

app.use(bodyParser.json());
app.use(express.static('FrontEnd'));
app.use(bodyParser.urlencoded({
    extended: true
}));

//defining the POST request
app.post('/submit', function (req, res) {
    var name = req.body.name;
    var dob = req.body.dob;
    var address = req.body.address;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;

    var data = {
        "name": name,
        "dob": dob,
        "address": address,
        "email": email,
        "password": password,
        "phone": phone
    }

    //inserting the data into the database
    db.collection('FormDetails').insertOne(data, (error, result) => {
        if (error) {
            console.error('Error inserting data:', error);
        } else {
            console.log('Data inserted successfully:', result);
        }
    });

    //redirecting to a primitive 'thank you' page after form submission
    return res.redirect('thank_you.html');
})

//a simple GET request to view the initial form page
app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html');
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
