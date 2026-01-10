import { ProductCardProps } from './types';
import { useWishlist } from './hooks';
import { getProductPricing, isProductOutOfStock } from './utils';
import { 
  WishlistButton, 
  ProductImage, 
  ProductInfo, 
  ProductActions 
} from './components';

export default function ProductCard({ product, onAddToCart, onToggleWishlist }: ProductCardProps) {
  const { isWishlisted, handleToggle } = useWishlist(onToggleWishlist);
  const { hasDiscount, discountPercentage } = getProductPricing(product);
  const isOutOfStock = isProductOutOfStock(product);

  const handleWishlistToggle = () => {
    handleToggle(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 w-70 max-w-md mx-auto h-95 relative">
      <WishlistButton 
        isWishlisted={isWishlisted} 
        onToggle={handleWishlistToggle} 
      />
      
      <ProductImage 
        product={product}
        hasDiscount={hasDiscount}
        discountPercentage={discountPercentage}
      />
      
      <ProductInfo product={product} />
      
      <ProductActions 
        product={product}
        isOutOfStock={isOutOfStock}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}