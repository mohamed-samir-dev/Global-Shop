import { Heart, ShoppingCart, Share2 } from 'lucide-react';

interface ActionButtonsProps {
  isOutOfStock: boolean;
  isWishlisted: boolean;
  onAddToCart: () => void;
  onWishlistToggle: () => void;
}

export default function ActionButtons({
  isOutOfStock,
  isWishlisted,
  onAddToCart,
  onWishlistToggle,
}: ActionButtonsProps) {
  return (
    <div className="flex space-x-4">
      <button
        onClick={onAddToCart}
        disabled={isOutOfStock}
        className="flex-1 bg-linear-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 shadow-lg"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
      </button>
      
      <button
        onClick={onWishlistToggle}
        className="p-4 border-2 border-gray-300 rounded-xl hover:border-red-500 hover:text-red-500 transition-all duration-200 transform hover:scale-[1.02]"
      >
        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
      </button>
      
      <button className="p-4 border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:text-blue-500 transition-all duration-200 transform hover:scale-[1.02]">
        <Share2 className="w-5 h-5" />
      </button>
    </div>
  );
}