import { Star } from 'lucide-react';
import { StarRatingProps } from '../types';

export const StarRating = ({ rating = 4.5 }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-1 mb-3">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-500">({rating})</span>
    </div>
  );
};