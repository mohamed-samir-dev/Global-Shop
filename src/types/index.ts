export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  countInStock: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Backend actually returns a flat structure
export interface BackendAuthResponse {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  token: string;
  phone?: string;
  dateOfBirth?: string;
}

export interface ApiError {
  message: string;
}
