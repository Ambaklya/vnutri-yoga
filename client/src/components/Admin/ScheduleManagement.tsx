import React, { useState } from 'react';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';

const ScheduleManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

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
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Новое занятие</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Название занятия
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
                  placeholder="Хатха Йога"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Инструктор
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
                  placeholder="Анна Петрова"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Время начала
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Длительность (минуты)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
                  placeholder="90"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Цена (₽)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
                  placeholder="1500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Вместимость
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
                  placeholder="15"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all"
              >
                Отмена
              </button>
              <button className="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all">
                Создать
              </button>
            </div>
          </div>
        )}

        {/* Список занятий */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6">Текущие занятия</h3>
          
          {/* Пример занятия */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Хатха Йога</h4>
                <p className="text-white/80 mb-2">Инструктор: Анна Петрова</p>
                <div className="flex items-center space-x-6 text-white/60">
                  <span>🕘 09:00 (90 мин)</span>
                  <span>📍 Зал 1</span>
                  <span>👥 8/15</span>
                  <span>💰 1500 ₽</span>
                </div>
                <div className="mt-2">
                  <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium border border-white/30">
                    Начинающий
                  </span>
                  <span className="ml-2 px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium border border-green-500/30">
                    Активно
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all">
                  <Edit size={16} />
                </button>
                <button className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Виньяса Флоу</h4>
                <p className="text-white/80 mb-2">Инструктор: Михаил Сидоров</p>
                <div className="flex items-center space-x-6 text-white/60">
                  <span>🕘 18:30 (75 мин)</span>
                  <span>📍 Зал 2</span>
                  <span>👥 10/12</span>
                  <span>💰 1800 ₽</span>
                </div>
                <div className="mt-2">
                  <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium border border-white/30">
                    Средний
                  </span>
                  <span className="ml-2 px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium border border-green-500/30">
                    Активно
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all">
                  <Edit size={16} />
                </button>
                <button className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all">
                  <Trash2 size={16} />
                </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleManagement;
