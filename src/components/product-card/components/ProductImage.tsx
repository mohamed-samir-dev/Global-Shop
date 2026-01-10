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
    <div className={`w-full aspect-square sm:h-48 border rounded-lg mb-3 relative overflow-hidden ${
      isDarkMode 
        ? 'border-gray-600 bg-gray-700' 
        : 'border-gray-200 bg-gray-50'
    }`}>
     
      {isValid ? (
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 384px) 100vw, 384px"
        />
      ) : (
        <div className={`w-full h-full flex items-center justify-center text-2xl ${
          isDarkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>
          📦
        </div>
      )}
    </div>
  );
};