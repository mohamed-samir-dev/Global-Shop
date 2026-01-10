import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';
import { ProductActionsProps } from '../types';

export const ProductActions = ({ product, isOutOfStock, onAddToCart }: ProductActionsProps) => {
  return (
    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
      <button
        onClick={onAddToCart}
        disabled={isOutOfStock}
        className="flex-1 bg-[#B39E7A]  cursor-pointer text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-[#846F4D] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
      >
        <ShoppingCart className="w-4 h-4" />
        <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
      </button>
      
      <Link
        href={`/products/${product._id}`}
        className="px-4 py-2.5 border cursor-pointer  border-gray-300 text-gray-700 rounded-lg text-sm hover:border-[#B39E7A] hover:text-[#B39E7A] flex items-center justify-center transition-colors"
      >
        <Eye className="w-4 h-4" />
      </Link>
    </div>
  );
};