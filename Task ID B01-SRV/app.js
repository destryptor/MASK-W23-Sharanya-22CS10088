const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

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

const app = express();

app.use(express.static('FrontEnd'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//validation rules
var loginValidate = [
    check('name').matches('^[A-Za-z ]+$').withMessage('Name should contain only alphabets.'),

    check('password')
        .isLength({ min: 8 }).withMessage('Password should be at least 8 characters long.')
        .matches('[0-9]').withMessage('Password Must Contain a Number')
        .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')
        .matches('[^A-Za-z0-9]').withMessage('Password must contain a special character'),

    check('phone')
        .matches('^[0-9]+$').withMessage('Phone number should have only digits (0-9)')
        .isLength({ min: 10, max: 10 }).withMessage('Phone number should be 10 digits long')
];

//validation endpoint
app.post('/validate', loginValidate, (req, res) => {
    const errors = validationResult(req);

    // console.log(errors.array());   //used this for debugging, which was just painful

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(422).json({ errors: errorMessages });
    }

    return res.status(200).send('Validation successful');
});

//form submission endpoint
app.post('/submit', (req, res) => {
    const { name, dob, address, email, password, phone } = req.body;

    const data = {
        "name": name,
        "dob": dob,
        "address": address,
        "email": email,
        "password": password,
        "phone": phone
    }

    const db = mongoose.connection;

    db.collection('FormDetails').insertOne(data, (error, result) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).send('Error while inserting data into the database. Please try again later.');
        } else {
            console.log('Data inserted successfully: ', result);
            return res.status(200).send('Data inserted successfully');
        }
    });
});

//the few GET requests
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
    return res.redirect('form.html');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
