import React, { useState } from 'react';
import { Mail, Phone, Lock, User, Eye, EyeOff } from 'lucide-react';

const AuthView: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPhoneAuth, setIsPhoneAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    name: '',
    otp: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPhoneAuth) {
      // Email авторизация
      if (isLogin) {
        // Вход
        if (!formData.email || !formData.password) {
          alert('Пожалуйста, заполните все поля');
          return;
        }
        console.log('Вход:', { email: formData.email, password: formData.password });
        alert('Вход выполнен успешно!');
      } else {
        // Регистрация
        if (!formData.email || !formData.password || !formData.name) {
          alert('Пожалуйста, заполните все поля');
          return;
        }
        console.log('Регистрация:', formData);
        alert('Регистрация выполнена успешно!');
        setIsLogin(true); // Переключаемся на вход
      }
    } else {
      // Телефонная авторизация
      if (isLogin) {
        // Вход по телефону
        if (!formData.phone || !formData.otp) {
          alert('Пожалуйста, заполните все поля');
          return;
        }
        console.log('Вход по телефону:', { phone: formData.phone, otp: formData.otp });
        alert('Вход выполнен успешно!');
      } else {
        // Регистрация по телефону
        if (!formData.phone || !formData.name) {
          alert('Пожалуйста, заполните все поля');
          return;
        }
        console.log('Регистрация по телефону:', { phone: formData.phone, name: formData.name });
        alert('Код подтверждения отправлен на ваш телефон!');
        // Здесь можно добавить логику отправки OTP
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Вход в аккаунт' : 'Регистрация'}
          </h1>
          <p className="text-white/80">
            {isLogin ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}
          </p>
        </div>

        {/* Переключатель типа авторизации */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-6 border border-white/20">
          <div className="flex rounded-lg bg-white/10 p-1 mb-6">
            <button
              onClick={() => setIsPhoneAuth(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isPhoneAuth
                  ? 'bg-white/20 text-white shadow-sm border border-white/30'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Mail size={16} className="inline mr-2" />
              Email
            </button>
            <button
              onClick={() => setIsPhoneAuth(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isPhoneAuth
                  ? 'bg-white/20 text-white shadow-sm border border-white/30'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Phone size={16} className="inline mr-2" />
              Телефон
            </button>
          </div>

          {/* Форма */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isPhoneAuth ? (
              <>
                {!isLogin && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
                      required={!isLogin}
                    />
                  </div>
                )}
                
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                  <input
                    type="email"
                    placeholder="Email адрес"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
                    required
                  />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </>
            ) : (
              <>
                {!isLogin && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
                      required={!isLogin}
                    />
                  </div>
                )}
                
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                  <input
                    type="tel"
                    placeholder="Номер телефона"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
                    required
                  />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                  <input
                    type="text"
                    placeholder="Код подтверждения"
                    value={formData.otp}
                    onChange={(e) => handleInputChange('otp', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
                    required
                  />
                </div>
              </>
            )}
            
            <button
              type="submit"
              className="w-full py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all font-medium border border-white/30"
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </form>
        </div>

        {/* Переключатель режима */}
        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white/80 hover:text-white font-medium"
          >
            {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
