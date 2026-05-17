import type { LeadStatus, LeadSource } from '../types';

export const LEAD_STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'won', 'lost'];

export const LEAD_SOURCES: LeadSource[] = ['website', 'referral', 'social', 'email', 'phone', 'other'];

export const USER_ROLES = {
  ADMIN: 'admin',
  SALES: 'sales',
} as const;
