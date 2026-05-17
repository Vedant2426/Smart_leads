import { z } from 'zod';
import { USER_ROLES } from '../constants';

const roleValues = Object.values(USER_ROLES) as [string, ...string[]];

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(roleValues).optional().default(USER_ROLES.SALES),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});
