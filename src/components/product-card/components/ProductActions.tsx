'use client';

import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { ProductActionsProps } from '../types';

export const ProductActions = ({ product, isOutOfStock, onAddToCart }: ProductActionsProps) => {
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();
  
  return (
    <div className={`flex gap-1.5 sm:gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
      <button
        onClick={onAddToCart}
        disabled={isOutOfStock}
        className="flex-1 bg-[#B39E7A] cursor-pointer text-white py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-bold sm:font-medium hover:bg-[#846F4D] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-1 sm:gap-2 transition-colors min-h-[36px] sm:min-h-[44px]"
      >
        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden xs:inline">{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
        <span className="xs:hidden">{isOutOfStock ? 'Out' : 'Add'}</span>
      </button>
      
      <Link
        href={`/products/${product._id}`}
        className={`px-2 sm:px-4 py-2 sm:py-3 border cursor-pointer rounded-lg text-xs sm:text-sm flex items-center justify-center transition-colors min-h-[36px] sm:min-h-[44px] ${
          isDarkMode
            ? 'border-gray-600 text-gray-300 hover:border-[#B39E7A] hover:text-[#B39E7A]'
            : 'border-gray-300 text-gray-700 hover:border-[#B39E7A] hover:text-[#B39E7A]'
        }`}
      >
        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
      </Link>
    </div>
  );
};