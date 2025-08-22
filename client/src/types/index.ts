export interface Class {
  id: string;
  title: string;
  instructor: string;
  startEpochMs: number;
  durationMin: number;
  capacity: number;
  booked: number;
  location: string;
  level: string;
}

export interface Booking {
  id: string;
  classId: string;
  userId: string;
  status: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  durationSec: number;
  level: string;
}

export interface User {
  id: string;
  email?: string;
  phone?: string;
  premiumAccess: boolean;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface ApiError {
  message: string;
  status?: number;
}
