import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { useWishlist as useWishlistHook } from '@/hooks/useWishlist';

export const useWishlist = (onToggleWishlist?: (product: Product) => void) => {
  const { toggleWishlist, isInWishlist } = useWishlistHook();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleToggle = async (product: Product) => {
    await toggleWishlist(product);
    const inWishlist = await isInWishlist(product._id);
    setIsWishlisted(inWishlist);
    onToggleWishlist?.(product);
  };

  const checkWishlist = async (productId: string) => {
    const inWishlist = await isInWishlist(productId);
    setIsWishlisted(inWishlist);
  };

  return {
    isWishlisted,
    handleToggle,
    checkWishlist
  };
};