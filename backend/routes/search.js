const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  const start = Date.now();
  const { q, state, district, limit = 25 } = req.query;

  if (!q || q.length < 2) {
    return res.status(400).json({
      success: false,
      error: { code: 'INVALID_QUERY', message: 'Search query must be at least 2 characters' }
    });
  }

  try {
    const result = await pool.query(
      `SELECT v.id, v.name AS village,
        sd.name AS subdistrict,
        d.name AS district,
        s.name AS state
       FROM villages v
       JOIN subdistricts sd ON v.subdistrict_id = sd.id
       JOIN districts d ON sd.district_id = d.id
       JOIN states s ON d.state_id = s.id
       WHERE v.name ILIKE $1
       LIMIT $2`,
      [`%${q}%`, limit]
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