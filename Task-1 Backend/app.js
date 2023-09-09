const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = 80;

const uri = 'mongodb://127.0.0.1:27017/TaskRound';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(uri, options)
    .then(() => {
        console.log("Connected to database 'TaskRound' successfully!");
    })
    .catch((error) => {
        console.log("Error in connecting to database: ", error);
    });

var db = mongoose.connection;

const app = express();

app.use(bodyParser.json());
app.use(express.static('FrontEnd'));
app.use(bodyParser.urlencoded({
    extended: true
}));

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

    db.collection('FormDetails').insertOne(data, (error, result) => {
        if (error) {
            console.error('Error inserting data:', error);
        } else {
            console.log('Data inserted successfully:', result);
        }
    });

    return res.redirect('thank_you.html');
})

app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html');
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
