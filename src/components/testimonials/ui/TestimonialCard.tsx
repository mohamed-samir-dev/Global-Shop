import { User } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Testimonial } from "../types/types";
import { StarRating } from "./StarRating";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`p-6 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md ${
        isDarkMode
          ? "bg-[#2A2D35] border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
          isDarkMode ? "bg-gray-700" : "bg-gray-200"
        }`}>
          <User className={`w-6 h-6 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`} />
        </div>
        <div>
          <p
            className={`font-semibold text-sm ${
              isDarkMode ? "text-white" : "text-[#0D0D0D]"
            }`}
          >
            {testimonial.name}
          </p>
          <div className="mt-1">
            <StarRating rating={testimonial.rating} />
          </div>
        </div>
      </div>

      <p
        className={`text-sm leading-relaxed ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        &ldquo;{testimonial.comment}&rdquo;
      </p>
    </div>
  );
};