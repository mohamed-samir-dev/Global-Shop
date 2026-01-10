import { Product } from '@/types';
import StarRating from './StarRating';
import StockStatus from './StockStatus';
import QuantitySelector from './QuantitySelector';
import ActionButtons from './ActionButtons';
import ProductFeatures from './ProductFeatures';

interface ProductInfoProps {
  product: Product;
  selectedQuantity: number;
  isWishlisted: boolean;
  hasDiscount: boolean;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
  onWishlistToggle: () => void;
}

export default function ProductInfo({
  product,
  selectedQuantity,
  isWishlisted,
  hasDiscount,
  onQuantityChange,
  onAddToCart,
  onWishlistToggle,
}: ProductInfoProps) {
  const isOutOfStock = (product.countInStock ?? 0) === 0;

  return (
    <div className="space-y-6">
      {product.category && (
        <span className="inline-block text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          {product.category}
        </span>
      )}
      
      <h1 className="text-4xl font-bold text-gray-900 leading-tight">{product.name}</h1>
      
      <StarRating />
      
      <div className="flex items-center space-x-4">
        <span className="text-4xl font-bold text-gray-900">${product.price}</span>
        {hasDiscount && (
          <span className="text-xl text-gray-500 line-through">${product.basePrice}</span>
        )}
      </div>
      
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
      </div>
      
      <StockStatus countInStock={product.countInStock ?? 0} />
      
      {!isOutOfStock && (
        <QuantitySelector
          quantity={selectedQuantity}
          maxQuantity={product.countInStock ?? 0}
          onQuantityChange={onQuantityChange}
        />
      )}
      
      <ActionButtons
        isOutOfStock={isOutOfStock}
        isWishlisted={isWishlisted}
        onAddToCart={onAddToCart}
        onWishlistToggle={onWishlistToggle}
      />
      
      <ProductFeatures />
    </div>
  );
}