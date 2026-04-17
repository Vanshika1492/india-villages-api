const pool = require('../config/db');


const authenticate = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM api_keys WHERE api_key = $1 AND is_active = true',
      [apiKey]
    );
    if (result.rows.length === 0) {
      return res.status(403).json({ error: 'Invalid or inactive API key' });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = authenticate;