// Core Types
export interface User {
  usr_id: number;
  usr_fname: string;
  usr_lname: string;
  usr_username: string;
  usr_email: string;
  usr_profile: string;
  usr_profile_img: string;
  usr_email_verified_at: string | null;
  usr_provider_id: string | null;
  usr_login_type: string | null;
  usr_status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  role: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  description?: string;
  date: string;
  userId: string;
  groupId?: string;
  receipt?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  color: string;
  currency: string;
  members: GroupMember[];
  totalExpenses: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupMember {
  id: string;
  userId: string;
  groupId: string;
  role: "admin" | "member";
  joinedAt: string;
  user: User;
}

export interface BillSplit {
  id: string;
  expenseId: string;
  groupId: string;
  splits: Split[];
  totalAmount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface Split {
  id: string;
  userId: string;
  amount: number;
  percentage: number;
  isPaid: boolean;
  paidAt?: string;
  user: User;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  isDefault: boolean;
}

export type ExpenseCategory =
  | "food"
  | "transport"
  | "entertainment"
  | "shopping"
  | "bills"
  | "health"
  | "travel"
  | "education"
  | "other";

export type SplitType = "equal" | "percentage" | "amount";

export type Currency = "USD" | "EUR" | "GBP" | "INR" | "JPY" | "CAD" | "AUD";

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Onboarding: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Expenses: undefined;
  Groups: undefined;
  Profile: undefined;
};

export type ExpenseStackParamList = {
  ExpenseList: undefined;
  AddExpense: { groupId?: string };
  EditExpense: { expenseId: string };
  ExpenseDetails: { expenseId: string };
};

export type GroupStackParamList = {
  GroupList: undefined;
  CreateGroup: undefined;
  GroupDetails: { groupId: string };
  EditGroup: { groupId: string };
  GroupSettings: { groupId: string };
};

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface CreateExpenseForm {
  title: string;
  amount: string;
  category: ExpenseCategory;
  description?: string;
  date: Date;
  groupId?: string;
  receipt?: string;
  tags?: string[];
}

export interface CreateGroupForm {
  name: string;
  description?: string;
  color: string;
  currency: Currency;
  members: string[];
}

// Theme Types
export type ThemeMode = "light" | "dark" | "system";

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  warning: string;
  success: string;
  info: string;
}
