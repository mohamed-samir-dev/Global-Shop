import axios from "axios";
import { AuthResponse, Product, User } from "@/types";

interface CartOptions {
  size?: string;
  color?: string;
  [key: string]: unknown;
}

interface GuestCartItem {
  productId: string;
  quantity: number;
  options?: CartOptions;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    dateOfBirth: string;
  }) => api.post<AuthResponse>("/users/register", userData),

  login: (credentials: { email: string; password: string }) =>
    api.post<AuthResponse>("/users/login", credentials),

  getUsers: () => api.get<User[]>("/users"),
};

export const productAPI = {
  getProducts: () => api.get<Product[]>("/products"),

  getLatestProducts: (limit?: number) =>
    api.get<Product[]>(`/products/latest${limit ? `?limit=${limit}` : ""}`),

  getProduct: (id: string) => api.get<Product>(`/products/${id}`),

  createProduct: (productData: Omit<Product, "_id">) =>
    api.post<Product>("/products", productData),

  updateProduct: (id: string, productData: Partial<Product>) =>
    api.put<Product>(`/products/${id}`, productData),

  deleteProduct: (id: string) => api.delete(`/products/${id}`),

  getReviews: (id: string) => api.get(`/products/${id}/reviews`).then(res => res.data),

  addReview: (id: string, reviewData: { rating: number; comment?: string }) =>
    api.post(`/products/${id}/reviews`, reviewData),
};

export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (productId: string, quantity: number = 1, options: CartOptions = {}) =>
    api.post('/cart/add', { productId, quantity, options }),
  updateCartItem: (productId: string, quantity: number, options: CartOptions = {}) =>
    api.put('/cart/update', { productId, quantity, options }),
  removeFromCart: (productId: string, options: CartOptions = {}) =>
    api.delete('/cart/remove', { data: { productId, options } }),
  clearCart: () => api.delete('/cart/clear'),
  mergeCart: (guestCartItems: GuestCartItem[]) =>
    api.post('/cart/merge', { guestCartItems }),
  validateCart: () => api.post('/cart/validate'),
  proceedToCheckout: () => api.post('/cart/checkout'),
};

export const wishlistAPI = {
  getWishlist: () => api.get('/wishlist'),
  addToWishlist: (productId: string) =>
    api.post('/wishlist/add', { productId }),
  removeFromWishlist: (productId: string) =>
    api.delete('/wishlist/remove', { data: { productId } }),
  clearWishlist: () => api.delete('/wishlist/clear'),
  mergeWishlist: (guestWishlistItems: { productId: string }[]) =>
    api.post('/wishlist/merge', { guestWishlistItems }),
  checkInWishlist: (productId: string) =>
    api.get(`/wishlist/check/${productId}`),
};

export const testimonialAPI = {
  getTestimonials: () => api.get("/testimonials"),
  createTestimonial: (testimonialData: {
    name: string;
    email: string;
    rating: number;
    comment: string;
  }) => api.post("/testimonials", testimonialData),
};

export default api;
