const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const pool = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests' }
  }
});

app.use(limiter);

// Routes
const statesRouter = require('./routes/states');
const districtsRouter = require('./routes/districts');
const subDistrictsRouter = require('./routes/subdistricts');
const villagesRouter = require('./routes/villages');
const searchRouter = require('./routes/search');
const autocompleteRouter = require('./routes/autocomplete');

app.use('/api/states', statesRouter);
app.use('/api/districts', districtsRouter);
app.use('/api/subdistricts', subDistrictsRouter);
app.use('/api/villages', villagesRouter);
app.use('/api/search', searchRouter);
app.use('/api/autocomplete', autocompleteRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});