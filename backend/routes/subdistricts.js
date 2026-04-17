const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  const start = Date.now();
  try {
    const { district_id } = req.query;
    let result;
    if (district_id) {
      result = await pool.query(
        'SELECT * FROM subdistricts WHERE district_id = $1 ORDER BY name',
        [district_id]
      );
    } else {
      result = await pool.query('SELECT * FROM subdistricts ORDER BY name');
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