'use client';

import { Product } from '@/types';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

interface ProductListProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export default function ProductList({ products, onAddToCart }: ProductListProps) {
  const { isDarkMode } = useTheme();
  const handleAddToCart = (product: Product) => {
    onAddToCart?.(product);
    console.log('Added to cart:', product.name);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {products.map((product) => (
        <div key={product._id} className={`border rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-200 ${
          isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
        }`}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="shrink-0 mx-auto sm:mx-0">
              <Image
                src={product.mainImage || product.image || '/images/placeholder.jpg'}
                alt={product.name}
                width={160}
                height={160}
                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-xl object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0 text-center sm:text-left flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-3 sm:mb-4">
                <h3 className={`text-lg sm:text-xl font-semibold mb-2 sm:mb-0 sm:pr-4 line-clamp-2 leading-tight ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{product.name}</h3>
                <button className={`p-2 rounded-full transition-all duration-200 mx-auto sm:mx-0 shrink-0 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}>
                  <Heart size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
              <p className={`text-sm sm:text-base mb-4 sm:mb-5 line-clamp-2 leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>{product.description}</p>
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-4 sm:mb-5">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`sm:w-4 sm:h-4 ${
                        i < Math.floor(product.averageRating) ? 'text-amber-400 fill-current' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className={`text-xs sm:text-sm font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>({product.totalReviews})</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mt-auto">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className={`text-xl sm:text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    ${(product.finalPrice || product.basePrice || product.price || 0).toFixed(2)}
                  </span>
                  {product.discount && product.discount.value > 0 && (
                    <span className={`text-xs sm:text-sm line-through ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      ${(product.basePrice || product.price || 0).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 bg-[#B39E7A] text-white rounded-xl hover:bg-[#A08B6F] transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm sm:text-base flex-1 sm:flex-none min-h-[44px] sm:min-h-[48px]"
                  >
                    <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px]" />
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                  <Link
                    href={`/products/${product._id}`}
                    className={`px-3 sm:px-4 py-3 sm:py-3.5 border rounded-xl flex items-center justify-center transition-colors min-h-[44px] sm:min-h-[48px] ${
                      isDarkMode 
                        ? 'border-gray-600 text-gray-300 hover:border-[#B39E7A] hover:text-[#B39E7A]'
                        : 'border-gray-300 text-gray-700 hover:border-[#B39E7A] hover:text-[#B39E7A]'
                    }`}
                  >
                    <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}