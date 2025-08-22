import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Plus,
  BarChart3,
  Smartphone
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AdminStats } from '../../types/admin';
import { apiService } from '../../services/api';

const AdminDashboard: React.FC = () => {
  const { admin, logout } = useAdminAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Пытаемся загрузить статистику через API
      const statsData = await apiService.getAdminStats();
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load stats:', error);
      // Используем мок-данные если API недоступен
      setStats({
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
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Очищаем все админ-данные
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    
    // Вызываем logout из контекста
    logout();
    
    // Перенаправляем на главную страницу
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Загрузка статистики...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <span className="text-white font-bold text-lg">А</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Админ панель</h1>
                <p className="text-sm text-white/70">Внутри - пространство для практик</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-white/70">Администратор</p>
                <p className="text-white font-medium">{admin?.name}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all border border-white/30"
              >
                <LogOut size={16} />
                <span>Выйти</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Всего записей</p>
                <p className="text-3xl font-bold text-white">{stats?.totalBookings || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Users className="text-blue-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Доход</p>
                <p className="text-3xl font-bold text-white">{stats?.totalRevenue || 0} ₽</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <DollarSign className="text-green-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Активные занятия</p>
                <p className="text-3xl font-bold text-white">{stats?.activeClasses || 0}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Calendar className="text-purple-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Ожидают подтверждения</p>
                <p className="text-3xl font-bold text-white">{stats?.pendingBookings || 0}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <TrendingUp className="text-yellow-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Основные разделы */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Управление записями */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Users className="text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Записи клиентов</h3>
                <p className="text-white/70 text-sm">Управление записями на занятия</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all border border-white/30">
                Просмотреть все записи
              </button>
              <button className="w-full py-3 px-4 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all border border-white/30">
                Подтвердить ожидающие
              </button>
            </div>
          </div>

          {/* Расписание занятий */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Calendar className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Расписание</h3>
                <p className="text-white/70 text-sm">Управление занятиями и расписанием</p>
              </div>
            </div>
            <div className="space-y-3">
              <button 
                onClick={() => window.location.href = '/admin/schedule'}
                className="w-full py-3 px-4 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all border border-white/30"
              >
                <Plus size={16} className="inline mr-2" />
                Добавить занятие
              </button>
              <button 
                onClick={() => window.location.href = '/admin/schedule'}
                className="w-full py-3 px-4 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all border border-white/30"
              >
                Редактировать расписание
              </button>
            </div>
          </div>

          {/* Цены и тарифы */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <DollarSign className="text-green-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Цены и тарифы</h3>
                <p className="text-white/70 text-sm">Управление стоимостью на 3 месяца</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all border border-white/30">
                <Plus size={16} className="inline mr-2" />
                Создать период
              </button>
              <button className="w-full py-3 px-4 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all border border-white/30">
                Управлять ценами
              </button>
            </div>
          </div>

          {/* Статистика и аналитика */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
                <BarChart3 className="text-indigo-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Аналитика</h3>
                <p className="text-white/70 text-sm">Подробная статистика и отчеты</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all border border-white/30">
                Финансовые отчеты
              </button>
              <button className="w-full py-3 px-4 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all border border-white/30">
                Популярность занятий
              </button>
            </div>
          </div>

          {/* Синхронизация */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                <Smartphone className="text-orange-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Синхронизация</h3>
                <p className="text-white/70 text-sm">iOS и Android приложения</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all border border-white/30">
                Настройки синхронизации
              </button>
              <button className="w-full py-3 px-4 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all border border-white/30">
                Принудительная синхронизация
              </button>
            </div>
          </div>

          {/* Настройки */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gray-500/20 rounded-full flex items-center justify-center">
                <Settings className="text-gray-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Настройки</h3>
                <p className="text-white/70 text-sm">Общие настройки системы</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all border border-white/30">
                Профиль администратора
              </button>
              <button className="w-full py-3 px-4 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all border border-white/30">
                Системные настройки
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
