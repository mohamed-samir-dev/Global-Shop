'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { ProductInfoProps } from '../types';
import { getProductPricing } from '../utils';
import { StarRating } from './StarRating';

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();
  const { currentPrice, originalPrice, hasDiscount } = getProductPricing(product);

  return (
    <>
      {/* Product Name */}
      <Link href={`/products/${product._id}`}>
        <h3 className={`font-bold sm:font-semibold text-left text-xs sm:text-base mb-1.5 sm:mb-3 line-clamp-2 leading-tight transition-colors ${
          isDarkMode ? 'text-white hover:text-gray-300' : 'text-[#272525] hover:text-gray-700'
        }`}>
          {isArabic && product.nameAr ? product.nameAr : product.name}
        </h3>
      </Link>
      
      {/* Rating */}
      <div className="mb-1.5 sm:mb-3">
        <StarRating />
      </div>

      {/* Price */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        <span className={`text-sm sm:text-xl font-extrabold sm:font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {isArabic ? `${currentPrice?.toFixed(2) || '0.00'} ج.م` : `${currentPrice?.toFixed(2) || '0.00'} EGP`}
        </span>
        {hasDiscount && originalPrice && originalPrice > (currentPrice || 0) && (
          <span className={`text-xs sm:text-sm line-through ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {isArabic ? `${originalPrice.toFixed(2)} ج.م` : `${originalPrice.toFixed(2)} EGP`}
          </span>
        )}
      </div>
    </>
  );
};