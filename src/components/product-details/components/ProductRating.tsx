import { Product } from '@/types';
import { StarRating } from './StarRating';

interface ProductRatingProps {
  product: Product;
}

export const ProductRating = ({ product }: ProductRatingProps) => {
  return (
    <div className="flex items-center space-x-2">
      <StarRating rating={product.averageRating} />
      <span className="text-sm text-gray-600">
        ({product.totalReviews} reviews)
      </span>
    </div>
  );
};