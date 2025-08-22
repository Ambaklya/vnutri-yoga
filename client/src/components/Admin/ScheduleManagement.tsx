import React, { useState } from 'react';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';

const ScheduleManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [schedules, setSchedules] = useState([
    {
      id: '1',
      name: 'Хатха Йога',
      instructor: 'Анна Петрова',
      time: '09:00',
      duration: 90,
      price: 1500,
      capacity: 15,
      currentBookings: 8,
      maxBookings: 15,
      level: 'Начинающий',
      location: 'Основной зал',
      isActive: true,
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      recurringDays: ['monday', 'wednesday', 'friday']
    },
    {
      id: '2',
      name: 'Виньяса Флоу',
      instructor: 'Михаил Сидоров',
      time: '18:30',
      duration: 75,
      price: 1800,
      capacity: 12,
      currentBookings: 10,
      maxBookings: 12,
      level: 'Средний',
      location: 'Зал для практик',
      isActive: true,
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      recurringDays: ['tuesday', 'thursday']
    },
    {
      id: '3',
      name: 'Йога для расслабления',
      instructor: 'Елена Смирнова',
      time: '20:00',
      duration: 60,
      price: 1200,
      capacity: 20,
      currentBookings: 15,
      maxBookings: 20,
      level: 'Начинающий',
      location: 'Зал медитации',
      isActive: true,
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      recurringDays: ['monday', 'wednesday', 'friday']
    }
  ]);
  const [formData, setFormData] = useState({
    name: '',
    instructor: '',
    time: '',
    duration: 90,
    price: 1500,
    capacity: 15,
    location: 'Основной зал',
    level: 'Начинающий',
    startDate: '',
    endDate: '',
    recurringDays: [] as string[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'price' || name === 'capacity' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.instructor || !formData.time) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const newSchedule = {
      id: Date.now().toString(),
      ...formData,
      currentBookings: 0,
      maxBookings: formData.capacity,
      level: 'Начинающий',
      location: 'Зал 1',
      isActive: true
    };

    setSchedules(prev => [...prev, newSchedule]);
    
    // Сбрасываем форму
    setFormData({
      name: '',
      instructor: '',
      time: '',
      duration: 90,
      price: 1500,
      capacity: 15,
      location: 'Основной зал',
      level: 'Начинающий',
      startDate: '',
      endDate: '',
      recurringDays: []
    });
    
    // Скрываем форму
    setShowForm(false);
    
    alert('Занятие успешно создано!');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      instructor: '',
      time: '',
      duration: 90,
      price: 1500,
      capacity: 15,
      location: 'Основной зал',
      level: 'Начинающий',
      startDate: '',
      endDate: '',
      recurringDays: []
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/admin/dashboard'}
              className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Управление расписанием</h1>
              <p className="text-xl text-white/80">Создание и редактирование занятий</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all border border-white/30"
          >
            <Plus size={20} />
            <span>Добавить занятие</span>
          </button>
        </div>

        {/* Форма добавления */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Новое занятие</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Название занятия *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
                  placeholder="Хатха Йога"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Инструктор *
                </label>
                <input
                  type="text"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
                  placeholder="Анна Петрова"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Время начала *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Длительность (минуты)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
                  placeholder="90"
                  min="30"
                  max="180"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Цена (₽)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
                  placeholder="1500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Вместимость
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
                  placeholder="15"
                  min="1"
                  max="50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Место проведения
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
                >
                  <option value="Основной зал">Основной зал</option>
                  <option value="Зал для практик">Зал для практик</option>
                  <option value="Зал медитации">Зал медитации</option>
                  <option value="Открытая площадка">Открытая площадка</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Уровень
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
                >
                  <option value="Начинающий">Начинающий</option>
                  <option value="Средний">Средний</option>
                  <option value="Продвинутый">Продвинутый</option>
                </select>
              </div>
            </div>

            {/* Даты и повторения */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Дата начала *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Дата окончания *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
                  required
                />
              </div>
            </div>

            {/* Повторяющиеся дни */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Повторяющиеся дни
              </label>
              <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
                {[
                  { key: 'monday', label: 'Пн' },
                  { key: 'tuesday', label: 'Вт' },
                  { key: 'wednesday', label: 'Ср' },
                  { key: 'thursday', label: 'Чт' },
                  { key: 'friday', label: 'Пт' },
                  { key: 'saturday', label: 'Сб' },
                  { key: 'sunday', label: 'Вс' }
                ].map(day => (
                  <button
                    key={day.key}
                    type="button"
                    onClick={() => {
                      const newRecurringDays = formData.recurringDays.includes(day.key)
                        ? formData.recurringDays.filter(d => d !== day.key)
                        : [...formData.recurringDays, day.key];
                      setFormData(prev => ({ ...prev, recurringDays: newRecurringDays }));
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      formData.recurringDays.includes(day.key)
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all"
              >
                Создать
              </button>
            </div>
          </form>
        )}

        {/* Список занятий */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6">Текущие занятия ({schedules.length})</h3>
          
          {schedules.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/70 text-lg">Занятия не найдены</p>
              <p className="text-white/50 text-sm mt-2">Создайте первое занятие, нажав кнопку "Добавить занятие"</p>
            </div>
          ) : (
            schedules.map((schedule) => (
              <div key={schedule.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{schedule.name}</h4>
                    <p className="text-white/80 mb-2">Инструктор: {schedule.instructor}</p>
                    <div className="flex items-center space-x-6 text-white/60">
                      <span>🕘 {schedule.time} ({schedule.duration} мин)</span>
                      <span>📍 {schedule.location}</span>
                      <span>👥 {schedule.currentBookings}/{schedule.maxBookings}</span>
                      <span>💰 {schedule.price} ₽</span>
                    </div>
                    <div className="mt-2">
                      <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium border border-white/30">
                        {schedule.level}
                      </span>
                      <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium border ${
                        schedule.isActive
                          ? 'bg-green-500/20 text-green-300 border-green-500/30'
                          : 'bg-red-500/20 text-red-300 border-red-500/30'
                      }`}>
                        {schedule.isActive ? 'Активно' : 'Неактивно'}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all">
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('Вы уверены, что хотите удалить это занятие?')) {
                          setSchedules(prev => prev.filter(s => s.id !== schedule.id));
                        }
                      }}
                      className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleManagement;
