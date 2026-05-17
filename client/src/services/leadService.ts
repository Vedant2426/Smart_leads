import api from './api';
import type { Lead, LeadCreateRequest, LeadUpdateRequest, LeadQuery, PaginatedResponse } from '../types';

export const leadService = {
  async getAll(query?: LeadQuery): Promise<PaginatedResponse<Lead>> {
    const params = new URLSearchParams();
    if (query?.status) params.append('status', query.status);
    if (query?.source) params.append('source', query.source);
    if (query?.search) params.append('search', query.search);
    if (query?.sort) params.append('sort', query.sort);
    if (query?.page) params.append('page', query.page.toString());
    if (query?.limit) params.append('limit', query.limit.toString());

    const response = await api.get<PaginatedResponse<Lead>>(`/leads?${params.toString()}`);
    return response.data;
  },

  async getById(id: string): Promise<Lead> {
    const response = await api.get<Lead>(`/leads/${id}`);
    return response.data;
  },

  async create(data: LeadCreateRequest): Promise<Lead> {
    const response = await api.post<Lead>('/leads', data);
    return response.data;
  },

  async update(id: string, data: LeadUpdateRequest): Promise<Lead> {
    const response = await api.put<Lead>(`/leads/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/leads/${id}`);
  },

  async exportCsv(query?: LeadQuery): Promise<Blob> {
    const params = new URLSearchParams();
    if (query?.status) params.append('status', query.status);
    if (query?.source) params.append('source', query.source);
    if (query?.search) params.append('search', query.search);
    if (query?.sort) params.append('sort', query.sort);

    const response = await api.get(`/leads/export/csv?${params.toString()}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
