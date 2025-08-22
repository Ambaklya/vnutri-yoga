// Типы для админ-панели

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  permissions: string[];
  lastLogin: string;
}

export interface ClassSchedule {
  id: string;
  name: string;
  instructor: string;
  time: string;
  duration: number; // в минутах
  level: 'beginner' | 'intermediate' | 'advanced';
  capacity: number;
  price: number;
  location: string;
  startDate: string;
  endDate: string;
  recurringDays: string[]; // ['monday', 'wednesday', 'friday']
  isActive: boolean;
  maxBookings: number;
  currentBookings: number;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  classId: string;
  className: string;
  classDate: string;
  classTime: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  paymentMethod: 'cash' | 'card' | 'online';
  amount: number;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface PricingPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  classes: ClassPricing[];
}

export interface ClassPricing {
  classType: string;
  price: number;
  discountPrice?: number;
  maxDiscounts?: number;
  currentDiscounts: number;
}

export interface AdminStats {
  totalBookings: number;
  totalRevenue: number;
  activeClasses: number;
  pendingBookings: number;
  monthlyRevenue: { month: string; revenue: number }[];
  popularClasses: { name: string; bookings: number }[];
}

export interface SyncSettings {
  mobileApps: {
    ios: { enabled: boolean; lastSync: string };
    android: { enabled: boolean; lastSync: string };
  };
  autoSync: boolean;
  syncInterval: number; // в минутах
  lastFullSync: string;
}
