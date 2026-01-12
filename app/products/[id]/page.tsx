'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useProductDetail } from './hooks/useProductDetail';
import { calculateDiscount } from './utils/productHelpers';
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
    <div className="min-h-screen bg-gray-50">
      {/* Container with same width as navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
        {/* First Row: Product Images and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-12">
          {/* Left: Product Images */}
          <ProductImages
            product={product}
            activeImageIndex={activeImageIndex}
            setActiveImageIndex={setActiveImageIndex}
            hasDiscount={hasDiscount}
            discountPercentage={discountPercentage}
          />
          
          {/* Right: Product Info */}
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

        {/* Second Row: Description/Specifications and Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Description and Specifications */}
          <div className="  ">
            {/* Tab Headers */}
            <div className="border-b border-[#D9DEDB]">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'description'
                      ? 'border-[#0D0D0C] text-[#3E3E3C]'
                      : 'border-transparent text-gray-500 '
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'specifications'
                      ?'border-[#0D0D0C] text-[#3E3E3C]'
                      : 'border-transparent text-gray-500'
                  }`}
                >
                  Specifications
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'description' && <ProductDescription product={product} />}
              {activeTab === 'specifications' && <ProductSpecifications product={product} />}
            </div>
          </div>
          
          {/* Right: Reviews */}
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">4.5</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <button className="flex items-center gap-1 text-sm text-gray-600">
                Summary
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Rating Bars */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">5</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-black h-2 rounded-full" style={{width: '90%'}}></div>
                </div>
                <span className="text-sm text-gray-600">10</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">4</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2"></div>
                <span className="text-sm text-gray-600">0</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">3</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2"></div>
                <span className="text-sm text-gray-600">0</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">2</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2"></div>
                <span className="text-sm text-gray-600">0</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">1</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-black w-1 h-2 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-600">1</span>
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Recent Altx</h4>
                <p className="text-gray-700 text-sm mb-1">I lovally good heard reicommend.</p>
                <span className="text-xs text-gray-500">About 6 hours ago</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Recent Ram</h4>
                <p className="text-gray-700 text-sm mb-1">This point it has one market something cat expectt.</p>
                <span className="text-xs text-gray-500">About 6 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}