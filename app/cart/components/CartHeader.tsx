'use client';

import { ArrowLeftIcon, TruckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface CartHeaderProps {
  isDarkMode: boolean;
  isArabic: boolean;
  itemCount: number;
  total: number;
  subtotal: number;
}

export default function CartHeader({ isDarkMode, isArabic, itemCount, total, subtotal }: CartHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Link href="/products" className={`flex items-center gap-2 text-xs sm:text-sm transition-colors ${
          isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
        }`}>
          <ArrowLeftIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          {isArabic ? 'العودة للتسوق' : 'Continue Shopping'}
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div className={isArabic ? 'w-full sm:w-auto flex flex-col items-end' : ''}>
          <h1 className={`text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          } ${isArabic ? 'text-right w-full' : 'text-left'}`}>
            {isArabic ? 'سلة التسوق' : 'Shopping Cart'}
          </h1>
          {itemCount > 0 && (
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} ${
              isArabic ? 'text-right w-full' : 'text-left'
            }`}>
              {isArabic 
                ? `${itemCount} ${itemCount === 1 ? 'منتج' : 'منتجات'} • $${total.toFixed(2)} الإجمالي`
                : `${itemCount} ${itemCount === 1 ? 'item' : 'items'} • $${total.toFixed(2)} total`
              }
            </p>
          )}
        </div>
        {itemCount > 0 && (
          <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm ${isArabic ? 'flex-row-reverse' : ''} ${
            isDarkMode ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
          }`}>
            <TruckIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-medium">
              {subtotal >= 100 
                ? (isArabic ? 'شحن مجاني' : 'Free Shipping') 
                : (isArabic ? `متبقي $${(100 - subtotal).toFixed(2)}` : `$${(100 - subtotal).toFixed(2)} away`)
              }
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
