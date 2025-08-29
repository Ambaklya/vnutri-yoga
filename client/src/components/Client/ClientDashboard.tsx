import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Clock, 
  Target, 
  Award,
  Star
} from 'lucide-react';

interface ClientClass {
  id: string;
  name: string;
  instructor: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  progress: number;
}

interface ClientProgress {
  totalClasses: number;
  completedClasses: number;
  streak: number;
  level: string;
  nextMilestone: string;
  achievements: string[];
}

const ClientDashboard: React.FC = () => {
  const [clientInfo] = useState({
    name: 'Анна Иванова',
    email: 'anna@example.com',
    phone: '+7 (999) 123-45-67',
    joinDate: '2024-01-01'
  });

  const [upcomingClasses] = useState<ClientClass[]>([
    {
      id: '1',
      name: 'Хатха Йога',
      instructor: 'Анна Петрова',
      date: '2024-01-25',
      time: '09:00',
      status: 'upcoming',
      progress: 0
    },
    {
      id: '2',
      name: 'Виньяса Флоу',
      instructor: 'Михаил Сидоров',
      date: '2024-01-27',
      time: '18:30',
      status: 'upcoming',
      progress: 0
    }
  ]);

  const [recentClasses] = useState<ClientClass[]>([
    {
      id: '3',
      name: 'Хатха Йога',
      instructor: 'Анна Петрова',
      date: '2024-01-22',
      time: '09:00',
      status: 'completed',
      progress: 100
    },
    {
      id: '4',
      name: 'Йога для расслабления',
      instructor: 'Елена Смирнова',
      date: '2024-01-20',
      time: '20:00',
      status: 'completed',
      progress: 100
    }
  ]);

  const [progress] = useState<ClientProgress>({
    totalClasses: 25,
    completedClasses: 23,
    streak: 7,
    level: 'Средний',
    nextMilestone: '30 занятий',
    achievements: [
      'Первое занятие',
      'Неделя практики',
      'Месяц практики',
      '5 занятий подряд',
      '10 занятий подряд'
    ]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Предстоит';
      case 'completed': return 'Завершено';
      case 'cancelled': return 'Отменено';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Личный кабинет</h1>
          <p className="text-xl text-white/80">Отслеживайте свой прогресс в практике йоги</p>
        </div>

        {/* Информация о клиенте */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 border border-white/20">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{clientInfo.name}</h2>
              <div className="space-y-1 text-white/80">
                <p>Email: {clientInfo.email}</p>
                <p>Телефон: {clientInfo.phone}</p>
                <p>Дата регистрации: {new Date(clientInfo.joinDate).toLocaleDateString('ru-RU')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Статистика прогресса */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Ваш прогресс</h3>
              
              <div className="space-y-6">
                {/* Общая статистика */}
                <div className="text-center p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="text-4xl font-bold text-white mb-2">{progress.completedClasses}</div>
                  <div className="text-white/80">Завершенных занятий</div>
                </div>

                <div className="text-center p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="text-4xl font-bold text-white mb-2">{progress.streak}</div>
                  <div className="text-white/80">Дней подряд</div>
                </div>

                <div className="text-center p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="text-2xl font-bold text-white mb-2">{progress.level}</div>
                  <div className="text-white/80">Уровень</div>
                </div>

                {/* Следующий этап */}
                <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target size={20} className="text-blue-300" />
                    <span className="text-blue-300 font-medium">Следующий этап</span>
                  </div>
                  <div className="text-white font-medium">{progress.nextMilestone}</div>
                </div>
              </div>
            </div>

            {/* Достижения */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20 mt-6">
              <h3 className="text-2xl font-bold text-white mb-6">Достижения</h3>
              <div className="space-y-3">
                {progress.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg border border-white/20">
                    <Award size={20} className="text-yellow-400" />
                    <span className="text-white">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Предстоящие занятия */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20 mb-6">
              <h3 className="text-2xl font-bold text-white mb-6">Предстоящие занятия</h3>
              
              {upcomingClasses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-white/70 text-lg">У вас нет предстоящих занятий</p>
                  <p className="text-white/50 text-sm mt-2">Запишитесь на занятия в разделе "Расписание"</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingClasses.map((classItem) => (
                    <div key={classItem.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xl font-bold text-white mb-2">{classItem.name}</h4>
                          <p className="text-white/80 mb-2">Инструктор: {classItem.instructor}</p>
                          <div className="flex items-center space-x-6 text-white/60">
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} />
                              <span>{new Date(classItem.date).toLocaleDateString('ru-RU')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock size={16} />
                              <span>{classItem.time}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(classItem.status)}`}>
                          {getStatusLabel(classItem.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Недавние занятия */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Недавние занятия</h3>
              
              {recentClasses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-white/70 text-lg">У вас пока нет завершенных занятий</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentClasses.map((classItem) => (
                    <div key={classItem.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xl font-bold text-white mb-2">{classItem.name}</h4>
                          <p className="text-white/80 mb-2">Инструктор: {classItem.instructor}</p>
                          <div className="flex items-center space-x-6 text-white/60">
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} />
                              <span>{new Date(classItem.date).toLocaleDateString('ru-RU')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock size={16} />
                              <span>{classItem.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(classItem.status)} mb-2 block`}>
                            {getStatusLabel(classItem.status)}
                          </span>
                          <div className="flex items-center space-x-2 text-white/60">
                            <Star size={16} className="text-yellow-400" />
                            <span>Отлично!</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
