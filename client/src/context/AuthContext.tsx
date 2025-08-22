import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import apiService from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginPhone: (phone: string, otp: string) => Promise<void>;
  registerPhone: (phone: string) => Promise<void>;
  logout: () => void;
  setPremiumAccess: (enabled: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const userData = await apiService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        localStorage.removeItem('accessToken');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.loginEmail(email, password);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await apiService.registerEmail(email, password);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const loginPhone = async (phone: string, otp: string) => {
    try {
      const response = await apiService.loginPhoneOtp(phone, otp);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const registerPhone = async (phone: string) => {
    try {
      await apiService.registerPhone(phone);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    apiService.logout();
  };

  const setPremiumAccess = async (enabled: boolean) => {
    try {
      await apiService.setPremiumAccess(enabled);
      if (user) {
        setUser({ ...user, premiumAccess: enabled });
      }
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    loginPhone,
    registerPhone,
    logout,
    setPremiumAccess,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
