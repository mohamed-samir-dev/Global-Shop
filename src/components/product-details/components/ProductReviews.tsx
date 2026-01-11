import { Product } from '@/types';
import { StarRating } from './StarRating';
import ReviewForm from '../../ReviewForm';

interface ProductReviewsProps {
  product: Product;
  onProductUpdate?: () => void;
}

export const ProductReviews = ({ product, onProductUpdate }: ProductReviewsProps) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
      
      {/* Add Review Form */}
      <div className="mb-8">
        <ReviewForm productId={product._id} onReviewAdded={onProductUpdate} />
      </div>
      
      {/* Existing Reviews */}
      {product.reviews && product.reviews.length > 0 ? (
        <div className="space-y-6">
          {product.reviews.map((review) => (
            <div key={review._id} className="border-b pb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{review.user.name}</span>
                  <StarRating rating={review.rating} />
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              {review.comment && (
                <p className="text-gray-600">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          No reviews yet. Be the first to review this product!
        </p>
      )}
    </div>
  );
};