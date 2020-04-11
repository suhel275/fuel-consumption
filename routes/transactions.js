const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Airport = require('../models/Airport');
const Aircraft = require('../models/Aircraft');
const auth = require('../middleware/auth');

// @route   POST api/transactions
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    let transaction = {};
    let { type, airport_name, aircraft_no, quantity } = req.body;
    let airport = await Airport.findOne({ name: airport_name });
    quantity = parseInt(quantity, 10);

    if (type === 'IN') {
      transaction = new Transaction({
        type,
        airport_id: airport._id,
        quantity,
        airport_name,
      });
      airport.fuel_available =
        airport.fuel_capacity < quantity + airport.fuel_available
          ? airport.fuel_capacity
          : quantity + airport.fuel_available;
    } else {
      transaction = new Transaction({
        type,
        airport_id: airport._id,
        aircraft_no,
        quantity,
        airport_name,
      });
      airport.fuel_available =
        airport.fuel_available - quantity < 0
          ? 0
          : airport.fuel_available - quantity;
    }

    await transaction.save();
    airport = await Airport.findByIdAndUpdate(
      airport._id,
      { $set: airport },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send('transaction completed successfully');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET api/transactions
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let fuelTransactions = [];
    let temp = {
      airport_name: '',
      date: null,
      type: '',
      quantity: 0,
      aircraft_no: '',
    };

    const transactions = await Transaction.find();
    const airports = await Airport.find();

    for (let airport of airports) {
      for (let transaction of transactions) {
        if (airport._id.toString() === transaction.airport_id.toString()) {
          temp.airport_name = airport.name;
          temp.date = transaction.date;
          temp.type = transaction.type;
          temp.quantity = transaction.quantity;
          temp.aircraft_no = transaction.aircraft_no;

          fuelTransactions.push(temp);

          temp = {
            airport_name: '',
            date: null,
            type: '',
            quantity: 0,
            aircraft_no: '',
          };
        }
      }
    }

    fuelTransactions.sort(function (a, b) {
      return b.date - a.date;
    });

    res.send(fuelTransactions);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/transactions
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    await Transaction.remove({});

    res.json({ msg: 'Transactions are removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
