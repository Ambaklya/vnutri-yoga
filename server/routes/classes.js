const express = require('express');
const router = express.Router();

router.get('/monthly', (req, res) => {
  const { year, month } = req.query;
  
  const mockClasses = [
    {
      id: 'class_1',
      title: 'Хатха Йога для начинающих',
      instructor: 'Анна Петрова',
      startEpochMs: new Date(2024, month - 1, 15, 9, 0).getTime(),
      durationMin: 60,
      capacity: 20,
      booked: 15,
      location: 'Зал 1',
      level: 'beginner'
    }
  ];
  
  res.json(mockClasses);
});

module.exports = router;
