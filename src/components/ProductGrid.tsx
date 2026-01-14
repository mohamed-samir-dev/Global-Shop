'use client';

import { useState, useRef } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import Pagination from './pagination/Pagination';
import { ShoppingCart, Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const gridRef = useRef<HTMLDivElement>(null);
  
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + productsPerPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const handleAddToCart = (product: Product) => {
    onAddToCart?.(product);
    // You can add toast notification here
    console.log('Added to cart:', product.name);
  };

  const handleToggleWishlist = (product: Product) => {
    // Handle wishlist functionality
    console.log('Toggled wishlist for:', product.name);
  };

  if (products.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
        <div className="relative">
          <div className="w-40 h-40 bg-linear-to-br from-blue-100 via-purple-50 to-pink-100 rounded-full flex items-center justify-center mb-8 shadow-2xl">
            <ShoppingCart className="w-20 h-20 text-gray-400" />
            <Sparkles className="w-8 h-8 text-blue-400 absolute top-4 right-4 animate-pulse" />
            <Sparkles className="w-6 h-6 text-pink-400 absolute bottom-6 left-6 animate-pulse delay-300" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">No products found</h3>
        <p className="text-gray-500 max-w-lg leading-relaxed text-lg mb-8">
          We couldn&lsquo;t find any products matching your criteria. Try adjusting your filters or search terms to discover more amazing items.
        </p>
        <button className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <>
      <div ref={gridRef} className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 auto-rows-fr">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
          />
        ))}
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}