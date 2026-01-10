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
    <div className={`absolute bottom-4 left-4 right-4 flex gap-2 ${isArabic ? 'flex-row-reverse  ' : ''}`}>
      <button
        onClick={onAddToCart}
        disabled={isOutOfStock}
        className="flex-1 bg-[#B39E7A] cursor-pointer text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-[#846F4D] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
      >
        <ShoppingCart className="w-4 h-4" />
        <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
      </button>
      
      <Link
        href={`/products/${product._id}`}
        className={`px-4 py-2.5 border cursor-pointer rounded-lg text-sm flex items-center justify-center transition-colors ${
          isDarkMode
            ? 'border-gray-600 text-gray-300 hover:border-[#B39E7A] hover:text-[#B39E7A]'
            : 'border-gray-300 text-gray-700 hover:border-[#B39E7A] hover:text-[#B39E7A]'
        }`}
      >
        <Eye className="w-4 h-4" />
      </Link>
    </div>
  );
};