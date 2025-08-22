import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminUser } from '../types/admin';
import { apiService } from '../services/api';

interface AdminAuthContextType {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshAdminData: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        // Проверяем, есть ли мок-данные
        const mockAdminData = localStorage.getItem('adminData');
        if (mockAdminData) {
          setAdmin(JSON.parse(mockAdminData));
          setIsLoading(false);
          return;
        }
        
        // Пытаемся получить данные через API
        const adminData = await apiService.getAdminProfile();
        setAdmin(adminData);
      }
    } catch (error) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      console.log('AdminAuthContext: попытка входа через API');
      const response = await apiService.adminLogin(email, password);
      console.log('AdminAuthContext: успешный ответ от API:', response);
      localStorage.setItem('adminToken', response.token);
      setAdmin(response.admin);
      return true;
    } catch (error) {
      console.error('AdminAuthContext: ошибка входа:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  const refreshAdminData = async () => {
    try {
      const adminData = await apiService.getAdminProfile();
      setAdmin(adminData);
    } catch (error) {
      console.error('Failed to refresh admin data:', error);
      logout();
    }
  };

  const value: AdminAuthContextType = {
    admin,
    isAuthenticated: !!admin,
    isLoading,
    login,
    logout,
    refreshAdminData,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
