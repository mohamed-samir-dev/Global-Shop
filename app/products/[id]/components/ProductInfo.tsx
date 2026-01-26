import { Product } from '@/types';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';

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
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

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
      'burgundy': '#800020',
      'crimson': '#DC143C',
      'maroon': '#800000',
      'coral': '#FF7F50',
      'salmon': '#FA8072',
      'tomato': '#FF6347',
      'scarlet': '#FF2400',
      'rose': '#FF007F',
      'magenta': '#FF00FF',
      'fuchsia': '#FF00FF',
      'lavender': '#E6E6FA',
      'violet': '#8F00FF',
      'indigo': '#4B0082',
      'plum': '#DDA0DD',
      'orchid': '#DA70D6',
      'mauve': '#E0B0FF',
      'lilac': '#C8A2C8',
      'cyan': '#06B6D4',
      'teal': '#14B8A6',
      'turquoise': '#40E0D0',
      'aqua': '#00FFFF',
      'sky': '#87CEEB',
      'azure': '#007FFF',
      'cobalt': '#0047AB',
      'sapphire': '#0F52BA',
      'royal': '#4169E1',
      'mint': '#98FF98',
      'lime': '#84CC16',
      'emerald': '#10B981',
      'jade': '#00A86B',
      'olive': '#808000',
      'forest': '#228B22',
      'sage': '#9DC183',
      'chartreuse': '#7FFF00',
      'gold': '#FFD700',
      'amber': '#FFBF00',
      'mustard': '#FFDB58',
      'lemon': '#FFF44F',
      'cream': '#FFFDD0',
      'beige': '#F5F5DC',
      'tan': '#D2B48C',
      'khaki': '#C3B091',
      'sand': '#C2B280',
      'caramel': '#C68E17',
      'chocolate': '#7B3F00',
      'coffee': '#6F4E37',
      'espresso': '#4E312D',
      'chestnut': '#954535',
      'mahogany': '#C04000',
      'rust': '#B7410E',
      'copper': '#B87333',
      'bronze': '#CD7F32',
      'silver': '#C0C0C0',
      'platinum': '#E5E4E2',
      'charcoal': '#36454F',
      'slate': '#708090',
      'steel': '#4682B4',
      'graphite': '#383428',
      'smoke': '#738276',
      'ash': '#B2BEB5',
      'pearl': '#EAE0C8',
      'ivory': '#FFFFF0',
      'snow': '#FFFAFA',
      'peach': '#FFE5B4',
      'apricot': '#FBCEB1',
      'tangerine': '#F28500',
      'persimmon': '#EC5800'
    };
    return colorMap[color.toLowerCase()] || color.toLowerCase();
  };

  return (
    <div>
      <h3 className={`text-sm font-medium mb-2 sm:mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{t('product.details.color')}: <span className={`font-normal capitalize ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{selectedColor}</span></h3>
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
                  ? `ring-2 ring-offset-2 ${isDarkMode ? 'ring-gray-300 ring-offset-gray-800' : 'ring-gray-900'}` 
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
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const isOutOfStock = (product.stock ?? product.countInStock ?? 0) === 0;
  const currentPrice = product.finalPrice || product.price || product.basePrice;
  const originalPrice = product.basePrice;
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const productName = isArabic && product.nameAr ? product.nameAr : product.name;

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{productName}</h1>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <span className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {isArabic ? `${currentPrice?.toFixed(2) || 'N/A'} ج.م` : `${currentPrice?.toFixed(2) || 'N/A'} EGP`}
        </span>
        {hasDiscount && originalPrice && (
          <>
            <span className={`text-lg sm:text-xl line-through ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {isArabic ? `${originalPrice.toFixed(2)} ج.م` : `${originalPrice.toFixed(2)} EGP`}
            </span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs sm:text-sm font-semibold">
              {discountPercentage || Math.round(((originalPrice - currentPrice!) / originalPrice) * 100)}% {isArabic ? 'خصم' : 'OFF'}
            </span>
          </>
        )}
      </div>
      {product.colors && product.colors.length > 0 && (
        <ColorSelector colors={product.colors} />
      )}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <h3 className={`text-sm font-medium mb-2 sm:mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{t('product.details.size')}</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {product.sizes.map((size, index) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`relative min-w-8 sm:min-w-10 h-8 sm:h-10 px-3 sm:px-4 border-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isSelected
                      ? `${isDarkMode ? 'border-gray-300 bg-gray-300 text-gray-900' : 'border-gray-900 bg-gray-900 text-white'} shadow-sm`
                      : `${isDarkMode ? 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500 hover:bg-gray-700 focus:ring-gray-500' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50 focus:ring-gray-300'}`
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${
          isOutOfStock ? 'bg-red-500' : (product.stock ?? product.countInStock ?? 0) <= 10 ? 'bg-yellow-500' : 'bg-green-500'
        }`} />
        <span className={`text-xs sm:text-sm font-medium ${
          isOutOfStock ? 'text-red-600' : (product.stock ?? product.countInStock ?? 0) <= 10 ? 'text-yellow-600' : 'text-green-600'
        }`}>
          {isOutOfStock ? t('product.details.outOfStock') : 
           (product.stock ?? product.countInStock ?? 0) <= 10 ? 
           `${t('product.details.onlyLeft')} ${product.stock ?? product.countInStock}` : 
           t('product.details.inStock')}
        </span>
      </div>
      {!isOutOfStock && (
        <div>
          <h3 className={`text-sm font-medium mb-2 sm:mb-3 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{t('product.details.quantity')}</h3>
          <div className={`inline-flex items-center rounded-lg p-1 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <button
              onClick={() => onQuantityChange(Math.max(1, selectedQuantity - 1))}
              className={`w-8 h-8 sm:w-10 sm:h-10 cursor-pointer rounded-md flex items-center justify-center transition-all duration-200 font-medium text-lg hover:shadow-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-100' : 'text-gray-600 hover:bg-white hover:text-gray-900'}`}
            >
              −
            </button>
            <div className={`w-12 sm:w-16 h-8 sm:h-10 flex items-center justify-center font-semibold text-sm sm:text-base ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {selectedQuantity}
            </div>
            <button
              onClick={() => onQuantityChange(selectedQuantity + 1)}
              className={`w-8 h-8 sm:w-10 sm:h-10 cursor-pointer rounded-md flex items-center justify-center transition-all duration-200 font-medium text-lg hover:shadow-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-100' : 'text-gray-600 hover:bg-white hover:text-gray-900'}`}
            >
              +
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
        <button
          onClick={onAddToCart}
          disabled={isOutOfStock}
          className="flex-1 bg-[#1A1A1A] cursor-pointer text-white py-3 sm:py-4 px-6 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base transition-all hover:bg-gray-800"
        >
          {isOutOfStock ? t('product.details.outOfStock') : t('product.actions.addToCart')}
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
          <span className="hidden sm:inline">{t('product.details.watchlist')}</span>
        </button>
      </div>
    </div>
  );
}