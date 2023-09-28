const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const formController = require('../controllers/formController');
const formDetails = require('../database/Schema/formDetails');

//validation rules
const loginValidate = [
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
router.post('/validate', loginValidate, (req, res) => {
    // console.log('Validation route called');  //used for debugging
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(422).json({ errors: errorMessages });
    }

    return res.status(200).send('Validation successful');
});

//form submission endpoint
router.post('/submit', loginValidate, formController.handleFormSubmission);

module.exports = router;
