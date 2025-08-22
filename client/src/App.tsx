import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import ClassesView from './components/Classes/ClassesView';
import VideosView from './components/Videos/VideosView';
import AuthView from './components/Auth/AuthView';
import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import BookingsManagement from './components/Admin/BookingsManagement';

const App: React.FC = () => {
  return (
    <Router>
      <AdminAuthProvider>
        <Routes>
          {/* Публичные маршруты */}
          <Route path="/" element={
            <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
              <Navigation />
              <main className="pt-16">
                <div className="min-h-screen flex items-center justify-center px-4">
                  <div className="text-center max-w-5xl">
                    <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
                      Внутри
                    </h1>
                    <p className="text-3xl text-white/90 mb-12 font-light">
                      пространство для практик
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 hover:bg-white/15 transition-all">
                        <h3 className="text-2xl font-semibold text-white mb-4">🧘‍♀️ Занятия</h3>
                        <p className="text-white/80 text-lg">Присоединяйтесь к нашим групповым занятиям в уютной атмосфере</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 hover:bg-white/15 transition-all">
                        <h3 className="text-2xl font-semibold text-white mb-4">📹 Видео уроки</h3>
                        <p className="text-white/80 text-lg">Премиум видео для домашней практики и развития</p>
                      </div>
                    </div>
                    <div className="mt-12 text-white/70">
                      <p className="text-lg">Владимир, улица Сакко и Ванцетти, 50к3, офис 306</p>
                      <p className="text-xl font-medium mt-2">+7 (999) 070-31-08</p>
                    </div>
                    
                    {/* Кнопка админ-панели */}
                    <div className="mt-8">
                      <Link
                        to="/admin"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-yellow-500/20 text-yellow-300 rounded-xl hover:bg-yellow-500/30 transition-all border border-yellow-500/30 hover:scale-105 transform"
                      >
                        <Lock size={20} />
                        <span className="font-medium">Войти в админ-панель</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          } />
          <Route path="/classes" element={
            <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
              <Navigation />
              <main className="pt-16">
                <ClassesView />
              </main>
            </div>
          } />
          <Route path="/videos" element={
            <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
              <Navigation />
              <main className="pt-16">
                <VideosView />
              </main>
            </div>
          } />
          <Route path="/login" element={
            <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
              <Navigation />
              <main className="pt-16">
                <AuthView />
              </main>
            </div>
          } />

          {/* Админ маршруты */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<BookingsManagement />} />
        </Routes>
      </AdminAuthProvider>
    </Router>
  );
};

export default App;
