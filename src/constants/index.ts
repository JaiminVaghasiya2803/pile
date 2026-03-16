import { ExpenseCategory, Currency } from '../types';

export const EXPENSE_CATEGORIES: {
  id: ExpenseCategory;
  name: string;
  icon: string;
  color: string;
}[] = [
  { id: 'food', name: 'Food & Dining', icon: '🍽️', color: '#FF6B6B' },
  { id: 'transport', name: 'Transportation', icon: '🚗', color: '#4ECDC4' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: '#45B7D1' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#96CEB4' },
  { id: 'bills', name: 'Bills & Utilities', icon: '💡', color: '#FFEAA7' },
  { id: 'health', name: 'Healthcare', icon: '🏥', color: '#DDA0DD' },
  { id: 'travel', name: 'Travel', icon: '✈️', color: '#98D8C8' },
  { id: 'education', name: 'Education', icon: '📚', color: '#F7DC6F' },
  { id: 'other', name: 'Other', icon: '📦', color: '#BDC3C7' },
];

export const CURRENCIES: { code: Currency; name: string; symbol: string }[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
];

export const GROUP_COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
  '#DDA0DD',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E9',
  '#F8C471',
  '#82E0AA',
  '#AED6F1',
  '#F1948A',
  '#D7BDE2',
];

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  EXPENSES: {
    LIST: '/expenses',
    CREATE: '/expenses',
    UPDATE: (id: string) => `/expenses/${id}`,
    DELETE: (id: string) => `/expenses/${id}`,
    DETAILS: (id: string) => `/expenses/${id}`,
  },
  GROUPS: {
    LIST: '/groups',
    CREATE: '/groups',
    UPDATE: (id: string) => `/groups/${id}`,
    DELETE: (id: string) => `/groups/${id}`,
    DETAILS: (id: string) => `/groups/${id}`,
    MEMBERS: (id: string) => `/groups/${id}/members`,
    ADD_MEMBER: (id: string) => `/groups/${id}/members`,
    REMOVE_MEMBER: (groupId: string, memberId: string) => `/groups/${groupId}/members/${memberId}`,
  },
  SPLITS: {
    CREATE: '/splits',
    UPDATE: (id: string) => `/splits/${id}`,
    DELETE: (id: string) => `/splits/${id}`,
    BY_GROUP: (groupId: string) => `/splits/group/${groupId}`,
    BY_EXPENSE: (expenseId: string) => `/splits/expense/${expenseId}`,
  },
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@plie_auth_token',
  REFRESH_TOKEN: '@plie_refresh_token',
  USER_DATA: '@plie_user_data',
  THEME_MODE: '@plie_theme_mode',
  ONBOARDING_COMPLETED: '@plie_onboarding_completed',
};

export const QUERY_KEYS = {
  EXPENSES: 'expenses',
  GROUPS: 'groups',
  USER: 'user',
  SPLITS: 'splits',
  CATEGORIES: 'categories',
};

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_EXPENSE_AMOUNT: 1000000,
  MIN_EXPENSE_AMOUNT: 0.01,
  MAX_GROUP_MEMBERS: 50,
  MAX_EXPENSE_TITLE_LENGTH: 100,
  MAX_GROUP_NAME_LENGTH: 50,
};
