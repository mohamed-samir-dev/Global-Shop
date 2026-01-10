'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { ProductInfoProps } from '../types';
import { getProductPricing } from '../utils';
import { StarRating } from './StarRating';

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const { isDarkMode } = useTheme();
  const { currentPrice, originalPrice, hasDiscount } = getProductPricing(product);

  return (
    <>
      {/* Product Name */}
      <Link href={`/products/${product._id}`}>
        <h3 className={`font-semibold text-base mb-2 line-clamp-2 transition-colors ${
          isDarkMode ? 'text-white hover:text-gray-300' : 'text-[#272525] hover:text-gray-700'
        }`}>
          {product.name}
        </h3>
      </Link>
      
      {/* Rating */}
      <StarRating />

      {/* Price */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`text-xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          ${currentPrice?.toFixed(2) || '0.00'}
        </span>
        {hasDiscount && originalPrice && originalPrice > (currentPrice || 0) && (
          <span className={`text-sm line-through ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>
    </>
  );
};