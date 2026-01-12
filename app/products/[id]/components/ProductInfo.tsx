import { Product } from '@/types';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface ProductInfoProps {
  product: Product;
  selectedQuantity: number;
  isWishlisted: boolean;
  hasDiscount: boolean;
  discountPercentage?: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
  onWishlistToggle: () => void;
}

function ColorSelector({ colors }: { colors: string[] }) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const getColorValue = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'red': '#EF4444',
      'blue': '#3B82F6',
      'green': '#10B981',
      'yellow': '#F59E0B',
      'purple': '#8B5CF6',
      'pink': '#EC4899',
      'black': '#1F2937',
      'white': '#F9FAFB',
      'gray': '#6B7280',
      'brown': '#92400E',
      'orange': '#F97316',
      'navy': '#1E3A8A',
    };
    return colorMap[color.toLowerCase()] || color.toLowerCase();
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-2 sm:mb-3">Color: <span className="font-normal text-gray-600 capitalize">{selectedColor}</span></h3>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {colors.map((color, index) => {
          const colorValue = getColorValue(color);
          const isSelected = selectedColor === color;
          const isLight = ['white', 'yellow'].includes(color.toLowerCase());
          
          return (
            <button
              key={index}
              onClick={() => setSelectedColor(color)}
              className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-md transition-all duration-200 focus:outline-none ${
                isSelected 
                  ? 'ring-2 ring-offset-2 ring-gray-900' 
                  : 'hover:scale-110'
              }`}
              style={{ backgroundColor: colorValue }}
              title={color}
            >
              {isSelected && (
                <div 
                  className="absolute inset-1 rounded-md border-2 border-white/30"
                  style={{ borderColor: isLight ? '#1F2937' : '#FFFFFF' }}
                />
              )}
              {isLight && !isSelected && (
                <div className="absolute inset-0 rounded-md border border-gray-300" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ProductInfo({
  product,
  selectedQuantity,
  isWishlisted,
  hasDiscount,
  discountPercentage,
  onQuantityChange,
  onAddToCart,
  onWishlistToggle,
}: ProductInfoProps) {
  const isOutOfStock = (product.stock ?? product.countInStock ?? 0) === 0;
  const currentPrice = product.finalPrice || product.price || product.basePrice;
  const originalPrice = product.basePrice;
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Product Name */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{product.name}</h1>
      
      {/* Price */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <span className="text-2xl sm:text-3xl font-bold text-gray-900">
          ${currentPrice?.toFixed(2) || 'N/A'}
        </span>
        {hasDiscount && originalPrice && (
          <>
            <span className="text-lg sm:text-xl text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs sm:text-sm font-semibold">
              {discountPercentage || Math.round(((originalPrice - currentPrice!) / originalPrice) * 100)}% OFF
            </span>
          </>
        )}
      </div>
      
      {/* Colors */}
      {product.colors && product.colors.length > 0 && (
        <ColorSelector colors={product.colors} />
      )}
      
      {/* Sizes */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2 sm:mb-3">Size</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {product.sizes.map((size, index) => {
              const isSelected = selectedSize === size;
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`relative min-w-8 sm:min-w-10 h-8 sm:h-10 px-3 sm:px-4 border-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isSelected
                      ? 'border-gray-900 bg-gray-900 text-white shadow-sm'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50 focus:ring-gray-300'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${
          isOutOfStock ? 'bg-red-500' : (product.stock ?? product.countInStock ?? 0) <= 10 ? 'bg-yellow-500' : 'bg-green-500'
        }`} />
        <span className={`text-xs sm:text-sm font-medium ${
          isOutOfStock ? 'text-red-600' : (product.stock ?? product.countInStock ?? 0) <= 10 ? 'text-yellow-600' : 'text-green-600'
        }`}>
          {isOutOfStock ? 'Out of Stock' : 
           (product.stock ?? product.countInStock ?? 0) <= 10 ? 
           `Only ${product.stock ?? product.countInStock} left` : 
           'In Stock'}
        </span>
      </div>
      
      {/* Quantity */}
      {!isOutOfStock && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2 sm:mb-3">Quantity</h3>
          <div className="inline-flex items-center bg-gray-50 rounded-lg p-1">
            <button
              onClick={() => onQuantityChange(Math.max(1, selectedQuantity - 1))}
              className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer rounded-md flex items-center justify-center text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all duration-200 font-medium text-lg"
            >
              −
            </button>
            <div className="w-12 sm:w-16 h-8 sm:h-10 flex items-center justify-center text-gray-900 font-semibold text-sm sm:text-base">
              {selectedQuantity}
            </div>
            <button
              onClick={() => onQuantityChange(selectedQuantity + 1)}
              className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer rounded-md flex items-center justify-center text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all duration-200 font-medium text-lg"
            >
              +
            </button>
          </div>
        </div>
      )}
      
      {/* Add to Cart and Wishlist */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
        <button
          onClick={onAddToCart}
          disabled={isOutOfStock}
          className="flex-1 bg-[#1A1A1A] cursor-pointer text-white py-3 sm:py-4 px-6 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base transition-all hover:bg-gray-800"
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
        <button
          onClick={onWishlistToggle}
          className={`flex items-center justify-center sm:justify-start space-x-2 py-3 sm:py-4 px-6 sm:px-8 rounded-lg border-2 cursor-pointer transition-colors text-sm sm:text-base ${
            isWishlisted 
              ? 'border-red-500 bg-red-50 text-red-500' 
              : 'border-gray-300 text-gray-400 hover:border-red-300 hover:text-red-400'
          }`}
        >
          <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          <span className="hidden sm:inline">WatchList</span>
        </button>
      </div>
    </div>
  );
}