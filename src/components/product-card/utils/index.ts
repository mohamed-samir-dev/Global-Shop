import { Product } from '@/types';

export const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getProductPricing = (product: Product) => {
  const currentPrice = product.finalPrice || product.price || product.basePrice;
  const originalPrice = product.basePrice;
  const hasDiscount = Boolean(product.discount) || Boolean(originalPrice && currentPrice && originalPrice > currentPrice);
  const discountPercentage = hasDiscount && currentPrice && originalPrice 
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) 
    : 0;

  return {
    currentPrice,
    originalPrice,
    hasDiscount,
    discountPercentage
  };
};

export const isProductOutOfStock = (product: Product): boolean => {
  return product.countInStock === 0 || product.stock === 0 || product.availability === 'out_of_stock';
};

export const getProductImageUrl = (product: Product): string => {
  return product.image || product.mainImage || '';
};