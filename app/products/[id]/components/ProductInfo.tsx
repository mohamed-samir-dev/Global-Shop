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
      <h3 className="text-sm font-medium text-gray-900 mb-3">Color: <span className="font-normal text-gray-600 capitalize">{selectedColor}</span></h3>
      <div className="flex flex-wrap gap-3">
        {colors.map((color, index) => {
          const colorValue = getColorValue(color);
          const isSelected = selectedColor === color;
          const isLight = ['white', 'yellow'].includes(color.toLowerCase());
          
          return (
            <button
              key={index}
              onClick={() => setSelectedColor(color)}
              className={`relative w-8 h-8 rounded-md transition-all duration-200  focus:outline-none ${
                isSelected 
                  ? 'ring-2 ring-offset-2 ring-gray-900 ' 
                  : ''
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
                <div className="absolute inset-0 rounded-full border border-gray-300" />
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
    <div className="space-y-6">
      {/* Product Name */}
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
      
      {/* Price */}
      <div className="flex items-center space-x-3">
        <span className="text-3xl font-bold text-gray-900">
          ${currentPrice?.toFixed(2) || 'N/A'}
        </span>
        {hasDiscount && originalPrice && (
          <>
            <span className="text-xl text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-semibold">
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
          <h3 className="text-sm font-medium text-gray-900 mb-1">Size</h3>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size, index) => {
              const isSelected = selectedSize === size;
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`relative min-w-10 h-10 px-4 border-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
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
        <span className={`text-sm font-medium ${
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
          <h3 className="text-sm font-medium text-gray-900 ">Quantity</h3>
          <div className="inline-flex items-center bg-gray-50 rounded-lg p-1">
            <button
              onClick={() => onQuantityChange(Math.max(1, selectedQuantity - 1))}
              className="w-10 h-10 cursor-pointer rounded-md flex items-center justify-center text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all duration-200 font-medium"
            >
              −
            </button>
            <div className="w-16 h-10 flex items-center justify-center text-gray-900 font-semibold">
              {selectedQuantity}
            </div>
            <button
              onClick={() => onQuantityChange(selectedQuantity + 1)}
              className="w-10 h-10 cursor-pointer rounded-md flex items-center justify-center text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all duration-200 font-medium"
            >
              +
            </button>
          </div>
        </div>
      )}
      
      {/* Add to Cart and Wishlist */}
      <div className="flex space-x-4">
        <button
          onClick={onAddToCart}
          disabled={isOutOfStock}
          className="flex-1 bg-[#1A1A1A] cursor-pointer text-white py-3 px-6 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
        <button
          onClick={onWishlistToggle}
          className={`flex items-center space-x-2 py-3 px-10 rounded-lg border-2 cursor-pointer transition-colors ${
            isWishlisted 
              ? 'border-red-500 bg-red-50 text-red-500' 
              : 'border-gray-300 text-gray-400 hover:border-red-300 hover:text-red-400'
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          <span>WatchList</span>
        </button>
      </div>
    </div>
  );
}