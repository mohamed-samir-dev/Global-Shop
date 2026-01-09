export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface ProductVariant {
  size?: string;
  color?: string;
  price?: number;
  stock: number;
  sku?: string;
}

export interface ProductReview {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  rating: number;
  comment?: string;
  date: string;
}

export interface ProductDimensions {
  length?: string;
  width?: string;
  height?: string;
}

export interface ProductDiscount {
  type: 'percentage' | 'fixed';
  value: number;
}

export interface Product {
  _id: string;
  // Basic Information
  name: string;
  slug?: string;
  shortDescription?: string;
  description: string;
  
  // Pricing
  basePrice: number;
  discount?: ProductDiscount;
  finalPrice?: number;
  currency: string;
  
  // Media
  mainImage: string;
  imageGallery?: string[];
  video?: string;
  
  // Inventory
  stock: number;
  sku?: string;
  availability: 'in_stock' | 'out_of_stock';
  
  // Categories & Organization
  category: string;
  subCategory?: string;
  brand?: string;
  tags?: string[];
  
  // Variants & Attributes
  sizes?: string[];
  colors?: string[];
  variants?: ProductVariant[];
  
  // Ratings & Reviews
  averageRating: number;
  totalReviews: number;
  reviews?: ProductReview[];
  
  // Additional Details
  material?: string;
  weight?: string;
  dimensions?: ProductDimensions;
  warranty?: string;
  returnPolicy?: string;
  
  // Legacy fields for backward compatibility
  price?: number;
  countInStock?: number;
  image?: string;
  
  // Timestamps
  createdAt?: string;
  updatedAt?: string;
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
