const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ers');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error while connecting to mongo db'));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
})

module.exports = db;