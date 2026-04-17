const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  const start = Date.now();
  try {
    const { state_id } = req.query;
    let result;
    if (state_id) {
      result = await pool.query(
        'SELECT * FROM districts WHERE state_id = $1 ORDER BY name',
        [state_id]
      );
    } else {
      result = await pool.query('SELECT * FROM districts ORDER BY name');
    }
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

// Get districts by state ID in URL
router.get('/states/:id/districts', async (req, res) => {
  const start = Date.now();
  try {
    const result = await pool.query(
      'SELECT * FROM districts WHERE state_id = $1 ORDER BY name',
      [req.params.id]
    );
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