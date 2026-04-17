const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  const start = Date.now();
  try {
    const { subdistrict_id, page = 1, limit = 500 } = req.query;
    const offset = (page - 1) * limit;
    let result;
    if (subdistrict_id) {
      result = await pool.query(
        'SELECT * FROM villages WHERE subdistrict_id = $1 ORDER BY name LIMIT $2 OFFSET $3',
        [subdistrict_id, limit, offset]
      );
    } else {
      result = await pool.query(
        'SELECT * FROM villages ORDER BY name LIMIT $1 OFFSET $2',
        [limit, offset]
      );
    }
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
      meta: {
        responseTime: Date.now() - start,
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: err.message }
    });
  }
});

module.exports = router;