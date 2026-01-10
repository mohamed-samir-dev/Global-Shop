import { Product } from '@/types';

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
}

export interface ProductImageProps {
  product: Product;
  hasDiscount: boolean;
  discountPercentage: number;
}

export interface ProductInfoProps {
  product: Product;
}

export interface ProductActionsProps {
  product: Product;
  isOutOfStock: boolean;
  onAddToCart: (e: React.MouseEvent) => void;
}

export interface WishlistButtonProps {
  isWishlisted: boolean;
  onToggle: () => void;
}

export interface StarRatingProps {
  rating?: number;
}