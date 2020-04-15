const mongoose = require('mongoose');
const config = require('config');

const { Schema } = mongoose;

const collection = config.get('EventStatus.collection');

const EventStatusSchema = new Schema({
  status: {
    type: Number,
  },
  _id: {
    type: String,
    alias: 'event',
  },
});

const EventStatus = mongoose.model(collection, EventStatusSchema);
module.exports = EventStatus;
