const express = require('express');
const router = express.Router();

// Middleware для проверки админ-токена
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  if (token === 'admin-token') {
    next();
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Аутентификация администратора
router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@vnutri.ru' && password === 'admin123') {
    res.json({
      token: 'admin-token',
      admin: {
        id: '1',
        email: 'admin@vnutri.ru',
        name: 'Администратор',
        role: 'admin',
        permissions: ['read', 'write', 'delete'],
        lastLogin: new Date().toISOString()
      }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Получение профиля администратора
router.get('/profile', authenticateAdmin, (req, res) => {
  res.json({
    id: '1',
    email: 'admin@vnutri.ru',
    name: 'Администратор',
    role: 'admin',
    permissions: ['read', 'write', 'delete'],
    lastLogin: new Date().toISOString()
  });
});

// Получение всех записей
router.get('/bookings', authenticateAdmin, (req, res) => {
  const mockBookings = [
    {
      id: '1',
      userId: 'user1',
      userName: 'Анна Иванова',
      userPhone: '+7 (999) 123-45-67',
      userEmail: 'anna@example.com',
      classId: 'class1',
      className: 'Хатха Йога',
      classDate: '2024-01-20',
      classTime: '09:00',
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: 'card',
      amount: 1500,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      notes: 'Клиент просит подготовить коврик'
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Михаил Петров',
      userPhone: '+7 (999) 234-56-78',
      userEmail: 'mikhail@example.com',
      classId: 'class2',
      className: 'Виньяса Флоу',
      classDate: '2024-01-20',
      classTime: '18:30',
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'cash',
      amount: 1800,
      createdAt: '2024-01-16T14:30:00Z',
      updatedAt: '2024-01-16T14:30:00Z'
    }
  ];
  
  res.json(mockBookings);
});

// Обновление статуса записи
router.patch('/bookings/:id/status', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  res.json({
    id,
    status,
    updatedAt: new Date().toISOString()
  });
});

// Обновление статуса оплаты
router.patch('/bookings/:id/payment', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const { paymentStatus } = req.body;
  
  res.json({
    id,
    paymentStatus,
    updatedAt: new Date().toISOString()
  });
});

// Получение статистики
router.get('/stats', authenticateAdmin, (req, res) => {
  const mockStats = {
    totalBookings: 25,
    totalRevenue: 37500,
    activeClasses: 8,
    pendingBookings: 3,
    monthlyRevenue: [
      { month: 'Январь', revenue: 12500 },
      { month: 'Февраль', revenue: 15000 },
      { month: 'Март', revenue: 10000 }
    ],
    popularClasses: [
      { name: 'Хатха Йога', bookings: 12 },
      { name: 'Виньяса Флоу', bookings: 8 },
      { name: 'Йога для расслабления', bookings: 5 }
    ]
  };
  
  res.json(mockStats);
});

module.exports = router;
