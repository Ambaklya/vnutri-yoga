import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ClassSchedule {
  id: string;
  name: string;
  instructor: string;
  time: string;
  duration: number;
  price: number;
  capacity: number;
  currentBookings: number;
  maxBookings: number;
  level: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  recurringDays: string[];
  location: string;
}

interface ClassesContextType {
  classes: ClassSchedule[];
  addClass: (classData: Omit<ClassSchedule, 'id' | 'currentBookings'>) => void;
  updateClass: (id: string, classData: Partial<ClassSchedule>) => void;
  deleteClass: (id: string) => void;
  getClassesForDate: (date: Date) => ClassSchedule[];
  getActiveClasses: () => ClassSchedule[];
  isLoading: boolean;
}

const ClassesContext = createContext<ClassesContextType | undefined>(undefined);

export const useClasses = () => {
  const context = useContext(ClassesContext);
  if (context === undefined) {
    throw new Error('useClasses must be used within a ClassesProvider');
  }
  return context;
};

interface ClassesProviderProps {
  children: ReactNode;
}

export const ClassesProvider: React.FC<ClassesProviderProps> = ({ children }) => {
  const [classes, setClasses] = useState<ClassSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      setIsLoading(true);
      
      // Загружаем занятия из localStorage или используем мок-данные
      const savedClasses = localStorage.getItem('yogaClasses');
      if (savedClasses) {
        setClasses(JSON.parse(savedClasses));
      } else {
        // Мок-данные по умолчанию
        const defaultClasses: ClassSchedule[] = [
          {
            id: '1',
            name: 'Хатха Йога',
            instructor: 'Анна Петрова',
            time: '09:00',
            duration: 90,
            price: 1500,
            capacity: 15,
            currentBookings: 8,
            maxBookings: 15,
            level: 'Начинающий',
            isActive: true,
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            recurringDays: ['monday', 'wednesday', 'friday'],
            location: 'Зал 1'
          },
          {
            id: '2',
            name: 'Виньяса Флоу',
            instructor: 'Михаил Сидоров',
            time: '18:30',
            duration: 75,
            price: 1800,
            capacity: 12,
            currentBookings: 10,
            maxBookings: 12,
            level: 'Средний',
            isActive: true,
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            recurringDays: ['tuesday', 'thursday'],
            location: 'Зал 2'
          },
          {
            id: '3',
            name: 'Йога для расслабления',
            instructor: 'Елена Смирнова',
            time: '20:00',
            duration: 60,
            price: 1200,
            capacity: 20,
            currentBookings: 15,
            maxBookings: 20,
            level: 'Начинающий',
            isActive: true,
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            recurringDays: ['monday', 'wednesday', 'friday'],
            location: 'Зал 1'
          }
        ];
        setClasses(defaultClasses);
        localStorage.setItem('yogaClasses', JSON.stringify(defaultClasses));
      }
    } catch (error) {
      console.error('Failed to load classes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addClass = (classData: Omit<ClassSchedule, 'id' | 'currentBookings'>) => {
    const newClass: ClassSchedule = {
      ...classData,
      id: Date.now().toString(),
      currentBookings: 0
    };
    
    const updatedClasses = [...classes, newClass];
    setClasses(updatedClasses);
    localStorage.setItem('yogaClasses', JSON.stringify(updatedClasses));
  };

  const updateClass = (id: string, classData: Partial<ClassSchedule>) => {
    const updatedClasses = classes.map(cls => 
      cls.id === id ? { ...cls, ...classData } : cls
    );
    setClasses(updatedClasses);
    localStorage.setItem('yogaClasses', JSON.stringify(updatedClasses));
  };

  const deleteClass = (id: string) => {
    const updatedClasses = classes.filter(cls => cls.id !== id);
    setClasses(updatedClasses);
    localStorage.setItem('yogaClasses', JSON.stringify(updatedClasses));
  };

  const getClassesForDate = (date: Date): ClassSchedule[] => {
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[date.getDay()];
    
    return classes.filter(cls => 
      cls.isActive && 
      cls.recurringDays.includes(dayName) &&
      new Date(cls.startDate) <= date &&
      new Date(cls.endDate) >= date
    );
  };

  const getActiveClasses = (): ClassSchedule[] => {
    return classes.filter(cls => cls.isActive);
  };

  const value: ClassesContextType = {
    classes,
    addClass,
    updateClass,
    deleteClass,
    getClassesForDate,
    getActiveClasses,
    isLoading
  };

  return (
    <ClassesContext.Provider value={value}>
      {children}
    </ClassesContext.Provider>
  );
};
