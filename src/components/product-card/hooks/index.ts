import { useState } from 'react';
import { Product } from '@/types';

export const useWishlist = (onToggleWishlist?: (product: Product) => void) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleToggle = (product: Product) => {
    setIsWishlisted(!isWishlisted);
    onToggleWishlist?.(product);
  };

  return {
    isWishlisted,
    handleToggle
  };
};