const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to Airport Fuel Inventory API ...' })
);

// Define Routes
app.use('/api/airports', require('./routes/airports'));
app.use('/api/aircrafts', require('./routes/aircrafts'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/user', require('./routes/user'));
app.use('/api/report', require('./routes/report'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
