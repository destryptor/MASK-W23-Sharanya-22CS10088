const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
   name: String,
   dob: Date,
   address: String,
   email: String,
   password: String,
   phone: String
});

module.exports = mongoose.model('FormDetails', formSchema);
