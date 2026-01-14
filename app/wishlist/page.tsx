'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n';
import { useWishlist } from '@/hooks/useWishlist';
import WishlistService from '@/services/wishlistService';
import { Product } from '@/types';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

export default function WishlistPage() {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();
  const { userWishlist, isLoading, removeFromWishlist } = useWishlist();
  const [guestWishlist, setGuestWishlist] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setGuestWishlist(WishlistService.getGuestWishlist());
    }
  }, [user]);

  const wishlistItems = user 
    ? userWishlist?.items || [] 
    : guestWishlist?.items || [];

  const handleRemove = async (productId: string, productName: string) => {
    await removeFromWishlist(productId, productName);
    if (!user) {
      setGuestWishlist(WishlistService.getGuestWishlist());
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#0F1115]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          <div className="animate-pulse space-y-4">
            <div className={`h-8 w-48 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`h-80 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0F1115]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <HeartSolidIcon className={`h-6 w-6 sm:h-8 sm:w-8 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
            <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              My Wishlist
            </h1>
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
              isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
            }`}>
              {wishlistItems.length}
            </span>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className={`text-center py-12 sm:py-16 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <HeartIcon className={`h-16 w-16 sm:h-24 sm:w-24 mx-auto mb-3 sm:mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <h2 className={`text-xl sm:text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Your wishlist is empty
            </h2>
            <p className={`mb-4 sm:mb-6 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Start adding products you love!
            </p>
            <Link
              href="/products"
              className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {wishlistItems.map((item: any) => {
              const product = user ? item.productId : item.product;
              if (!product) return null;

              return (
                <div
                  key={product._id}
                  className={`rounded-lg overflow-hidden transition-all hover:shadow-xl ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'
                  }`}
                >
                  <div className="relative h-48 sm:h-56 md:h-64">
                    <Image
                      src={product.mainImage || '/images/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => handleRemove(product._id, product.name)}
                      className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                    >
                      <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                    </button>
                  </div>

                  <div className="p-3 sm:p-4">
                    <Link href={`/products/${product._id}`}>
                      <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-2 hover:text-blue-600 transition-colors line-clamp-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <span className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ${product.finalPrice?.toFixed(2) || product.basePrice?.toFixed(2)}
                      </span>
                      {product.finalPrice < product.basePrice && (
                        <span className={`text-xs sm:text-sm line-through ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          ${product.basePrice?.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => router.push(`/products/${product._id}`)}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
