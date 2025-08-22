import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';

const ClassesView: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const mockClasses = [
    {
      id: 1,
      name: 'Хатха Йога',
      instructor: 'Анна Петрова',
      time: '09:00',
      duration: '90 мин',
      level: 'Начинающий',
      capacity: 15,
      enrolled: 8,
      location: 'Зал 1',
      date: '2024-01-20'
    },
    {
      id: 2,
      name: 'Виньяса Флоу',
      instructor: 'Михаил Сидоров',
      time: '18:30',
      duration: '75 мин',
      level: 'Средний',
      capacity: 12,
      enrolled: 10,
      location: 'Зал 2',
      date: '2024-01-20'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Расписание занятий</h1>
          <p className="text-xl text-white/80">Выберите удобное время для практики</p>
        </div>

        {/* Фильтры */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 border border-white/20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <label className="text-white font-medium">Месяц:</label>
              <input
                type="month"
                value={selectedMonth.toISOString().slice(0, 7)}
                onChange={(e) => setSelectedMonth(new Date(e.target.value))}
                className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
              />
            </div>
            <div className="flex items-center space-x-4">
              <select className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white">
                <option value="">Все уровни</option>
                <option value="beginner">Начинающий</option>
                <option value="intermediate">Средний</option>
                <option value="advanced">Продвинутый</option>
              </select>
            </div>
          </div>
        </div>

        {/* Список занятий */}
        <div className="grid gap-6">
          {mockClasses.map((classItem) => (
            <div key={classItem.id} className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 hover:bg-white/15 transition-all border border-white/20">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{classItem.name}</h3>
                      <p className="text-lg text-white/80 mb-1">Инструктор: {classItem.instructor}</p>
                      <div className="flex items-center space-x-6 text-white/60">
                        <div className="flex items-center space-x-2">
                          <Clock size={18} />
                          <span>{classItem.time} ({classItem.duration})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin size={18} />
                          <span>{classItem.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users size={18} />
                          <span>{classItem.enrolled}/{classItem.capacity}</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium border border-white/30">
                      {classItem.level}
                    </span>
                  </div>
                </div>
                <div className="lg:ml-6 flex flex-col sm:flex-row gap-3">
                  <button className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all font-medium border border-white/30">
                    Записаться
                  </button>
                  <button className="px-6 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all font-medium">
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassesView;
