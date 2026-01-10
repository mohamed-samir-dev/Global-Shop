import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/i18n/hooks/useTranslation";

export const EmptyState = () => {
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();

  return (
    <div className="text-center py-12">
      <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
        {isArabic 
          ? "لا توجد تقييمات بعد. كن أول من يترك تقييماً!" 
          : "No reviews yet. Be the first to leave a review!"}
      </p>
    </div>
  );
};