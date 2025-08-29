import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Download, Eye, Phone, Mail, Calendar, User, Users, X } from 'lucide-react';
import { apiService } from '../../services/api';

interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  registrationDate: string;
  totalBookings: number;
  lastActivity: string;
  status: 'active' | 'inactive';
  source: 'website' | 'phone' | 'walk-in';
}

const ClientsManagement: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'website' | 'phone' | 'walk-in'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientDetails, setShowClientDetails] = useState(false);

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    filterClients();
  }, [clients, searchTerm, statusFilter, sourceFilter]);

  const loadClients = async () => {
    try {
      setIsLoading(true);
      
      // Загружаем клиентов из localStorage
      const savedClients = localStorage.getItem('yogaClients');
      if (savedClients) {
        setClients(JSON.parse(savedClients));
      } else {
        // Мок-данные по умолчанию, если нет сохраненных клиентов
        const mockClients: Client[] = [
          {
            id: '1',
            name: 'Анна Иванова',
            phone: '+7 (999) 123-45-67',
            email: 'anna.ivanova@email.com',
            registrationDate: '2024-01-15',
            totalBookings: 8,
            lastActivity: '2024-01-20',
            status: 'active',
            source: 'website'
          },
          {
            id: '2',
            name: 'Михаил Петров',
            phone: '+7 (999) 234-56-78',
            email: undefined,
            registrationDate: '2024-01-18',
            totalBookings: 3,
            lastActivity: '2024-01-19',
            status: 'active',
            source: 'phone'
          },
          {
            id: '3',
            name: 'Елена Сидорова',
            phone: '+7 (999) 345-67-89',
            email: 'elena.sidorova@email.com',
            registrationDate: '2024-01-10',
            totalBookings: 12,
            lastActivity: '2024-01-20',
            status: 'active',
            source: 'website'
          },
          {
            id: '4',
            name: 'Дмитрий Козлов',
            phone: '+7 (999) 456-78-90',
            email: undefined,
            registrationDate: '2024-01-05',
            totalBookings: 0,
            lastActivity: '2024-01-05',
            status: 'inactive',
            source: 'walk-in'
          }
        ];
        
        setClients(mockClients);
        localStorage.setItem('yogaClients', JSON.stringify(mockClients));
      }
    } catch (error) {
      console.error('Failed to load clients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterClients = () => {
    let filtered = clients;

    // Поиск по имени, телефону или email
    if (searchTerm) {
      filtered = filtered.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm) ||
        (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Фильтр по статусу
    if (statusFilter !== 'all') {
      filtered = filtered.filter(client => client.status === statusFilter);
    }

    // Фильтр по источнику
    if (sourceFilter !== 'all') {
      filtered = filtered.filter(client => client.source === sourceFilter);
    }

    setFilteredClients(filtered);
  };

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
    setShowClientDetails(true);
  };

  const exportClients = () => {
    const csvContent = [
      ['Имя', 'Телефон', 'Email', 'Дата регистрации', 'Количество записей', 'Последняя активность', 'Статус', 'Источник'],
      ...filteredClients.map(client => [
        client.name,
        client.phone,
        client.email || '',
        client.registrationDate,
        client.totalBookings.toString(),
        client.lastActivity,
        client.status === 'active' ? 'Активен' : 'Неактивен',
        client.source === 'website' ? 'Сайт' : client.source === 'phone' ? 'Телефон' : 'Лично'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `clients_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-500/20 text-green-300 border-green-500/30' 
      : 'bg-red-500/20 text-red-300 border-red-500/30';
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'website': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'phone': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'walk-in': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Загрузка данных клиентов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/admin/dashboard'}
              className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Управление клиентами</h1>
              <p className="text-xl text-white/80">База данных всех зарегистрированных клиентов</p>
            </div>
          </div>
          <button
            onClick={exportClients}
            className="flex items-center space-x-2 px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all border border-white/30"
          >
            <Download size={20} />
            <span>Экспорт</span>
          </button>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Всего клиентов</p>
                <p className="text-3xl font-bold text-white">{clients.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Users className="text-blue-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Активные клиенты</p>
                <p className="text-3xl font-bold text-white">{clients.filter(c => c.status === 'active').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <User className="text-green-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">С сайта</p>
                <p className="text-3xl font-bold text-white">{clients.filter(c => c.source === 'website').length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Calendar className="text-purple-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">По телефону</p>
                <p className="text-3xl font-bold text-white">{clients.filter(c => c.source === 'phone').length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                <Phone className="text-orange-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Фильтры и поиск */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
              <input
                type="text"
                placeholder="Поиск по имени, телефону или email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
            >
              <option value="all">Все статусы</option>
              <option value="active">Активные</option>
              <option value="inactive">Неактивные</option>
            </select>

            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value as any)}
              className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
            >
              <option value="all">Все источники</option>
              <option value="website">С сайта</option>
              <option value="phone">По телефону</option>
              <option value="walk-in">Лично</option>
            </select>

            <div className="text-right">
              <p className="text-white/70 text-sm">Найдено: {filteredClients.length}</p>
            </div>
          </div>
        </div>

        {/* Список клиентов */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6">Список клиентов</h3>
          
          {filteredClients.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/70 text-lg">Клиенты не найдены</p>
              <p className="text-white/50 text-sm mt-2">Попробуйте изменить параметры поиска</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Клиент</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Контакты</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Регистрация</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Активность</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Статус</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Источник</th>
                    <th className="text-left py-4 px-4 text-white/70 font-medium">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="border-b border-white/10 hover:bg-white/5 transition-all">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <User size={20} className="text-white" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{client.name}</p>
                            <p className="text-white/60 text-sm">ID: {client.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-white/80">
                            <Phone size={16} />
                            <span>{client.phone}</span>
                          </div>
                          {client.email && (
                            <div className="flex items-center space-x-2 text-white/80">
                              <Mail size={16} />
                              <span>{client.email}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-white/80">
                          <p>{new Date(client.registrationDate).toLocaleDateString('ru-RU')}</p>
                          <p className="text-sm text-white/60">
                            {Math.floor((Date.now() - new Date(client.registrationDate).getTime()) / (1000 * 60 * 60 * 24))} дн. назад
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-white/80">
                          <p>{client.totalBookings} записей</p>
                          <p className="text-sm text-white/60">
                            Последняя: {new Date(client.lastActivity).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(client.status)}`}>
                          {client.status === 'active' ? 'Активен' : 'Неактивен'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSourceColor(client.source)}`}>
                          {client.source === 'website' ? 'Сайт' : client.source === 'phone' ? 'Телефон' : 'Лично'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleClientClick(client)}
                          className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all"
                          title="Подробнее"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно с подробностями клиента */}
      {showClientDetails && selectedClient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Подробности клиента</h3>
              <button
                onClick={() => setShowClientDetails(false)}
                className="text-white/70 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Имя</label>
                  <p className="text-white font-medium">{selectedClient.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">ID клиента</label>
                  <p className="text-white/80">{selectedClient.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Телефон</label>
                  <p className="text-white">{selectedClient.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                  <p className="text-white">{selectedClient.email || 'Не указан'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Дата регистрации</label>
                  <p className="text-white">{new Date(selectedClient.registrationDate).toLocaleDateString('ru-RU')}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Всего записей</label>
                  <p className="text-white">{selectedClient.totalBookings}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Последняя активность</label>
                  <p className="text-white">{new Date(selectedClient.lastActivity).toLocaleDateString('ru-RU')}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Источник</label>
                  <p className="text-white">
                    {selectedClient.source === 'website' ? 'Сайт' : selectedClient.source === 'phone' ? 'Телефон' : 'Лично'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowClientDetails(false)}
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
  );
};

export default ClientsManagement;
