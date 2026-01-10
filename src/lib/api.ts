import axios from 'axios';
import { AuthResponse, Product, User } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData: { name: string; email: string; password: string; phone: string; dateOfBirth: string }) =>
    api.post<AuthResponse>('/users/register', userData),
  
  login: (credentials: { email: string; password: string }) =>
    api.post<AuthResponse>('/users/login', credentials),
  
  getUsers: () => api.get<User[]>('/users'),
};

export const productAPI = {
  getProducts: () => api.get<Product[]>('/products'),
  
  getProduct: (id: string) => api.get<Product>(`/products/${id}`),
  
  createProduct: (productData: Omit<Product, '_id'>) =>
    api.post<Product>('/products', productData),
  
  updateProduct: (id: string, productData: Partial<Product>) =>
    api.put<Product>(`/products/${id}`, productData),
  
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
  
  addReview: (id: string, reviewData: { rating: number; comment?: string }) =>
    api.post(`/products/${id}/reviews`, reviewData),
};

export default api;