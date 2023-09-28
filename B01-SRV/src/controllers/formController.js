const FormDetails = require('../database/Schema/formDetails');
const mongoose = require('mongoose');

const handleFormSubmission = (req, res) => {
    const { name, dob, address, email, password, phone } = req.body;

    const formData = new FormDetails({
        name,
        dob,
        address,
        email,
        password,
        phone
    });

    //saving the data to the database
    formData.save()
        .then((result) => {
            console.log('Data inserted successfully', result);
            return res.status(200).send('Data inserted successfully');
        })
        .catch(error => {
            console.error('Error inserting data:', error);
            return res.status(500).send('Error while inserting data into the database. Please try again later.');
        });
};

module.exports = {
    handleFormSubmission,
};
