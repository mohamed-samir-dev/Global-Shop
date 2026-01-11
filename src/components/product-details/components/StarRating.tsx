import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
}

export const StarRating = ({ rating, size = 16 }: StarRatingProps) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={`${
            i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};