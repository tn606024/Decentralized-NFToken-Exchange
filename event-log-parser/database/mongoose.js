const mongoose = require('mongoose');
const config = require('config');

const mongoUrl = config.get('Mongo.location');
mongoose.Promise = global.Promise;
mongoose.connect(`${mongoUrl}/exchange`);

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.once('open', () => { console.log('mongo open!'); })
  .on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = { mongoose };
