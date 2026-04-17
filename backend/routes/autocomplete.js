const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  const start = Date.now();
  const { q, type = 'village', limit = 10 } = req.query;

  if (!q || q.length < 2) {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_QUERY', message: 'Query must be at least 2 characters' }
    });
  }

  try {
    let result;

    if (type === 'village') {
      result = await pool.query(
        `SELECT village_name AS name, 'village' AS type
         FROM villages WHERE village_name ILIKE $1 LIMIT $2`,
        [`${q}%`, limit]
      );
    } else if (type === 'district') {
      result = await pool.query(
        `SELECT district_name AS name, 'district' AS type
         FROM districts WHERE district_name ILIKE $1 LIMIT $2`,
        [`${q}%`, limit]
      );
    } else if (type === 'state') {
      result = await pool.query(
        `SELECT state_name AS name, 'state' AS type
         FROM states WHERE state_name ILIKE $1 LIMIT $2`,
        [`${q}%`, limit]
      );
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

module.exports = router;