import React, { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAdminAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Неверный email или пароль');
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 mx-auto mb-4">
            <Lock size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Админ панель</h1>
          <p className="text-white/80">Войдите в личный кабинет администратора</p>
        </div>

        {/* Форма входа */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email адрес
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
                placeholder="admin@vnutri.ru"
                required
              />
            </div>

            {/* Пароль */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Пароль
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Ошибка */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <AlertCircle size={20} className="text-red-400" />
                <span className="text-red-300 text-sm">{error}</span>
              </div>
            )}

            {/* Кнопка входа */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all font-medium border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </button>
          </form>

          {/* Информация */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-white/60 text-sm text-center mb-3">
              Доступ только для администраторов студии
            </p>
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
              <p className="text-yellow-300 text-xs font-medium mb-1">Тестовые данные для демонстрации:</p>
              <p className="text-yellow-200 text-xs">Email: admin@vnutri.ru</p>
              <p className="text-yellow-200 text-xs">Пароль: admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
