const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  const start = Date.now();
  try {
    const result = await pool.query('SELECT * FROM states ORDER BY name');
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
      meta: { responseTime: Date.now() - start }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: err.message }
    });
  }
});

module.exports = router;