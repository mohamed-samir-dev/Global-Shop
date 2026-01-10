import { Heart } from 'lucide-react';
import { WishlistButtonProps } from '../types';

export const WishlistButton = ({ isWishlisted, onToggle }: WishlistButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className="absolute cursor-pointer top-3 right-3 z-10 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
    >
      <Heart 
        className={`w-5 h-5 ${
          isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'
        }`} 
      />
    </button>
  );
};