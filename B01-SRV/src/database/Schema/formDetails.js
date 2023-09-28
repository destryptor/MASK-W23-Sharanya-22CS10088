const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
   name: String,
   dob: String,
   address: String,
   email: String,
   password: String,
   phone: String
}, {
   collection: 'FormDetails'
});

module.exports = mongoose.model('FormDetails', formSchema);

