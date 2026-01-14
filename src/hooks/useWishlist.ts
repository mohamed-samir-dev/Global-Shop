import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import WishlistService from '@/services/wishlistService';
import { Product } from '@/types';
import toast from 'react-hot-toast';

interface WishlistItem {
  productId: Product;
  addedAt: string;
}

interface UserWishlist {
  items: WishlistItem[];
  totalItems: number;
}

export const useWishlist = () => {
  const { user, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [userWishlist, setUserWishlist] = useState<UserWishlist | null>(null);
  const [guestWishlistCount, setGuestWishlistCount] = useState(0);

  const handleAutoMerge = useCallback(async () => {
    setIsLoading(true);
    try {
      await WishlistService.mergeGuestWishlistWithUser();
      await loadUserWishlist();
      toast.success('Your wishlist has been restored!');
    } catch (error) {
      console.error('Error auto-merging wishlist:', error);
      await loadUserWishlist();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user && token) {
      if (WishlistService.hasGuestWishlist()) {
        handleAutoMerge();
      } else {
        loadUserWishlist();
      }
    } else {
      loadGuestWishlist();
    }
  }, [user, token, handleAutoMerge]);

  const loadGuestWishlist = () => {
    try {
      const guestWishlist = WishlistService.getGuestWishlist();
      setGuestWishlistCount(guestWishlist.totalItems);
    } catch (error) {
      console.error('Error loading guest wishlist:', error);
    }
  };

  const loadUserWishlist = async () => {
    setIsLoading(true);
    try {
      const response = await WishlistService.getUserWishlist();
      setUserWishlist(response);
    } catch (error) {
      console.error('Error loading user wishlist:', error);
      setUserWishlist({ items: [], totalItems: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToWishlist = async (product: Product) => {
    setIsLoading(true);
    try {
      if (user && token) {
        await WishlistService.addToUserWishlist(product._id);
        await loadUserWishlist();
        toast.success(`${product.name} added to wishlist!`);
      } else {
        WishlistService.addToGuestWishlist(product);
        loadGuestWishlist();
        toast.success(`${product.name} added to wishlist!`);
      }
      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to add to wishlist';
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId: string, productName?: string) => {
    setIsLoading(true);
    try {
      if (user && token) {
        await WishlistService.removeFromUserWishlist(productId);
        await loadUserWishlist();
      } else {
        WishlistService.removeFromGuestWishlist(productId);
        loadGuestWishlist();
      }
      
      if (productName) {
        toast.success(`${productName} removed from wishlist`);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to remove from wishlist';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleWishlist = async (product: Product) => {
    const inWishlist = await isInWishlist(product._id);
    if (inWishlist) {
      return handleRemoveFromWishlist(product._id, product.name);
    } else {
      return handleAddToWishlist(product);
    }
  };

  const isInWishlist = async (productId: string): Promise<boolean> => {
    if (user && token) {
      return await WishlistService.checkInUserWishlist(productId);
    } else {
      return WishlistService.isInGuestWishlist(productId);
    }
  };

  const getWishlistCount = (): number => {
    if (user && token) {
      return userWishlist?.totalItems || 0;
    } else {
      return guestWishlistCount;
    }
  };

  return {
    userWishlist,
    isLoading,
    isAuthenticated: !!user,
    addToWishlist: handleAddToWishlist,
    removeFromWishlist: handleRemoveFromWishlist,
    toggleWishlist: handleToggleWishlist,
    isInWishlist,
    wishlistCount: getWishlistCount(),
    hasGuestWishlist: WishlistService.hasGuestWishlist,
  };
};
