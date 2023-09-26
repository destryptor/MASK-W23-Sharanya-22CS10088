const FormDetails = require('../models/formDetails');
const mongoose = require('mongoose');

const handleFormSubmission = (req, res) => {
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
};

module.exports = {
    handleFormSubmission,
};
