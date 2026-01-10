'use client';

import { Heart } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { WishlistButtonProps } from '../types';

export const WishlistButton = ({ isWishlisted, onToggle }: WishlistButtonProps) => {
  const { isDarkMode } = useTheme();
  
  return (
    <button
      onClick={onToggle}
      className={`absolute cursor-pointer top-3 right-3 z-10 p-1.5 rounded-full shadow-sm hover:shadow-md transition-shadow ${
        isDarkMode ? 'bg-gray-700' : 'bg-white'
      }`}
    >
      <Heart 
        className={`w-5 h-5 ${
          isWishlisted 
            ? 'fill-red-500 text-red-500' 
            : isDarkMode ? 'text-gray-400' : 'text-gray-400'
        }`} 
      />
    </button>
  );
};