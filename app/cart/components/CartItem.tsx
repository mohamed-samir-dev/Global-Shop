'use client';

import { TrashIcon, MinusIcon, PlusIcon, HeartIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '@/store/slices/cartSlice';

interface CartItemProps {
  item: CartItemType;
  isDarkMode: boolean;
  isArabic: boolean;
  onRemove: (productId: string, productName: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export default function CartItem({ item, isDarkMode, isArabic, onRemove, onUpdateQuantity }: CartItemProps) {
  const price = Number(item.product.finalPrice || item.product.basePrice) || 0;
  const originalPrice = item.product.basePrice;
  const hasDiscount = originalPrice > price;

  return (
    <div className={`group p-4 sm:p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
      isDarkMode ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-slate-200/50'
    }`}>
      <div className={`flex flex-col sm:flex-row gap-4 sm:gap-5 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
        <div className="relative w-full sm:w-24 md:w-28 h-32 sm:h-24 md:h-28 rounded-2xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
          <Image
            src={item.product.mainImage}
            alt={item.product.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {hasDiscount && (
            <div className={`absolute top-2 ${isArabic ? 'right-2' : 'left-2'} bg-linear-to-r from-red-500 to-red-600 text-white text-xs px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg font-semibold shadow-lg`}>
              -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
            </div>
          )}
          {item.product.stock < 10 && (
            <div className={`absolute bottom-2 ${isArabic ? 'left-2' : 'right-2'} bg-orange-500 text-white text-xs px-2 py-1 rounded-md font-medium`}>
              {isArabic ? `${item.product.stock} متبقي` : `${item.product.stock} left`}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className={`flex justify-between items-start mb-2 sm:mb-3 gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className="flex-1 min-w-0">
              <Link href={`/products/${item.product._id}`} className="block group-hover:text-blue-600 transition-colors">
                <h3 className={`font-semibold text-base sm:text-lg line-clamp-2 mb-2 sm:mb-3 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                } ${isArabic ? 'text-right' : 'text-left'}`}>
                  {isArabic && item.product.nameAr ? item.product.nameAr : item.product.name}
                </h3>
              </Link>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <span className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {isArabic ? `${price.toFixed(2)} ج.م` : `${price.toFixed(2)} EGP`}
                </span>
                {hasDiscount && (
                  <>
                    <span className={`text-sm sm:text-base line-through ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      {isArabic ? `${originalPrice.toFixed(2)} ج.م` : `${originalPrice.toFixed(2)} EGP`}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      {isArabic ? `وفر ${(originalPrice - price).toFixed(2)} ج.م` : `Save ${(originalPrice - price).toFixed(2)} EGP`}
                    </span>
                  </>
                )}
              </div>
              <div className={`flex items-center gap-2 text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <ShieldCheckIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{isArabic ? 'ضمان الجودة' : 'Quality Guaranteed'}</span>
              </div>
            </div>
            
            <div className={`flex sm:flex-row flex-col items-center gap-2 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
              <button
                className={`p-2 sm:p-2.5 rounded-xl transition-all duration-200 hover:scale-110 ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-pink-400 hover:bg-pink-900/20'
                    : 'text-slate-400 hover:text-pink-500 hover:bg-pink-50'
                }`}
                title={isArabic ? 'إضافة للمفضلة' : 'Add to Wishlist'}
              >
                <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => onRemove(item.product._id, item.product.name)}
                className={`p-2 sm:p-2.5 rounded-xl transition-all duration-200 hover:scale-110 ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-red-400 hover:bg-red-900/20'
                    : 'text-slate-400 hover:text-red-500 hover:bg-red-50'
                }`}
                title={isArabic ? 'حذف من السلة' : 'Remove from Cart'}
              >
                <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
          
          <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 pt-3 sm:pt-4 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-slate-200'
          } ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-3 sm:gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <span className={`text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {isArabic ? 'الكمية' : 'Qty'}
              </span>
              <div className={`flex items-center border-2 rounded-xl overflow-hidden ${
                isDarkMode ? 'border-slate-600 bg-slate-700' : 'border-slate-300 bg-white'
              }`}>
                <button
                  onClick={() => onUpdateQuantity(item.product._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className={`p-2 sm:p-3 transition-all disabled:opacity-50 hover:scale-110 ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-white hover:bg-slate-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <MinusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <div className={`px-3 sm:px-4 py-2 sm:py-3 text-center min-w-10 sm:min-w-14 font-bold text-base sm:text-lg border-x ${
                  isDarkMode ? 'text-white border-slate-600' : 'text-slate-900 border-slate-300'
                }`}>
                  {item.quantity}
                </div>
                <button
                  onClick={() => onUpdateQuantity(item.product._id, item.quantity + 1)}
                  disabled={item.quantity >= item.product.stock}
                  className={`p-2 sm:p-3 transition-all disabled:opacity-50 hover:scale-110 ${
                    isDarkMode 
                      ? 'text-slate-300 hover:text-white hover:bg-slate-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
            
            <div className={`text-right ${isArabic ? 'text-left' : 'text-right'}`}>
              <div className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {isArabic ? `${(price * item.quantity).toFixed(2)} ج.م` : `${(price * item.quantity).toFixed(2)} EGP`}
              </div>
              <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {isArabic ? `${price.toFixed(2)} ج.م للواحد` : `${price.toFixed(2)} EGP each`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
