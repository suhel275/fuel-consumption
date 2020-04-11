const express = require('express');
const router = express.Router();
const Aircraft = require('../models/Aircraft');
const auth = require('../middleware/auth');

// @route   GET api/aircrafts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const aircrafts = await Aircraft.find();

    aircrafts.sort(function (a, b) {
      var noA = a.no.toLowerCase(),
        noB = b.no.toLowerCase();
      if (noA < noB) return -1;
      if (noA > noB) return 1;
      return 0;
    });

    res.send(aircrafts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/aircrafts
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { no, airline, source, destination } = req.body;
    const aircraft = new Aircraft({ no, airline, source, destination });
    await aircraft.save();
    res.send(aircraft);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
