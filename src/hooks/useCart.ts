import { useAppDispatch, useAppSelector } from './redux';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import { Product } from '@/types';
import toast from 'react-hot-toast';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    console.log('useCart - Adding to cart:', product.name, 'Quantity:', quantity, 'Stock:', product.stock);
    if (product.stock > 0) {
      dispatch(addToCart({ product, quantity }));
      console.log('useCart - Dispatched addToCart action');
      if (quantity === 1) {
        toast.success(`${product.name} added to cart!`);
      } else {
        toast.success(`${quantity} ${product.name}(s) added to cart!`);
      }
      return true;
    } else {
      console.log('useCart - Product out of stock');
      toast.error('Product is out of stock');
      return false;
    }
  };

  const handleRemoveFromCart = (productId: string, productName?: string) => {
    dispatch(removeFromCart(productId));
    if (productName) {
      toast.success(`${productName} removed from cart`);
    }
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
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
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    isInCart,
    getItemQuantity,
  };
};