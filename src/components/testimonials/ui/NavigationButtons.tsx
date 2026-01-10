import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/i18n/hooks/useTranslation";

export const NavigationButtons = () => {
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();

  const buttonClass = `w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
    isDarkMode
      ? "bg-[#2A2D35] text-white hover:bg-[#3A3D45]"
      : "bg-white text-[#0D0D0D] hover:bg-gray-50 shadow-sm border border-gray-200"
  }`;

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        className={`swiper-button-prev-custom ${buttonClass}`}
        aria-label={isArabic ? "السابق" : "Previous"}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isArabic ? "rotate-180" : ""}
        >
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>
      <button
        className={`swiper-button-next-custom ${buttonClass}`}
        aria-label={isArabic ? "التالي" : "Next"}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isArabic ? "rotate-180" : ""}
        >
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      </button>
    </div>
  );
};