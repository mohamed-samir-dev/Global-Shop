'use client';

import { Product } from '@/types';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductListProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export default function ProductList({ products, onAddToCart }: ProductListProps) {
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
    <div className="space-y-6">
      {products.map((product) => (
        <div key={product._id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex gap-6">
            <div className="shrink-0">
              <Image
                src={product.mainImage || product.image || '/images/placeholder.jpg'}
                alt={product.name}
                width={200}
                height={200}
                className="rounded-xl object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-900 truncate pr-4">{product.name}</h3>
                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200">
                  <Heart size={20} />
                </button>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.averageRating) ? 'text-amber-400 fill-current' : 'text-gray-200'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-medium">({product.totalReviews})</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-900">
                    ${(product.finalPrice || product.basePrice || product.price || 0).toFixed(2)}
                  </span>
                  {product.discount && product.discount.value > 0 && (
                    <span className="text-sm text-gray-400 line-through">
                      ${(product.basePrice || product.price || 0).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-2 px-6 py-3  bg-[#B39E7A] text-white rounded-xl hover:bg-[#A08B6F] transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                  <Link
                    href={`/products/${product._id}`}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-[#B39E7A] hover:text-[#B39E7A] flex items-center justify-center transition-colors"
                  >
                    <Eye size={18} />
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