import { useState, useEffect } from 'react';
import { productAPI } from '@/lib/api';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import toast from 'react-hot-toast';

export const useProductDetail = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  const fetchProduct = async (id: string) => {
    try {
      const response = await productAPI.getProduct(id);
      setProduct(response.data);
    } catch {
      toast.error('Failed to fetch product details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      console.log('Adding to cart:', product.name, 'Quantity:', selectedQuantity);
      // Add the product to cart with the selected quantity
      const success = addToCart(product, selectedQuantity);
      console.log('Add to cart result:', success);
      // The toast message is handled by the useCart hook
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const updateQuantity = (newQuantity: number) => {
    const maxStock = product?.stock ?? product?.countInStock ?? 0;
    setSelectedQuantity(Math.max(1, Math.min(maxStock, newQuantity)));
  };

  return {
    product,
    isLoading,
    selectedQuantity,
    isWishlisted,
    activeImageIndex,
    setActiveImageIndex,
    handleAddToCart,
    handleWishlistToggle,
    updateQuantity,
  };
};