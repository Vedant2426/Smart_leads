export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'sales';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'sales';
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'won' | 'lost';
export type LeadSource = 'website' | 'referral' | 'social' | 'email' | 'phone' | 'other';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  updatedAt: string;
}

export interface LeadCreateRequest {
  name: string;
  email: string;
  status?: LeadStatus;
  source: LeadSource;
}

export interface LeadUpdateRequest {
  name?: string;
  email?: string;
  status?: LeadStatus;
  source?: LeadSource;
}

export interface LeadQuery {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: 'latest' | 'oldest';
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: PaginationMeta;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
