import { useState } from 'react';
import { Product } from '@/types';

export const useProductDetails = (product: Product) => {
  const [selectedImage, setSelectedImage] = useState(product.mainImage);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const finalPrice = product.finalPrice || product.price || product.basePrice;
  const hasDiscount = !!(product.discount && product.discount.value > 0);

  const updateQuantity = (newQuantity: number) => {
    setQuantity(Math.max(1, Math.min(product.stock, newQuantity)));
  };

  return {
    selectedImage,
    setSelectedImage,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    quantity,
    setQuantity,
    updateQuantity,
    finalPrice,
    hasDiscount,
  };
};