import { Star } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface StarRatingProps {
  rating: number;
  size?: number;
}

export const StarRating = ({ rating, size = 16 }: StarRatingProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={size}
          className={`${
            index < rating
              ? "fill-yellow-400 text-yellow-400"
              : isDarkMode
              ? "text-gray-600"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};