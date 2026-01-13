import { Product } from '@/types';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface ProductActionsProps {
  product: Product;
}

export const ProductActions = ({ product }: ProductActionsProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };
  return (
    <>
      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${
          product.availability === 'in_stock' ? 'bg-green-500' : 'bg-red-500'
        }`} />
        <span className={`text-sm ${
          product.availability === 'in_stock' ? 'text-green-600' : 'text-red-600'
        }`}>
          {product.availability === 'in_stock' 
            ? `In Stock (${product.stock} available)` 
            : 'Out of Stock'}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleAddToCart}
          disabled={product.availability === 'out_of_stock'}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>
        <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
          <Heart className="w-5 h-5" />
        </button>
        <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};