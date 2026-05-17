import api from './api';
import type { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../types';

interface ApiAuthResponse {
  success: boolean;
  message: string;
  data: AuthResponse;
}

interface ProfileResponse {
  success: boolean;
  message: string;
  data: { user: User };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<ApiAuthResponse>('/auth/login', credentials);
    return response.data.data; // unwrap the { success, message, data } wrapper
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post<ApiAuthResponse>('/auth/register', credentials);
    return response.data.data; // unwrap the { success, message, data } wrapper
  },

  async getProfile(): Promise<User> {
    const response = await api.get<ProfileResponse>('/auth/profile');
    return response.data.data.user;
  },
};
