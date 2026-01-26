'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useProductDetail } from './hooks/useProductDetail';
import { calculateDiscount } from './utils/productHelpers';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';
import {
  ProductImages,
  ProductInfo,
  ProductNotFound,
  ProductDescription,
  ProductSpecifications,
} from './components';

export default function ProductDetailPage() {
  const [activeTab, setActiveTab] = useState('description');
  const params = useParams();
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const {
    product,
    isLoading,
    selectedQuantity,
    isWishlisted,
    activeImageIndex,
    setActiveImageIndex,
    handleAddToCart,
    handleWishlistToggle,
    updateQuantity,
  } = useProductDetail(params.id as string);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  const { hasDiscount, discountPercentage } = calculateDiscount(product);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
        <div className="grid grid-cols-1 min-[1100px]:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-6 sm:mb-8 lg:mb-12 min-[950px]:items-stretch">
          <div className="order-1">
            <ProductImages
              product={product}
              activeImageIndex={activeImageIndex}
              setActiveImageIndex={setActiveImageIndex}
              hasDiscount={hasDiscount}
              discountPercentage={discountPercentage}
            />
          </div>
          <div className="order-2 flex flex-col justify-center">
            <ProductInfo
              product={product}
              selectedQuantity={selectedQuantity}
              isWishlisted={isWishlisted}
              hasDiscount={hasDiscount}
              discountPercentage={discountPercentage}
              onQuantityChange={updateQuantity}
              onAddToCart={handleAddToCart}
              onWishlistToggle={handleWishlistToggle}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border overflow-hidden`}>
            <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <nav className="flex px-3 sm:px-4 md:px-6" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors flex-1 text-center ${
                    activeTab === 'description'
                      ? `border-[#0D0D0C] ${isDarkMode ? 'text-gray-200' : 'text-[#3E3E3C]'}`
                      : `border-transparent ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                  }`}
                >
                  {t('product.details.description')}
                </button>
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors flex-1 text-center ${
                    activeTab === 'specifications'
                      ? `border-[#0D0D0C] ${isDarkMode ? 'text-gray-200' : 'text-[#3E3E3C]'}`
                      : `border-transparent ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                  }`}
                >
                  {t('product.details.specifications')}
                </button>
              </nav>
            </div>
            <div className="p-3 sm:p-4 md:p-6">
              {activeTab === 'description' && <ProductDescription product={product} />}
              {activeTab === 'specifications' && <ProductSpecifications product={product} />}
            </div>
          </div>
          <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border p-3 sm:p-4 md:p-6`}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>4.5</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <button className={`flex items-center gap-1 text-xs sm:text-sm transition-colors ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}>
                Summary
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <div className="space-y-2 mb-4 sm:mb-6">
              {[{rating: 5, count: 10, width: '90%'}, {rating: 4, count: 0, width: '0%'}, {rating: 3, count: 0, width: '0%'}, {rating: 2, count: 0, width: '0%'}, {rating: 1, count: 1, width: '10%'}].map(({rating, count, width}) => (
                <div key={rating} className="flex items-center gap-2 sm:gap-3">
                  <span className={`text-xs sm:text-sm w-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{rating}</span>
                  <div className={`flex-1 rounded-full h-1.5 sm:h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-gray-300' : 'bg-black'}`} style={{width}}></div>
                  </div>
                  <span className={`text-xs sm:text-sm w-4 text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{count}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className={`border-b pb-3 last:border-b-0 last:pb-0 ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <h4 className={`font-medium mb-1 text-sm sm:text-base ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Recent Altx</h4>
                <p className={`text-xs sm:text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>I lovally good heard reicommend.</p>
                <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>About 6 hours ago</span>
              </div>
              <div className={`border-b pb-3 last:border-b-0 last:pb-0 ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <h4 className={`font-medium mb-1 text-sm sm:text-base ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Recent Ram</h4>
                <p className={`text-xs sm:text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>This point it has one market something cat expectt.</p>
                <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>About 6 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}