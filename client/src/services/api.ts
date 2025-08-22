import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Class, Booking, Video, AuthResponse, User, ApiError } from '../types';

class ApiService {
  private api: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
      timeout: 10000,
    });

    // Load token from localStorage
    this.token = localStorage.getItem('accessToken');
    if (this.token) {
      this.setAuthToken(this.token);
    }

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.logout();
        }
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token: string) {
    this.token = token;
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('accessToken', token);
  }

  logout() {
    this.token = null;
    delete this.api.defaults.headers.common['Authorization'];
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  }

  // Auth methods
  async registerEmail(email: string, password: string): Promise<AuthResponse> {
    const response = await this.api.post('/auth/register', { email, password });
    return response.data;
  }

  async loginEmail(email: string, password: string): Promise<AuthResponse> {
    const response = await this.api.post('/auth/login', { email, password });
    const data = response.data;
    this.setAuthToken(data.accessToken);
    return data;
  }

  async registerPhone(phone: string): Promise<void> {
    await this.api.post('/auth/phone/register', { phone });
  }

  async loginPhoneOtp(phone: string, otp: string): Promise<AuthResponse> {
    const response = await this.api.post('/auth/phone/verify', { phone, otp });
    const data = response.data;
    this.setAuthToken(data.accessToken);
    return data;
  }

  // Class methods
  async getMonthlyClasses(year: number, month: number): Promise<Class[]> {
    const response = await this.api.get(`/classes/monthly?year=${year}&month=${month}`);
    return response.data;
  }

  async bookClass(classId: string): Promise<Booking> {
    const response = await this.api.post('/bookings', { classId });
    return response.data;
  }

  async getMyBookings(): Promise<Booking[]> {
    const response = await this.api.get('/bookings/my');
    return response.data;
  }

  // Video methods
  async getVideos(): Promise<Video[]> {
    const response = await this.api.get('/videos');
    return response.data;
  }

  // User methods
  async getCurrentUser(): Promise<User> {
    const response = await this.api.get('/user/profile');
    return response.data;
  }

  async setPremiumAccess(enabled: boolean): Promise<void> {
    await this.api.post('/user/premium', { enabled });
  }
}

export const apiService = new ApiService();
export default apiService;
