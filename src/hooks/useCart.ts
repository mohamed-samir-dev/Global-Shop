import { useAppDispatch, useAppSelector } from './redux';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import { Product } from '@/types';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import CartService from '@/services/cartService';
import { cartAPI } from '@/lib/api';

interface CartItem {
  productId: Product;
  quantity: number;
}

interface UserCart {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

interface CartOptions {
  size?: string;
  color?: string;
}

interface ValidationError {
  error: string;
  productId?: string;
  productName?: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const { user, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [userCart, setUserCart] = useState<UserCart | null>(null);

  // Load appropriate cart on mount and auth changes
  useEffect(() => {
    if (user && token) {
      // Check if there's a guest cart to merge first
      if (CartService.hasGuestCart()) {
        handleAutoMerge();
      } else {
        loadUserCart();
      }
    } else {
      loadGuestCart();
    }
  }, [user, token]);

  const handleAutoMerge = async () => {
    setIsLoading(true);
    try {
      await CartService.mergeGuestCartWithUser();
      await loadUserCart(); // Load merged cart
      toast.success('Your cart has been restored!');
    } catch (error: unknown) {
      console.error('Error auto-merging cart:', error);
      // If merge fails, still load user cart
      await loadUserCart();
    } finally {
      setIsLoading(false);
    }
  };

  const loadGuestCart = () => {
    try {
      const guestCart = CartService.getGuestCart();
      // Convert guest cart to Redux format
      dispatch(clearCart());
      guestCart.items.forEach(item => {
        if (item.product) {
          dispatch(addToCart({ product: item.product, quantity: item.quantity }));
        }
      });
    } catch (error) {
      console.error('Error loading guest cart:', error);
    }
  };

  const loadUserCart = async () => {
    setIsLoading(true);
    try {
      const response = await CartService.getUserCart();
      setUserCart(response);
      
      // Convert user cart to Redux format for UI consistency
      dispatch(clearCart());
      if (response.items) {
        response.items.forEach((item: CartItem) => {
          dispatch(addToCart({ 
            product: item.productId, 
            quantity: item.quantity 
          }));
        });
      }
    } catch (error) {
      console.error('Error loading user cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (product: Product, quantity: number = 1, options: CartOptions = {}) => {
    if (product.stock <= 0) {
      toast.error('Product is out of stock');
      return false;
    }

    setIsLoading(true);
    try {
      if (user && token) {
        // Authenticated user - use API
        await CartService.addToUserCart(product._id, quantity, options);
        await loadUserCart(); // Refresh cart
        toast.success(`${product.name} added to cart!`);
      } else {
        // Guest user - use localStorage
        CartService.addToGuestCart(product, quantity, options);
        dispatch(addToCart({ product, quantity }));
        toast.success(`${product.name} added to cart!`);
      }
      return true;
    } catch (error: unknown) {
      console.error('Error adding to cart:', error);
      const message = error instanceof Error ? error.message : 'Failed to add item to cart';
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromCart = async (productId: string, productName?: string, options: CartOptions = {}) => {
    setIsLoading(true);
    try {
      if (user && token) {
        // Authenticated user - use API
        await CartService.removeFromUserCart(productId, options);
        await loadUserCart(); // Refresh cart
      } else {
        // Guest user - use localStorage
        CartService.removeFromGuestCart(productId, options);
        dispatch(removeFromCart(productId));
      }
      
      if (productName) {
        toast.success(`${productName} removed from cart`);
      }
    } catch (error: unknown) {
      console.error('Error removing from cart:', error);
      const message = error instanceof Error ? error.message : 'Failed to remove item';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId: string, quantity: number, options: CartOptions = {}) => {
    if (quantity <= 0) {
      return handleRemoveFromCart(productId, undefined, options);
    }

    setIsLoading(true);
    try {
      if (user && token) {
        // Authenticated user - use API
        await CartService.updateUserCartItem(productId, quantity, options);
        await loadUserCart(); // Refresh cart
      } else {
        // Guest user - use localStorage
        CartService.updateGuestCartItem(productId, quantity, options);
        dispatch(updateQuantity({ productId, quantity }));
      }
    } catch (error: unknown) {
      console.error('Error updating cart:', error);
      const message = error instanceof Error ? error.message : 'Failed to update quantity';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearCart = async () => {
    setIsLoading(true);
    try {
      if (user && token) {
        // Clear user cart via API
        await cartAPI.clearCart();
        setUserCart(null);
      } else {
        // Clear guest cart
        CartService.clearGuestCart();
      }
      
      dispatch(clearCart());
      toast.success('Cart cleared');
    } catch (error: unknown) {
      console.error('Error clearing cart:', error);
      const message = error instanceof Error ? error.message : 'Failed to clear cart';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const mergeGuestCart = async () => {
    if (!user || !CartService.hasGuestCart()) {
      return;
    }

    return handleAutoMerge();
  };

  const validateCart = async () => {
    if (!user) {
      return { isValid: true, errors: [] };
    }

    try {
      const validation = await CartService.validateUserCart();
      return validation;
    } catch (error: unknown) {
      console.error('Error validating cart:', error);
      return { isValid: false, errors: [{ error: 'Failed to validate cart' }] };
    }
  };

  const proceedToCheckout = async () => {
    if (!user) {
      // Redirect to login for guest users
      return { requiresLogin: true };
    }

    try {
      setIsLoading(true);
      const result = await CartService.proceedToCheckout();
      return result;
    } catch (error: unknown) {
      console.error('Error proceeding to checkout:', error);
      const message = error instanceof Error ? error.message : 'Failed to proceed to checkout';
      toast.error(message);
      return { 
        requiresLogin: false, 
        isValid: false, 
        errors: [{ error: message }] 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const isInCart = (productId: string) => {
    return cart.items.some(item => item.product._id === productId);
  };

  const getItemQuantity = (productId: string) => {
    const item = cart.items.find(item => item.product._id === productId);
    return item ? item.quantity : 0;
  };

  return {
    ...cart,
    userCart,
    isLoading,
    isAuthenticated: !!user,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    mergeGuestCart,
    validateCart,
    proceedToCheckout,
    isInCart,
    getItemQuantity,
    hasGuestCart: CartService.hasGuestCart,
  };
};