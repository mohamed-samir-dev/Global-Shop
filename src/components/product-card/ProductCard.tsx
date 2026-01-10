'use client';

import { useTheme } from '@/context/ThemeContext';
import { ProductCardProps } from './types';
import { useWishlist } from './hooks';
import { getProductPricing, isProductOutOfStock } from './utils';
import { 
  WishlistButton, 
  ProductImage, 
  ProductInfo, 
  ProductActions 
} from './components';

export default function ProductCard({ product, onAddToCart, onToggleWishlist }: ProductCardProps) {
  const { isDarkMode } = useTheme();
  const { isWishlisted, handleToggle } = useWishlist(onToggleWishlist);
  const { hasDiscount, discountPercentage } = getProductPricing(product);
  const isOutOfStock = isProductOutOfStock(product);

  const handleWishlistToggle = () => {
    handleToggle(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  return (
    <div className={`border rounded-lg p-3 w-70 max-w-md mx-auto h-95 relative ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-600' 
        : 'bg-white border-gray-200'
    }`}>
      <WishlistButton 
        isWishlisted={isWishlisted} 
        onToggle={handleWishlistToggle} 
      />
      
      <ProductImage 
        product={product}
        hasDiscount={hasDiscount}
        discountPercentage={discountPercentage}
      />
      
      <ProductInfo product={product} />
      
      <ProductActions 
        product={product}
        isOutOfStock={isOutOfStock}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}