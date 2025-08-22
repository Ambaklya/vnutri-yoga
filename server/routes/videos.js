const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const mockVideos = [
    {
      id: 'video_1',
      title: 'Основы Хатха Йоги для начинающих',
      url: 'https://example.com/videos/hatha-basics.mp4',
      durationSec: 1800,
      level: 'beginner'
    }
  ];
  
  res.json(mockVideos);
});

module.exports = router;
