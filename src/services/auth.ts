import { useMutation } from '@tanstack/react-query';
import { apiClient } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export const loginUser = async (credentials: LoginCredentials): Promise<LoginApiResponse> => {
  const formData = new FormData();
  formData.append('email', credentials.email);
  formData.append('password', credentials.password);

  const { data } = await apiClient.post<LoginApiResponse>('/login', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
};

export const useLogin = () =>
  useMutation({
    mutationFn: loginUser,
    onSuccess: async data => {
      const token = data?.data?.token;
      if (token) {
        await AsyncStorage.setItem('userToken', token);
      }
    },
  });
