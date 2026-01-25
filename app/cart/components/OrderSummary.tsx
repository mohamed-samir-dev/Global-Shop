'use client';

import { CreditCardIcon, TruckIcon, ShieldCheckIcon, HeartIcon, TagIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface OrderSummaryProps {
  isDarkMode: boolean;
  isArabic: boolean;
  itemCount: number;
  itemsLength: number;
  subtotal: number;
  shipping: number;
  tax: number;
  finalTotal: number;
  deliveryDateStr: string;
  user: unknown;
  onClearCart: () => void;
}

export default function OrderSummary({
  isDarkMode,
  isArabic,
  itemCount,
  itemsLength,
  subtotal,
  shipping,
  tax,
  finalTotal,
  deliveryDateStr,
  user,
  onClearCart
}: OrderSummaryProps) {
  return (
    <div className={`rounded-2xl border-2 p-4 sm:p-6 md:p-8 h-fit lg:sticky lg:top-6 shadow-xl ${
      isDarkMode ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' : 'bg-white border-slate-200 shadow-slate-200/50'
    }`}>
      <div className={`flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div className={`p-2 sm:p-3 rounded-xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
          <CreditCardIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
        </div>
        <h2 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {isArabic ? 'ملخص الطلب' : 'Order Summary'}
        </h2>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        <div className={`flex justify-between items-center pb-2 sm:pb-3 border-b ${
          isDarkMode ? 'border-slate-700' : 'border-slate-200'
        } ${isArabic ? 'flex-row-reverse' : ''}`}>
          <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {isArabic ? 'عدد المنتجات' : 'Items'} ({itemCount})
          </span>
          <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {isArabic ? `${itemsLength} ${itemsLength === 1 ? 'منتج' : 'منتجات'}` : `${itemsLength} ${itemsLength === 1 ? 'product' : 'products'}`}
          </span>
        </div>
        
        <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
          <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {isArabic ? 'المجموع الفرعي' : 'Subtotal'}
          </span>
          <span className={`text-sm sm:text-base font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            ${subtotal.toFixed(2)}
          </span>
        </div>
        
        <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {isArabic ? 'الشحن' : 'Shipping'}
            </span>
            {shipping === 0 && (
              <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium">
                {isArabic ? 'مؤهل' : 'Qualified'}
              </span>
            )}
          </div>
          <span className={`text-sm sm:text-base font-medium ${
            shipping === 0 ? 'text-emerald-600' : (isDarkMode ? 'text-white' : 'text-slate-900')
          }`}>
            {shipping === 0 ? (isArabic ? 'مجاني' : 'Free') : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
          <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {isArabic ? 'الضريبة' : 'Tax'} (8%)
          </span>
          <span className={`text-sm sm:text-base font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            ${tax.toFixed(2)}
          </span>
        </div>
        
        <div className={`flex justify-between items-center py-2 sm:py-3 px-3 sm:px-4 rounded-lg ${isArabic ? 'flex-row-reverse' : ''} ${
          isDarkMode ? 'bg-slate-700/50' : 'bg-blue-50'
        }`}>
          <div className={`flex items-center gap-1.5 sm:gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <TruckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
            <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {isArabic ? 'التسليم المتوقع' : 'Est. Delivery'}
            </span>
          </div>
          <span className={`text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {deliveryDateStr}
          </span>
        </div>
        
        <div className={`border-t pt-3 sm:pt-4 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
          <div className={`flex justify-between items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span className={`text-base sm:text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {isArabic ? 'المجموع' : 'Total'}
            </span>
            <span className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              ${finalTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
        <div className={`p-3 sm:p-4 rounded-lg border-2 border-dashed ${
          isDarkMode ? 'border-slate-600 bg-slate-700/30' : 'border-slate-300 bg-slate-50'
        }`}>
          <div className={`flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <TagIcon className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
            <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {isArabic ? 'كود الخصم' : 'Promo Code'}
            </span>
          </div>
          <div className={`flex flex-col sm:flex-row gap-2 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
            <input
              type="text"
              placeholder={isArabic ? 'أدخل كود الخصم' : 'Enter promo code'}
              className={`flex-1 w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg border ${isArabic ? 'text-right' : 'text-left'} ${
                isDarkMode 
                  ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-500 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap">
              {isArabic ? 'تطبيق' : 'Apply'}
            </button>
          </div>
        </div>
        
        {user ? (
          <Link 
            href="/checkout"
            className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 sm:gap-3"
          >
            <LockClosedIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            {isArabic ? 'إتمام الطلب' : 'Proceed to Checkout'}
          </Link>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            <div className={`flex items-center justify-center gap-2 p-3 sm:p-4 rounded-xl border-2 border-dashed ${isArabic ? 'flex-row-reverse' : ''} ${
              isDarkMode ? 'border-slate-600 bg-slate-700/30 text-slate-300' : 'border-slate-300 bg-slate-50 text-slate-600'
            }`}>
              <LockClosedIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium">
                {isArabic ? 'يجب تسجيل الدخول للمتابعة' : 'Login required to checkout'}
              </span>
            </div>
            <Link 
              href="/login"
              className={`w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}
            >
              <LockClosedIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              {isArabic ? 'تسجيل الدخول للمتابعة' : 'Login to Continue'}
            </Link>
          </div>
        )}
        
        <button
          onClick={onClearCart}
          className={`w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl transition-all duration-300 font-semibold hover:scale-105 text-sm sm:text-base ${
            isDarkMode 
              ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
              : 'border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400'
          }`}
        >
          {isArabic ? 'إفراغ السلة' : 'Clear Cart'}
        </button>
        
        <div className={`space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
          <div className={`flex items-center gap-2 sm:gap-3 text-xs sm:text-sm ${isArabic ? 'flex-row-reverse' : ''} ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            <ShieldCheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
            <span>{isArabic ? 'دفع آمن ومضمون' : 'Secure & Safe Payment'}</span>
          </div>
          <div className={`flex items-center gap-2 sm:gap-3 text-xs sm:text-sm ${isArabic ? 'flex-row-reverse' : ''} ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            <TruckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <span>{isArabic ? 'توصيل سريع ومجاني' : 'Fast & Free Delivery'}</span>
          </div>
          <div className={`flex items-center gap-2 sm:gap-3 text-xs sm:text-sm ${isArabic ? 'flex-row-reverse' : ''} ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
            <span>{isArabic ? 'ضمان الإرجاع لمدة 30 يوم' : '30-Day Return Guarantee'}</span>
          </div>
          
          {subtotal < 100 && (
            <div className={`mt-3 sm:mt-4 p-2.5 sm:p-3 rounded-lg bg-linear-to-r from-orange-500/10 to-red-500/10 border ${
              isDarkMode ? 'border-orange-500/20' : 'border-orange-200'
            }`}>
              <div className={`flex items-center gap-1.5 sm:gap-2 mb-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <TagIcon className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                <span className={`text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  {isArabic ? 'عرض خاص!' : 'Special Offer!'}
                </span>
              </div>
              <p className={`text-xs ${isArabic ? 'text-right' : 'text-left'} ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {isArabic 
                  ? `أضف $${(100 - subtotal).toFixed(2)} للحصول على شحن مجاني`
                  : `Add $${(100 - subtotal).toFixed(2)} more for free shipping`
                }
              </p>
            </div>
          )}
          
          <div className={`text-center pt-3 sm:pt-4 ${isDarkMode ? 'border-t border-slate-700' : 'border-t border-slate-200'}`}>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {isArabic ? 'شحن مجاني للطلبات أكثر من $100' : 'Free shipping on orders over $100'}
            </p>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              {isArabic ? 'الأسعار شاملة الضريبة' : 'All prices include applicable taxes'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
