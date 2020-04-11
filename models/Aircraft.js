const mongoose = require('mongoose');

const AircraftSchema = mongoose.Schema({
  no: {
    type: String,
    required: true,
    unique: true,
  },
  airline: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('aircraft', AircraftSchema);
