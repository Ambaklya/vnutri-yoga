const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { classId } = req.body;
  
  const booking = {
    id: `booking_${Date.now()}`,
    classId: classId,
    userId: 'user_1',
    status: 'confirmed'
  };
  
  res.status(201).json(booking);
});

module.exports = router;
