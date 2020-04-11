const express = require('express');
const router = express.Router();
const Airport = require('../models/Airport');
const auth = require('../middleware/auth');

// @route   GET api/airports
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const airports = await Airport.find();

    airports.sort(function (a, b) {
      var nameA = a.name.toLowerCase(),
        nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    res.send(airports);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/airports
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { name, fuel_capacity, fuel_available } = req.body;
    const airport = new Airport({
      name,
      fuel_capacity,
      fuel_available,
    });
    await airport.save();
    res.send(airport);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
