import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, Video, User, Lock } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Главная', icon: null },
    { path: '/classes', label: 'Занятия', icon: Calendar },
    { path: '/videos', label: 'Видео', icon: Video },
    { path: '/login', label: 'Войти', icon: User }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-primary-900/95 backdrop-blur-md border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <span className="text-white font-bold text-lg">В</span>
            </div>
            <div className="text-left">
              <span className="text-xl font-bold text-white block leading-tight">Внутри</span>
              <span className="text-sm text-white/70 block leading-tight">пространство для практик</span>
            </div>
          </Link>

          {/* Десктопная навигация */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/20 text-white border border-white/30'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {Icon && <Icon size={18} />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {/* Кнопка админ-панели */}
            <Link
              to="/admin"
              className="flex items-center space-x-2 px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-lg hover:bg-yellow-500/30 transition-all border border-yellow-500/30"
            >
              <Lock size={18} />
              <span>Админ</span>
            </Link>
          </div>

          {/* Мобильное меню */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Мобильная навигация */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {Icon && <Icon size={20} />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Кнопка админ-панели в мобильном меню */}
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 bg-yellow-500/20 text-yellow-300 rounded-lg hover:bg-yellow-500/30 transition-all border border-yellow-500/30"
              >
                <Lock size={20} />
                <span>Админ панель</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
