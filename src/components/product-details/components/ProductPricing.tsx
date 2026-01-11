import { Product } from '@/types';

interface ProductPricingProps {
  product: Product;
  finalPrice: number;
  hasDiscount: boolean;
}

export const ProductPricing = ({ product, finalPrice, hasDiscount }: ProductPricingProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-3">
        <span className="text-3xl font-bold text-gray-900">
          {product.currency} {finalPrice?.toFixed(2)}
        </span>
        {hasDiscount && (
          <span className="text-xl text-gray-500 line-through">
            {product.currency} {product.basePrice.toFixed(2)}
          </span>
        )}
      </div>
      {hasDiscount && (
        <span className="inline-block bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
          Save {product.discount?.type === 'percentage' 
            ? `${product.discount.value}%` 
            : `${product.currency} ${product.discount?.value}`}
        </span>
      )}
    </div>
  );
};