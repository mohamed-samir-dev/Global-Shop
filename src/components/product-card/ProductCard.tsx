'use client';

import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { ProductCardProps } from './types';
import { useWishlist } from './hooks';
import { getProductPricing, isProductOutOfStock } from './utils';
import { 
  WishlistButton, 
  ProductImage, 
  ProductInfo, 
  ProductActions 
} from './components';
import { useEffect } from 'react';

export default function ProductCard({ product, onAddToCart, onToggleWishlist }: ProductCardProps) {
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();
  const { isWishlisted, handleToggle, checkWishlist } = useWishlist(onToggleWishlist);
  const { hasDiscount, discountPercentage } = getProductPricing(product);
  const isOutOfStock = isProductOutOfStock(product);

  useEffect(() => {
    checkWishlist(product._id);
  }, [product._id, checkWishlist]);

  const handleWishlistToggle = () => {
    handleToggle(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  return (
    <div className={`border rounded-lg p-3 md:p-4 w-full relative transition-all duration-200 hover:shadow-lg flex flex-col h-full ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-600 hover:border-gray-500' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    } ${isArabic ? 'rtl' : 'ltr'}`}>
      <WishlistButton 
        isWishlisted={isWishlisted} 
        onToggle={handleWishlistToggle} 
      />
      
      <ProductImage 
        product={product}
        hasDiscount={hasDiscount}
        discountPercentage={discountPercentage}
      />
      
      <div className="flex-1 flex flex-col min-h-0">
        <ProductInfo product={product} />
        
        <div className="mt-auto pt-3">
          <ProductActions 
            product={product}
            isOutOfStock={isOutOfStock}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
}