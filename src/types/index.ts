export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  role?: string;
  isAdmin: boolean;
  createdAt?: string;
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
  nameAr?: string;
  slug?: string;
  shortDescription?: string;
  shortDescriptionAr?: string;
  description: string;
  descriptionAr?: string;
  
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
  categoryAr?: string;
  subCategory?: string;
  subCategoryAr?: string;
  brand?: string;
  brandAr?: string;
  tags?: string[];
  tagsAr?: string[];
  
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
  specifications?: Record<string, string>;
  specificationsAr?: Record<string, string>;
  
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
