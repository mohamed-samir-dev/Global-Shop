'use client';

import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/src/context/AuthContext';
import CheckoutButton from '@/src/components/checkout/CheckoutButton';
import { 
  ShoppingCartIcon, 
  TrashIcon, 
  MinusIcon, 
  PlusIcon,
  HeartIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  ArrowLeftIcon,
  TagIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();
  const { items, total, itemCount, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId, productName);
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleClearCart = () => {
    clearCart();
  };

  // Calculate totals and savings
  const subtotal = total;
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + shipping + tax;
  
  // Calculate estimated delivery date
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + (shipping === 0 ? 2 : 5));
  
  // Format delivery date
  const deliveryDateStr = estimatedDelivery.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className={`min-h-screen py-6 ${
      isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
    }`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with breadcrumb */}
        <div className="mb-6 sm:mb-8">
          <div className={`flex items-center gap-2 mb-3 sm:mb-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <Link href="/products" className={`flex items-center gap-2 text-xs sm:text-sm transition-colors ${
              isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}>
              <ArrowLeftIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              {isArabic ? 'العودة للتسوق' : 'Continue Shopping'}
            </Link>
          </div>
          <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              } ${isArabic ? 'text-right font-arabic' : 'text-left'}`}>
                {isArabic ? 'سلة التسوق' : 'Shopping Cart'}
              </h1>
              {itemCount > 0 && (
                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} ${
                  isArabic ? 'text-right' : 'text-left'
                }`}>
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} • ${total.toFixed(2)} total
                </p>
              )}
            </div>
            {itemCount > 0 && (
              <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm ${
                isDarkMode ? 'bg-emerald-900/20 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
              }`}>
                <TruckIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-medium">
                  {subtotal >= 100 ? (isArabic ? 'شحن مجاني' : 'Free Shipping') : `$${(100 - subtotal).toFixed(2)} away`}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {items.length === 0 ? (
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
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all hover:scale-105 shadow-lg text-sm sm:text-base w-full sm:w-auto"
              >
                <ShoppingCartIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {isArabic ? 'ابدأ التسوق' : 'Start Shopping'}
              </Link>
              <Link
                href="/categories"
                className={`inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 font-medium rounded-xl transition-all hover:scale-105 text-sm sm:text-base w-full sm:w-auto ${
                  isDarkMode 
                    ? 'border-slate-600 text-slate-300 hover:bg-slate-700'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <TagIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {isArabic ? 'تصفح الفئات' : 'Browse Categories'}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
                {items.map((item) => {
                  const price = Number(item.product.finalPrice || item.product.basePrice) || 0;
                  const originalPrice = item.product.basePrice;
                  const hasDiscount = originalPrice > price;
                  
                  return (
                    <div key={item.product._id} className={`group p-4 sm:p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      isDarkMode ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-slate-200/50'
                    }`}>
                      <div className={`flex flex-col sm:flex-row gap-4 sm:gap-5 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
                        {/* Product Image */}
                        <div className="relative w-full sm:w-24 md:w-28 h-32 sm:h-24 md:h-28 rounded-2xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <Image
                            src={item.product.mainImage}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                          <div className={`absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                          {hasDiscount && (
                            <div className="absolute top-2 left-2 bg-linear-to-r from-red-500 to-red-600 text-white text-xs px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg font-semibold shadow-lg">
                              -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
                            </div>
                          )}
                          {item.product.stock < 10 && (
                            <div className="absolute bottom-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                              {item.product.stock} left
                            </div>
                          )}
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className={`flex justify-between items-start mb-2 sm:mb-3 gap-2 ${
                            isArabic ? 'flex-row-reverse' : ''
                          }`}>
                            <div className="flex-1 min-w-0">
                              <Link href={`/products/${item.product._id}`} className="block group-hover:text-blue-600 transition-colors">
                                <h3 className={`font-semibold text-base sm:text-lg line-clamp-2 mb-2 sm:mb-3 ${
                                  isDarkMode ? 'text-white' : 'text-slate-900'
                                } ${isArabic ? 'text-right' : 'text-left'}`}>
                                  {item.product.name}
                                </h3>
                              </Link>
                              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                                <span className={`text-lg sm:text-xl font-bold ${
                                  isDarkMode ? 'text-white' : 'text-slate-900'
                                }`}>
                                  ${price.toFixed(2)}
                                </span>
                                {hasDiscount && (
                                  <span className={`text-sm sm:text-base line-through ${
                                    isDarkMode ? 'text-slate-500' : 'text-slate-400'
                                  }`}>
                                    ${originalPrice.toFixed(2)}
                                  </span>
                                )}
                                {hasDiscount && (
                                  <span className="text-xs sm:text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                    Save ${(originalPrice - price).toFixed(2)}
                                  </span>
                                )}
                              </div>
                              <div className={`flex items-center gap-2 text-xs sm:text-sm ${
                                isDarkMode ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                <ShieldCheckIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>{isArabic ? 'ضمان الجودة' : 'Quality Guaranteed'}</span>
                              </div>
                            </div>
                            
                            <div className="flex sm:flex-row flex-col items-center gap-2">
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
                                onClick={() => handleRemoveItem(item.product._id, item.product.name)}
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
                          
                          {/* Quantity Controls */}
                          <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 pt-3 sm:pt-4 border-t ${
                            isDarkMode ? 'border-slate-700' : 'border-slate-200'
                          } ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
                            <div className={`flex items-center gap-3 sm:gap-4 ${
                              isArabic ? 'flex-row-reverse' : ''
                            }`}>
                              <span className={`text-xs sm:text-sm font-semibold ${
                                isDarkMode ? 'text-slate-300' : 'text-slate-700'
                              }`}>
                                {isArabic ? 'الكمية' : 'Qty'}
                              </span>
                              <div className={`flex items-center border-2 rounded-xl overflow-hidden ${
                                isDarkMode ? 'border-slate-600 bg-slate-700' : 'border-slate-300 bg-white'
                              }`}>
                                <button
                                  onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
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
                                  onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
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
                            
                            <div className="text-right">
                              <div className={`text-xl sm:text-2xl font-bold ${
                                isDarkMode ? 'text-white' : 'text-slate-900'
                              }`}>
                                ${(price * item.quantity).toFixed(2)}
                              </div>
                              <div className={`text-xs sm:text-sm ${
                                isDarkMode ? 'text-slate-400' : 'text-slate-500'
                              }`}>
                                ${price.toFixed(2)} each
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {/* Order Summary */}
            <div className={`rounded-2xl border-2 p-4 sm:p-6 md:p-8 h-fit lg:sticky lg:top-6 shadow-xl ${
              isDarkMode ? 'bg-slate-800 border-slate-700 shadow-slate-900/50' : 'bg-white border-slate-200 shadow-slate-200/50'
            }`}>
              <div className={`flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 ${
                isArabic ? 'flex-row-reverse' : ''
              }`}>
                <div className={`p-2 sm:p-3 rounded-xl ${
                  isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
                }`}>
                  <CreditCardIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`} />
                </div>
                <h2 className={`text-lg sm:text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {isArabic ? 'ملخص الطلب' : 'Order Summary'}
                </h2>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {/* Items Count */}
                <div className={`flex justify-between items-center pb-2 sm:pb-3 border-b ${
                  isDarkMode ? 'border-slate-700' : 'border-slate-200'
                } ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-xs sm:text-sm font-medium ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {isArabic ? 'عدد المنتجات' : 'Items'} ({itemCount})
                  </span>
                  <span className={`text-xs sm:text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {items.length} {items.length === 1 ? 'product' : 'products'}
                  </span>
                </div>
                
                <div className={`flex justify-between items-center ${
                  isArabic ? 'flex-row-reverse' : ''
                }`}>
                  <span className={`text-xs sm:text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {isArabic ? 'المجموع الفرعي' : 'Subtotal'}
                  </span>
                  <span className={`text-sm sm:text-base font-medium ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                
                
                <div className={`flex justify-between items-center ${
                  isArabic ? 'flex-row-reverse' : ''
                }`}>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className={`text-xs sm:text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
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
                
                <div className={`flex justify-between items-center ${
                  isArabic ? 'flex-row-reverse' : ''
                }`}>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className={`text-xs sm:text-sm ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {isArabic ? 'الضريبة' : 'Tax'} (8%)
                    </span>
                  </div>
                  <span className={`text-sm sm:text-base font-medium ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    ${tax.toFixed(2)}
                  </span>
                </div>
                
                {/* Estimated Delivery */}
                <div className={`flex justify-between items-center py-2 sm:py-3 px-3 sm:px-4 rounded-lg ${
                  isDarkMode ? 'bg-slate-700/50' : 'bg-blue-50'
                } ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <TruckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                    <span className={`text-xs sm:text-sm font-medium ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {isArabic ? 'التسليم المتوقع' : 'Est. Delivery'}
                    </span>
                  </div>
                  <span className={`text-xs sm:text-sm font-semibold ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {deliveryDateStr}
                  </span>
                </div>
                
                <div className={`border-t pt-3 sm:pt-4 ${
                  isDarkMode ? 'border-slate-700' : 'border-slate-200'
                }`}>
                  <div className={`flex justify-between items-center ${
                    isArabic ? 'flex-row-reverse' : ''
                  }`}>
                    <span className={`text-base sm:text-lg font-semibold ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {isArabic ? 'المجموع' : 'Total'}
                    </span>
                    <span className={`text-lg sm:text-xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
                {/* Promo Code Section */}
                <div className={`p-3 sm:p-4 rounded-lg border-2 border-dashed ${
                  isDarkMode ? 'border-slate-600 bg-slate-700/30' : 'border-slate-300 bg-slate-50'
                }`}>
                  <div className={`flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 ${
                    isArabic ? 'flex-row-reverse' : ''
                  }`}>
                    <TagIcon className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                    <span className={`text-xs sm:text-sm font-medium ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {isArabic ? 'كود الخصم' : 'Promo Code'}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder={isArabic ? 'أدخل كود الخصم' : 'Enter promo code'}
                      className={`flex-1 w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg border ${
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
                  <CheckoutButton />
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    <div className={`flex items-center justify-center gap-2 p-3 sm:p-4 rounded-xl border-2 border-dashed ${
                      isDarkMode ? 'border-slate-600 bg-slate-700/30 text-slate-300' : 'border-slate-300 bg-slate-50 text-slate-600'
                    }`}>
                      <LockClosedIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm font-medium">
                        {isArabic ? 'يجب تسجيل الدخول للمتابعة' : 'Login required to checkout'}
                      </span>
                    </div>
                    <Link 
                      href="/login"
                      className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 sm:gap-3"
                    >
                      <LockClosedIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      {isArabic ? 'تسجيل الدخول للمتابعة' : 'Login to Continue'}
                    </Link>
                  </div>
                )}
                
                <button
                  onClick={handleClearCart}
                  className={`w-full px-4 sm:px-6 py-3 sm:py-4 border-2 rounded-xl transition-all duration-300 font-semibold hover:scale-105 text-sm sm:text-base ${
                    isDarkMode 
                      ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                      : 'border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400'
                  }`}
                >
                  {isArabic ? 'إفراغ السلة' : 'Clear Cart'}
                </button>
                
                {/* Security & Features */}
                <div className={`space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t-2 ${
                  isDarkMode ? 'border-slate-700' : 'border-slate-200'
                }`}>
                  <div className={`flex items-center gap-2 sm:gap-3 text-xs sm:text-sm ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    <ShieldCheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                    <span>{isArabic ? 'دفع آمن ومضمون' : 'Secure & Safe Payment'}</span>
                  </div>
                  <div className={`flex items-center gap-2 sm:gap-3 text-xs sm:text-sm ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    <TruckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    <span>{isArabic ? 'توصيل سريع ومجاني' : 'Fast & Free Delivery'}</span>
                  </div>
                  <div className={`flex items-center gap-2 sm:gap-3 text-xs sm:text-sm ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
                    <span>{isArabic ? 'ضمان الإرجاع لمدة 30 يوم' : '30-Day Return Guarantee'}</span>
                  </div>
                  
                  {/* Promotional Banner */}
                  {subtotal < 100 && (
                    <div className={`mt-3 sm:mt-4 p-2.5 sm:p-3 rounded-lg bg-linear-to-r from-orange-500/10 to-red-500/10 border ${
                      isDarkMode ? 'border-orange-500/20' : 'border-orange-200'
                    }`}>
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                        <TagIcon className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                        <span className={`text-xs sm:text-sm font-semibold ${
                          isDarkMode ? 'text-orange-400' : 'text-orange-600'
                        }`}>
                          {isArabic ? 'عرض خاص!' : 'Special Offer!'}
                        </span>
                      </div>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {isArabic 
                          ? `أضف $${(100 - subtotal).toFixed(2)} للحصول على شحن مجاني`
                          : `Add $${(100 - subtotal).toFixed(2)} more for free shipping`
                        }
                      </p>
                    </div>
                  )}
                  
                  <div className={`text-center pt-3 sm:pt-4 ${
                    isDarkMode ? 'border-t border-slate-700' : 'border-t border-slate-200'
                  }`}>
                    <p className={`text-xs font-medium ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {isArabic ? 'شحن مجاني للطلبات أكثر من $100' : 'Free shipping on orders over $100'}
                    </p>
                    <p className={`text-xs mt-1 ${
                      isDarkMode ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      {isArabic ? 'الأسعار شاملة الضريبة' : 'All prices include applicable taxes'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}