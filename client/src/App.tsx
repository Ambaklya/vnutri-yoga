import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import ClassesView from './components/Classes/ClassesView';
import VideosView from './components/Videos/VideosView';
import AuthView from './components/Auth/AuthView';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
        <Navigation />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={
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
                </div>
              </div>
            } />
            <Route path="/classes" element={<ClassesView />} />
            <Route path="/videos" element={<VideosView />} />
            <Route path="/login" element={<AuthView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
