const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  res.json({
    id: 'user_1',
    email: 'user@example.com',
    premiumAccess: false
  });
});

module.exports = router;
