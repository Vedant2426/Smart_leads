import { Document } from 'mongoose';
import { LeadSource, LeadStatus, SortOrder } from '../constants';

export interface ILead {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: Date;
}

export interface ILeadDocument extends ILead, Document {}

export interface ILeadQuery {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: SortOrder;
  page?: number;
  limit?: number;
}

export interface ILeadCreateRequest {
  name: string;
  email: string;
  status?: LeadStatus;
  source: LeadSource;
}

export interface ILeadUpdateRequest {
  name?: string;
  email?: string;
  status?: LeadStatus;
  source?: LeadSource;
}
