import React, { useState } from 'react';
import { Clock, Users, MapPin, ChevronLeft, ChevronRight, Calendar, X, Check } from 'lucide-react';

interface ClassItem {
  id: number;
  name: string;
  instructor: string;
  time: string;
  duration: string;
  level: string;
  capacity: number;
  enrolled: number;
  location: string;
  date: string;
  recurringDays?: string[];
}

interface BookingForm {
  name: string;
  phone: string;
  email?: string;
}

const ClassesView: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    name: '',
    phone: '',
    email: ''
  });
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const mockClasses: ClassItem[] = [
    {
      id: 1,
      name: 'Хатха Йога',
      instructor: 'Анна Петрова',
      time: '09:00',
      duration: '90 мин',
      level: 'Начинающий',
      capacity: 15,
      enrolled: 8,
      location: 'Основной зал',
      date: '2024-01-20',
      recurringDays: ['monday', 'wednesday', 'friday']
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
      location: 'Зал для практик',
      date: '2024-01-20',
      recurringDays: ['tuesday', 'thursday']
    },
    {
      id: 3,
      name: 'Йога для расслабления',
      instructor: 'Елена Смирнова',
      time: '20:00',
      duration: '60 мин',
      level: 'Начинающий',
      capacity: 20,
      enrolled: 15,
      location: 'Зал медитации',
      date: '2024-01-20',
      recurringDays: ['monday', 'wednesday', 'friday']
    }
  ];

  // Генерация календаря на месяц
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= lastDay || currentDate.getDay() !== 0) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays(selectedMonth);

  const getMonthName = (date: Date) => {
    const months = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    return months[date.getMonth()];
  };

  const getDayName = (date: Date) => {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return days[date.getDay()];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const hasClassesOnDate = (date: Date) => {
    const dayName = getDayName(date).toLowerCase();
    return mockClasses.some(cls => 
      cls.recurringDays?.some(day => 
        day.toLowerCase().includes(dayName.toLowerCase())
      )
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handlePreviousMonth = () => {
    setSelectedMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setSelectedMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const handleBookClass = (classItem: ClassItem) => {
    setSelectedClass(classItem);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingForm.name || !bookingForm.phone) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    // Здесь будет логика отправки записи на сервер
    console.log('Запись на занятие:', {
      class: selectedClass,
      user: bookingForm
    });

    alert('Вы успешно записались на занятие!');
    
    // Сбрасываем форму и закрываем модальное окно
    setBookingForm({ name: '', phone: '', email: '' });
    setShowBookingModal(false);
    setSelectedClass(null);
  };

  const filteredClasses = selectedDate 
    ? mockClasses.filter(cls => 
        cls.recurringDays?.some(day => {
          const dayName = getDayName(selectedDate).toLowerCase();
          return day.toLowerCase().includes(dayName.toLowerCase());
        })
      )
    : mockClasses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Расписание занятий</h1>
          <p className="text-xl text-white/80">Выберите удобное время для практики</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Календарь */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Календарь</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={handlePreviousMonth}
                    className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              
              <div className="text-center mb-4">
                <h4 className="text-xl font-bold text-white">{getMonthName(selectedMonth)} {selectedMonth.getFullYear()}</h4>
              </div>

              {/* Дни недели */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map(day => (
                  <div key={day} className="text-center text-white/60 text-sm font-medium py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Календарная сетка */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, index) => {
                  const isCurrentMonth = date.getMonth() === selectedMonth.getMonth();
                  const isCurrentDate = isToday(date);
                  const isDateSelected = isSelected(date);
                  const hasClasses = hasClassesOnDate(date);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleDateClick(date)}
                      disabled={!isCurrentMonth}
                      className={`
                        p-2 text-sm font-medium rounded-lg transition-all
                        ${!isCurrentMonth 
                          ? 'text-white/30 cursor-not-allowed' 
                          : isDateSelected
                            ? 'bg-white/30 text-white border-2 border-white'
                            : isCurrentDate
                              ? 'bg-white/20 text-white hover:bg-white/30'
                              : hasClasses
                                ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                                : 'bg-white/10 text-white hover:bg-white/20'
                        }
                      `}
                    >
                      {date.getDate()}
                      {hasClasses && (
                        <div className="w-1 h-1 bg-green-400 rounded-full mx-auto mt-1"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Легенда */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500/20 rounded-full"></div>
                  <span className="text-white/70 text-sm">Есть занятия</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                  <span className="text-white/70 text-sm">Нет занятий</span>
                </div>
              </div>
            </div>
          </div>

          {/* Список занятий */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">
                  {selectedDate 
                    ? `Занятия на ${selectedDate.toLocaleDateString('ru-RU', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}`
                    : 'Все занятия'
                  }
                </h3>
                {selectedDate && (
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="text-white/70 hover:text-white text-sm"
                  >
                    Показать все
                  </button>
                )}
              </div>

              {filteredClasses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-white/70 text-lg">
                    {selectedDate ? 'На выбранную дату нет занятий' : 'Занятия не найдены'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredClasses.map((classItem) => (
                    <div key={classItem.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all border border-white/20">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-2xl font-bold text-white mb-2">{classItem.name}</h4>
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
                          <button 
                            onClick={() => handleBookClass(classItem)}
                            disabled={classItem.enrolled >= classItem.capacity}
                            className={`px-6 py-3 rounded-lg transition-all font-medium border ${
                              classItem.enrolled >= classItem.capacity
                                ? 'bg-red-500/20 text-red-300 border-red-500/30 cursor-not-allowed'
                                : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                            }`}
                          >
                            {classItem.enrolled >= classItem.capacity ? 'Мест нет' : 'Записаться'}
                          </button>
                          <button className="px-6 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-all font-medium">
                            Подробнее
                          </button>
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

      {/* Модальное окно записи */}
      {showBookingModal && selectedClass && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Запись на занятие</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-white/70 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6 p-4 bg-white/10 rounded-lg border border-white/20">
              <h4 className="text-lg font-bold text-white mb-2">{selectedClass.name}</h4>
              <p className="text-white/80 mb-1">Инструктор: {selectedClass.instructor}</p>
              <p className="text-white/80 mb-1">Время: {selectedClass.time} ({selectedClass.duration})</p>
              <p className="text-white/80">Место: {selectedClass.location}</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Имя *
                </label>
                <input
                  type="text"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
                  placeholder="Ваше имя"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Телефон *
                </label>
                <input
                  type="tel"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
                  placeholder="+7 (999) 123-45-67"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email (необязательно)
                </label>
                <input
                  type="email"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
                  placeholder="your@email.com"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all flex items-center justify-center space-x-2"
                >
                  <Check size={16} />
                  <span>Записаться</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassesView;
