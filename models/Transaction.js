const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
  },
  airport_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  aircraft_no: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('transaction', TransactionSchema);
