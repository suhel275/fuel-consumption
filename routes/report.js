const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Airport = require('../models/Airport');
const auth = require('../middleware/auth');

// @route   GET api/report
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let fuelConsumption = [];
    let airportFuel = [];
    let count = 0;
    let temp = {
      airport_name: '',
      date: null,
      type: '',
      quantity: 0,
      aircraft_no: '',
      fuel_available: 0,
    };
    const airports = await Airport.find();
    const transactions = await Transaction.find();

    for (let airport of airports) {
      for (let transaction of transactions) {
        if (airport._id.toString() === transaction.airport_id.toString()) {
          temp.airport_name = airport.name;
          temp.date = transaction.date;
          temp.type = transaction.type;
          temp.quantity = transaction.quantity;
          temp.aircraft_no = transaction.aircraft_no;
          temp.fuel_available = airport.fuel_available;

          airportFuel.push(temp);
          count++;

          temp = {
            airport_name: '',
            date: null,
            type: '',
            quantity: 0,
            aircraft_no: '',
            fuel_available: 0,
          };
        }
      }
      if (count > 0) {
        fuelConsumption.push(airportFuel);
        airportFuel = [];
        count = 0;
      }
    }

    res.json(fuelConsumption);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
