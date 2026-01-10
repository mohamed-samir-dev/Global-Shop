import Link from 'next/link';
import { ProductInfoProps } from '../types';
import { getProductPricing } from '../utils';
import { StarRating } from './StarRating';

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const { currentPrice, originalPrice, hasDiscount } = getProductPricing(product);

  return (
    <>
      {/* Product Name */}
      <Link href={`/products/${product._id}`}>
        <h3 className="font-semibold text-[#272525] text-base mb-2 line-clamp-2  transition-colors">
          {product.name}
        </h3>
      </Link>
      
      {/* Rating */}
      <StarRating />

      {/* Price */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl font-bold text-gray-900">
          ${currentPrice?.toFixed(2) || '0.00'}
        </span>
        {hasDiscount && originalPrice && originalPrice > (currentPrice || 0) && (
          <span className="text-sm text-gray-500 line-through">
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>
    </>
  );
};