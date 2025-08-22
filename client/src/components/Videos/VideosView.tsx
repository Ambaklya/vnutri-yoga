import React, { useState } from 'react';
import { Search, Play, Clock, Star, Lock } from 'lucide-react';

const VideosView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const mockVideos = [
    {
      id: 1,
      title: 'Основы Хатха Йоги',
      instructor: 'Анна Петрова',
      duration: '45 мин',
      level: 'Начинающий',
      rating: 4.8,
      thumbnail: '🧘‍♀️',
      isPremium: false,
      description: 'Изучите базовые асаны и принципы дыхания'
    },
    {
      id: 2,
      title: 'Виньяса Флоу для продвинутых',
      instructor: 'Михаил Сидоров',
      duration: '60 мин',
      level: 'Продвинутый',
      rating: 4.9,
      thumbnail: '🧘‍♂️',
      isPremium: true,
      description: 'Динамичная практика для опытных практиков'
    },
    {
      id: 3,
      title: 'Йога для расслабления',
      instructor: 'Елена Козлова',
      duration: '30 мин',
      level: 'Начинающий',
      rating: 4.7,
      thumbnail: '��',
      isPremium: false,
      description: 'Мягкая практика для снятия стресса'
    }
  ];

  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = !selectedLevel || video.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Видео уроки</h1>
          <p className="text-xl text-white/80">Изучайте йогу в удобное время</p>
        </div>

        {/* Поиск и фильтры */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
              <input
                type="text"
                placeholder="Поиск по названию или инструктору..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
              />
            </div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
            >
              <option value="">Все уровни</option>
              <option value="Начинающий">Начинающий</option>
              <option value="Средний">Средний</option>
              <option value="Продвинутый">Продвинутый</option>
            </select>
          </div>
        </div>

        {/* Список видео */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video) => (
            <div key={video.id} className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden hover:bg-white/15 transition-all border border-white/20">
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">{video.thumbnail}</div>
                  {video.isPremium && (
                    <div className="inline-flex items-center space-x-1 px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-medium border border-yellow-500/30">
                      <Lock size={12} />
                      <span>Премиум</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                <p className="text-white/80 mb-4">{video.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>Инструктор: {video.instructor}</span>
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span>{video.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>Уровень: {video.level}</span>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full px-4 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all font-medium flex items-center justify-center space-x-2 border border-white/30">
                  <Play size={18} />
                  <span>Смотреть</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideosView;
