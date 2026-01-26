'use client';

import { Product } from '@/types';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n/hooks/useTranslation';

interface ProductListProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export default function ProductList({ products, onAddToCart }: ProductListProps) {
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();
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
    <div className="space-y-3 md:space-y-4">
      {products.map((product) => (
        <div key={product._id} className={`border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 ${
          isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
        }`}>
          <div className="flex flex-col sm:flex-row">
            <div className="shrink-0 w-full sm:w-40 md:w-48 lg:w-56">
              <Link href={`/products/${product._id}`} className="block relative aspect-square sm:aspect-auto sm:h-full">
                <Image
                  src={product.mainImage || product.image || '/images/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>
            <div className="flex-1 p-4 md:p-5 flex flex-col">
              <div className="flex justify-between items-start gap-3 mb-2">
                <Link href={`/products/${product._id}`}>
                  <h3 className={`text-base md:text-lg font-semibold line-clamp-2 hover:text-[#B39E7A] transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{isArabic && product.nameAr ? product.nameAr : product.name}</h3>
                </Link>
                <button className={`p-2 rounded-full transition-all shrink-0 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}>
                  <Heart size={18} />
                </button>
              </div>
              <p className={`text-sm mb-3 line-clamp-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>{product.description}</p>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.averageRating) ? 'text-amber-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>({product.totalReviews})</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 mt-auto">
                <div className="flex items-baseline gap-2">
                  <span className={`text-xl md:text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {isArabic ? `${(product.finalPrice || product.basePrice || product.price || 0).toFixed(2)} ج.م` : `${(product.finalPrice || product.basePrice || product.price || 0).toFixed(2)} EGP`}
                  </span>
                  {product.discount && product.discount.value > 0 && (
                    <span className={`text-sm line-through ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {isArabic ? `${(product.basePrice || product.price || 0).toFixed(2)} ج.م` : `${(product.basePrice || product.price || 0).toFixed(2)} EGP`}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-2 px-4 md:px-5 py-2.5 bg-[#B39E7A] text-white rounded-lg hover:bg-[#A08B6F] transition-all shadow-sm hover:shadow-md font-medium text-sm"
                  >
                    <ShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </button>
                  <Link
                    href={`/products/${product._id}`}
                    className={`px-3 py-2.5 border rounded-lg flex items-center justify-center transition-colors ${
                      isDarkMode 
                        ? 'border-gray-600 text-gray-300 hover:border-[#B39E7A] hover:text-[#B39E7A]'
                        : 'border-gray-300 text-gray-700 hover:border-[#B39E7A] hover:text-[#B39E7A]'
                    }`}
                  >
                    <Eye size={16} />
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