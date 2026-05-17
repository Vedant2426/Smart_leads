import { z } from 'zod';
import { LEAD_STATUS, LEAD_SOURCE, SORT_ORDER } from '../constants';

const statusValues = Object.values(LEAD_STATUS) as [string, ...string[]];
const sourceValues = Object.values(LEAD_SOURCE) as [string, ...string[]];
const sortValues = Object.values(SORT_ORDER) as [string, ...string[]];

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
    email: z.string().email('Invalid email address'),
    status: z.enum(statusValues).optional().default(LEAD_STATUS.NEW),
    source: z.enum(sourceValues, { required_error: 'Source is required' }),
  }),
});

export const updateLeadSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    email: z.string().email('Invalid email address').optional(),
    status: z.enum(statusValues).optional(),
    source: z.enum(sourceValues).optional(),
  }),
  params: z.object({
    id: z.string().min(1, 'Lead ID is required'),
  }),
});

export const leadQuerySchema = z.object({
  query: z.object({
    status: z.enum(statusValues).optional(),
    source: z.enum(sourceValues).optional(),
    search: z.string().optional(),
    sort: z.enum(sortValues).optional(),
    page: z.string().regex(/^\d+$/, 'Page must be a number').optional(),
    limit: z.string().regex(/^\d+$/, 'Limit must be a number').optional(),
  }),
});

export const leadIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Lead ID is required'),
  }),
});
