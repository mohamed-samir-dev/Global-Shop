'use client';

import { useTheme } from '@/context/ThemeContext';
import ProductGrid from "@/src/components/ProductGrid";
import ProductList from "@/src/components/ProductList";
import { useProducts } from "@/src/hooks/useProducts";
import { Product } from "@/src/types";
import { Filters } from "../types";

interface ProductsSectionProps {
  filters: Filters;
}

export default function ProductsSection({ filters }: ProductsSectionProps) {
  const { isDarkMode } = useTheme();
  const { products, loading, error } = useProducts({
    ...filters,
    searchQuery: "",
  });

  const handleAddToCart = (product: Product) => {
    console.log("Adding to cart:", product);
    // TODO: Implement cart functionality
  };

  if (loading) {
    return (
      <div className={filters.viewMode === 'grid' ? "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" : "space-y-4 sm:space-y-6"}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-lg shadow-sm border overflow-hidden animate-pulse ${
              filters.viewMode === 'grid' 
                ? isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
                : isDarkMode ? 'bg-gray-800 border-gray-600 p-3 sm:p-6' : 'bg-white border-gray-200 p-3 sm:p-6'
            }`}
          >
            {filters.viewMode === 'grid' ? (
              <>
                <div className={`aspect-square ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}></div>
                <div className="p-3 sm:p-4">
                  <div className={`h-3 sm:h-4 rounded mb-2 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                  <div className={`h-2 sm:h-3 rounded mb-3 w-3/4 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                  <div className={`h-3 sm:h-4 rounded mb-4 w-1/2 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                  <div className={`h-8 sm:h-10 rounded ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                </div>
              </>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-lg shrink-0 mx-auto sm:mx-0 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}></div>
                <div className="flex-1">
                  <div className={`h-5 sm:h-6 rounded mb-2 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                  <div className={`h-3 sm:h-4 rounded mb-3 w-3/4 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                  <div className={`h-3 sm:h-4 rounded mb-4 w-1/2 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                  <div className={`h-8 sm:h-10 rounded w-24 sm:w-32 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className={`mb-4 ${
          isDarkMode ? 'text-red-400' : 'text-red-500'
        }`}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#B39E7A] text-white rounded-md hover:bg-[#A08B6F] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return filters.viewMode === 'grid' 
    ? <ProductGrid products={products} onAddToCart={handleAddToCart} />
    : <ProductList products={products} onAddToCart={handleAddToCart} />;
}