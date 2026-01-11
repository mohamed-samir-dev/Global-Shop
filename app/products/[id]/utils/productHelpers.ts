import { Product } from '@/types';

export const calculateDiscount = (product: Product) => {
  const hasDiscount = !!(product.price && product.basePrice && product.basePrice > product.price);
  const discountPercentage = hasDiscount && product.price 
    ? Math.round(((product.basePrice! - product.price) / product.basePrice!) * 100) 
    : 0;
  
  return { hasDiscount, discountPercentage };
};

export const getStockStatus = (countInStock: number = 0, t: (key: string, options?: Record<string, unknown>) => string | object) => {
  if (countInStock > 10) {
    return {
      status: 'in-stock',
      className: 'bg-green-100 text-green-800',
      dotClassName: 'bg-green-500',
      text: `${countInStock} ${String(t('product.stock.inStock'))}`
    };
  } else if (countInStock > 0) {
    return {
      status: 'low-stock',
      className: 'bg-yellow-100 text-yellow-800',
      dotClassName: 'bg-yellow-500',
      text: `${countInStock} ${String(t('product.stock.inStock'))}`
    };
  } else {
    return {
      status: 'out-of-stock',
      className: 'bg-red-100 text-red-800',
      dotClassName: 'bg-red-500',
      text: String(t('product.stock.outOfStock'))
    };
  }
};

export const getProductImages = (product: Product) => {
  return [product.image].filter(Boolean);
};