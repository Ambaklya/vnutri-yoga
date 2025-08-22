const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email и пароль обязательны' });
    }
    
    const userId = `user_${Date.now()}`;
    const token = `token_${Date.now()}`;
    
    res.status(201).json({
      accessToken: token,
      user: {
        id: userId,
        email: email,
        premiumAccess: false
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при регистрации' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email и пароль обязательны' });
    }
    
    const userId = `user_${Date.now()}`;
    const token = `token_${Date.now()}`;
    
    res.json({
      accessToken: token,
      user: {
        id: userId,
        email: email,
        premiumAccess: false
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при входе' });
  }
});

module.exports = router;
