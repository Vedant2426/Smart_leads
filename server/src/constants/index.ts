export const LEAD_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  WON: 'won',
  LOST: 'lost',
} as const;

export const LEAD_SOURCE = {
  WEBSITE: 'website',
  REFERRAL: 'referral',
  SOCIAL: 'social',
  EMAIL: 'email',
  PHONE: 'phone',
  OTHER: 'other',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  SALES: 'sales',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const SORT_ORDER = {
  LATEST: 'latest',
  OLDEST: 'oldest',
} as const;

export type LeadStatus = (typeof LEAD_STATUS)[keyof typeof LEAD_STATUS];
export type LeadSource = (typeof LEAD_SOURCE)[keyof typeof LEAD_SOURCE];
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];
