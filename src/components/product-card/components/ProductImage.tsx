'use client';

import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { ProductImageProps } from '../types';
import { getProductImageUrl, isValidImageUrl } from '../utils';

export const ProductImage = ({ product }: ProductImageProps) => {
  const { isDarkMode } = useTheme();
  const imageUrl = getProductImageUrl(product);
  const isValid = isValidImageUrl(imageUrl);

  return (
    <div className={`w-full aspect-square border rounded-lg mb-2 sm:mb-4 relative overflow-hidden ${
      isDarkMode 
        ? 'border-gray-600 bg-gray-700' 
        : 'border-gray-200 bg-gray-50'
    }`}>
     
      {isValid ? (
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
        />
      ) : (
        <div className={`w-full h-full flex items-center justify-center text-xl sm:text-3xl ${
          isDarkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>
          📦
        </div>
      )}
    </div>
  );
};