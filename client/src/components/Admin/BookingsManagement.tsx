import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign,
  Calendar,
  User,
  Phone,
  Mail
} from 'lucide-react';
import { Booking } from '../../types/admin';
import { apiService } from '../../services/api';

const BookingsManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [paymentFilter, setPaymentFilter] = useState<string>('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchQuery, statusFilter, paymentFilter]);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      // Пытаемся загрузить записи через API
      const data = await apiService.getAllBookings();
      setBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
      // Используем мок-данные если API недоступен
      setBookings([
        {
          id: '1',
          userId: 'user1',
          userName: 'Анна Иванова',
          userPhone: '+7 (999) 123-45-67',
          userEmail: 'anna@example.com',
          classId: 'class1',
          className: 'Хатха Йога',
          classDate: '2024-01-20',
          classTime: '09:00',
          status: 'confirmed',
          paymentStatus: 'paid',
          paymentMethod: 'card',
          amount: 1500,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
          notes: 'Клиент просит подготовить коврик'
        },
        {
          id: '2',
          userId: 'user2',
          userName: 'Михаил Петров',
          userPhone: '+7 (999) 234-56-78',
          userEmail: 'mikhail@example.com',
          classId: 'class2',
          className: 'Виньяса Флоу',
          classDate: '2024-01-20',
          classTime: '18:30',
          status: 'pending',
          paymentStatus: 'pending',
          paymentMethod: 'cash',
          amount: 1800,
          createdAt: '2024-01-16T14:30:00Z',
          updatedAt: '2024-01-16T14:30:00Z'
        },
        {
          id: '3',
          userId: 'user3',
          userName: 'Елена Сидорова',
          userPhone: '+7 (999) 345-67-89',
          userEmail: 'elena@example.com',
          classId: 'class3',
          className: 'Йога для расслабления',
          classDate: '2024-01-21',
          classTime: '20:00',
          status: 'confirmed',
          paymentStatus: 'paid',
          paymentMethod: 'card',
          amount: 1200,
          createdAt: '2024-01-17T09:15:00Z',
          updatedAt: '2024-01-17T09:15:00Z'
        },
        {
          id: '4',
          userId: 'user4',
          userName: 'Дмитрий Козлов',
          userPhone: '+7 (999) 456-78-90',
          userEmail: 'dmitry@example.com',
          classId: 'class1',
          className: 'Хатха Йога',
          classDate: '2024-01-22',
          classTime: '09:00',
          status: 'pending',
          paymentStatus: 'pending',
          paymentMethod: 'cash',
          amount: 1500,
          createdAt: '2024-01-18T11:30:00Z',
          updatedAt: '2024-01-18T11:30:00Z'
        },
        {
          id: '5',
          userId: 'user5',
          userName: 'Ольга Морозова',
          userPhone: '+7 (999) 567-89-01',
          userEmail: 'olga@example.com',
          classId: 'class2',
          className: 'Виньяса Флоу',
          classDate: '2024-01-23',
          classTime: '18:30',
          status: 'cancelled',
          paymentStatus: 'refunded',
          paymentMethod: 'card',
          amount: 1800,
          createdAt: '2024-01-19T16:45:00Z',
          updatedAt: '2024-01-19T16:45:00Z',
          notes: 'Клиент отменил по болезни'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = bookings;

    if (searchQuery) {
      filtered = filtered.filter(booking =>
        booking.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.userPhone.includes(searchQuery) ||
        booking.className.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    if (paymentFilter) {
      filtered = filtered.filter(booking => booking.paymentStatus === paymentFilter);
    }

    setFilteredBookings(filtered);
  };

  const updateBookingStatus = async (id: string, status: Booking['status']) => {
    try {
      // Обновляем локальное состояние
      setBookings(prev => prev.map(booking => 
        booking.id === id ? { ...booking, status, updatedAt: new Date().toISOString() } : booking
      ));
      
      // Пытаемся обновить через API
      try {
        await apiService.updateBookingStatus(id, status);
      } catch (error) {
        console.error('Failed to update via API, using local state:', error);
      }
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  const updatePaymentStatus = async (id: string, paymentStatus: Booking['paymentStatus']) => {
    try {
      // Обновляем локальное состояние
      setBookings(prev => prev.map(booking => 
        booking.id === id ? { ...booking, paymentStatus, updatedAt: new Date().toISOString() } : booking
      ));
      
      // Пытаемся обновить через API
      try {
        await apiService.updatePaymentStatus(id, paymentStatus);
      } catch (error) {
        console.error('Failed to update via API, using local state:', error);
      }
    } catch (error) {
      console.error('Failed to update payment status:', error);
    }
  };

  const deleteBooking = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту запись?')) {
      try {
        setBookings(prev => prev.filter(booking => booking.id !== id));
        alert('Запись успешно удалена');
      } catch (error) {
        console.error('Failed to delete booking:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'refunded': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Подтверждено';
      case 'pending': return 'Ожидает';
      case 'cancelled': return 'Отменено';
      case 'completed': return 'Завершено';
      default: return status;
    }
  };

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Оплачено';
      case 'pending': return 'Ожидает оплаты';
      case 'refunded': return 'Возврат';
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Загрузка записей...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Управление записями</h1>
          <p className="text-xl text-white/80">Просмотр и управление записями клиентов на занятия</p>
        </div>

        {/* Фильтры и поиск */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Поиск */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
              <input
                type="text"
                placeholder="Поиск по имени, email, телефону..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
              />
            </div>

            {/* Фильтр по статусу */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
            >
              <option value="">Все статусы</option>
              <option value="confirmed">Подтверждено</option>
              <option value="pending">Ожидает</option>
              <option value="cancelled">Отменено</option>
              <option value="completed">Завершено</option>
            </select>

            {/* Фильтр по оплате */}
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
            >
              <option value="">Все платежи</option>
              <option value="paid">Оплачено</option>
              <option value="pending">Ожидает оплаты</option>
              <option value="refunded">Возврат</option>
            </select>

            {/* Кнопка обновления */}
            <button
              onClick={loadBookings}
              className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all font-medium border border-white/30"
            >
              Обновить
            </button>
          </div>
        </div>

        {/* Список записей */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 px-4 text-white font-medium">Клиент</th>
                  <th className="text-left py-4 px-4 text-white font-medium">Занятие</th>
                  <th className="text-left py-4 px-4 text-white font-medium">Дата и время</th>
                  <th className="text-left py-4 px-4 text-white font-medium">Статус</th>
                  <th className="text-left py-4 px-4 text-white font-medium">Оплата</th>
                  <th className="text-left py-4 px-4 text-white font-medium">Сумма</th>
                  <th className="text-left py-4 px-4 text-white font-medium">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-white">{booking.userName}</div>
                        <div className="text-sm text-white/70 flex items-center space-x-2">
                          <Phone size={14} />
                          <span>{booking.userPhone}</span>
                        </div>
                        <div className="text-sm text-white/70 flex items-center space-x-2">
                          <Mail size={14} />
                          <span>{booking.userEmail}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-white">{booking.className}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-white">
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} />
                          <span>{new Date(booking.classDate).toLocaleDateString('ru-RU')}</span>
                        </div>
                        <div className="text-sm text-white/70">{booking.classTime}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                        {getStatusLabel(booking.status)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPaymentStatusColor(booking.paymentStatus)}`}>
                        {getPaymentStatusLabel(booking.paymentStatus)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-white">{booking.amount} ₽</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all"
                          title="Просмотреть детали"
                        >
                          <Eye size={16} />
                        </button>
                        
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="p-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-all"
                            title="Подтвердить"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all"
                            title="Отменить"
                          >
                            <XCircle size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/70 text-lg">Записи не найдены</p>
            </div>
          )}
        </div>

        {/* Модальное окно с деталями */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-2xl w-full border border-white/20">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-white">Детали записи</h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-white/70 hover:text-white"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/70 text-sm">Имя клиента</label>
                    <p className="text-white font-medium">{selectedBooking.userName}</p>
                  </div>
                  <div>
                    <label className="text-white/70 text-sm">Телефон</label>
                    <p className="text-white font-medium">{selectedBooking.userPhone}</p>
                  </div>
                  <div>
                    <label className="text-white/70 text-sm">Email</label>
                    <p className="text-white font-medium">{selectedBooking.userEmail}</p>
                  </div>
                  <div>
                    <label className="text-white/70 text-sm">Занятие</label>
                    <p className="text-white font-medium">{selectedBooking.className}</p>
                  </div>
                  <div>
                    <label className="text-white/70 text-sm">Дата</label>
                    <p className="text-white font-medium">
                      {new Date(selectedBooking.classDate).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  <div>
                    <label className="text-white/70 text-sm">Время</label>
                    <p className="text-white font-medium">{selectedBooking.classTime}</p>
                  </div>
                  <div>
                    <label className="text-white/70 text-sm">Статус</label>
                    <select
                      value={selectedBooking.status}
                      onChange={(e) => updateBookingStatus(selectedBooking.id, e.target.value as Booking['status'])}
                      className="mt-1 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white"
                    >
                      <option value="pending">Ожидает</option>
                      <option value="confirmed">Подтверждено</option>
                      <option value="cancelled">Отменено</option>
                      <option value="completed">Завершено</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/70 text-sm">Статус оплаты</label>
                    <select
                      value={selectedBooking.paymentStatus}
                      onChange={(e) => updatePaymentStatus(selectedBooking.id, e.target.value as Booking['paymentStatus'])}
                      className="mt-1 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white"
                    >
                      <option value="pending">Ожидает оплаты</option>
                      <option value="paid">Оплачено</option>
                      <option value="refunded">Возврат</option>
                    </select>
                  </div>
                </div>

                {selectedBooking.notes && (
                  <div>
                    <label className="text-white/70 text-sm">Заметки</label>
                    <p className="text-white">{selectedBooking.notes}</p>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsManagement;
