const mongoose = require('mongoose');

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

module.exports = mongoose.connection;
