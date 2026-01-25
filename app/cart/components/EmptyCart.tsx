'use client';

import { ShoppingCartIcon, TagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface EmptyCartProps {
  isDarkMode: boolean;
  isArabic: boolean;
}

export default function EmptyCart({ isDarkMode, isArabic }: EmptyCartProps) {
  return (
    <div className={`rounded-2xl border-2 border-dashed p-6 sm:p-8 md:p-12 lg:p-16 text-center ${
      isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-300'
    }`}>
      <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 md:mb-8 rounded-full flex items-center justify-center relative ${
        isDarkMode ? 'bg-slate-700' : 'bg-white shadow-lg'
      }`}>
        <ShoppingCartIcon className={`h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 ${
          isDarkMode ? 'text-slate-400' : 'text-slate-500'
        }`} />
        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">0</span>
        </div>
      </div>
      <h2 className={`text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 px-4 ${
        isDarkMode ? 'text-white' : 'text-slate-900'
      }`}>
        {isArabic ? 'سلة التسوق فارغة' : 'Your cart is empty'}
      </h2>
      <p className={`mb-6 sm:mb-8 text-sm sm:text-base max-w-md mx-auto px-4 ${
        isDarkMode ? 'text-slate-400' : 'text-slate-600'
      }`}>
        {isArabic 
          ? 'ابدأ التسوق واكتشف منتجاتنا الرائعة واستمتع بتجربة تسوق فريدة'
          : 'Discover amazing products, exclusive deals, and enjoy a seamless shopping experience'
        }
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 max-w-md mx-auto">
        <Link
          href="/products"
          className={`inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all hover:scale-105 shadow-lg text-sm sm:text-base w-full sm:w-auto ${isArabic ? 'flex-row-reverse' : ''}`}
        >
          <ShoppingCartIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isArabic ? 'ml-2' : 'mr-2'}`} />
          {isArabic ? 'ابدأ التسوق' : 'Start Shopping'}
        </Link>
        <Link
          href="/categories"
          className={`inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 font-medium rounded-xl transition-all hover:scale-105 text-sm sm:text-base w-full sm:w-auto ${isArabic ? 'flex-row-reverse' : ''} ${
            isDarkMode 
              ? 'border-slate-600 text-slate-300 hover:bg-slate-700'
              : 'border-slate-300 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <TagIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isArabic ? 'ml-2' : 'mr-2'}`} />
          {isArabic ? 'تصفح الفئات' : 'Browse Categories'}
        </Link>
      </div>
    </div>
  );
}
