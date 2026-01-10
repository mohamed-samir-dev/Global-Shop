import { Star } from 'lucide-react';

interface StarRatingProps {
  rating?: number;
  reviewCount?: number;
}

export default function StarRating({ rating = 4.5, reviewCount = 127 }: StarRatingProps) {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-1">
        {renderStars()}
      </div>
      <span className="text-sm text-gray-600">({rating}) • {reviewCount} reviews</span>
    </div>
  );
}