import { useMutation } from '@tanstack/react-query';
import { apiClient } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface LoginResponse {
  data?: {
    token?: string;
    [key: string]: unknown;
  };
  token?: string;
  message?: string;
}

export const loginUser = async (credentials: LoginCredentials) => {
  const formData = new FormData();
  formData.append('email', credentials.email);
  if (credentials.password) formData.append('password', credentials.password);

  const { data } = await apiClient.post<LoginResponse>('/login', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
};

export const useLogin = () =>
  useMutation({
    mutationFn: loginUser,
    onSuccess: async data => {
      const token = data?.data?.token || data?.token;
      if (token) {
        await AsyncStorage.setItem('userToken', token);
      }
    },
  });
