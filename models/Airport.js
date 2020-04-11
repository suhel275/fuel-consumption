const mongoose = require('mongoose');

const AirportSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fuel_capacity: {
    type: Number,
    required: true,
  },
  fuel_available: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('airport', AirportSchema);
