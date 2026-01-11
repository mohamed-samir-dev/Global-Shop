"use client";

import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/i18n";
import {
  Filters,
  FilterChangeHandler,
  ArrayFilterChangeHandler,
} from "../types";
import { CATEGORIES, BRANDS } from "../constants";

interface FilterSidebarProps {
  filters: Filters;
  showMobileFilters: boolean;
  showCategoryDropdown: boolean;
  setShowMobileFilters: (show: boolean) => void;
  setShowCategoryDropdown: (show: boolean) => void;
  handleFilterChange: FilterChangeHandler;
  handleArrayFilterChange: ArrayFilterChangeHandler;
  clearAllFilters: () => void;
}

export default function FilterSidebar({
  filters,
  showMobileFilters,
  showCategoryDropdown,
  setShowMobileFilters,
  setShowCategoryDropdown,
  handleFilterChange,
  handleArrayFilterChange,
  clearAllFilters,
}: FilterSidebarProps) {
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();

  return (
    <div className="lg:w-80 xl:w-72 shrink-0">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className={`w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-colors text-sm sm:text-base ${
            isDarkMode
              ? "bg-gray-800 border-gray-600 hover:bg-gray-700 text-white"
              : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-900"
          }`}
        >
          <span className="font-medium">
            {isArabic ? "الفلاتر" : "Filters"}
          </span>
          <svg
            className={`w-4 h-4 sm:w-5 sm:h-5 transform transition-transform ${
              showMobileFilters ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Filter Panel */}
      <div
        className={`${
          showMobileFilters ? "block" : "hidden"
        } lg:block rounded-lg p-4 sm:p-6 shadow-sm border ${
          isDarkMode
            ? "bg-gray-800 border-gray-600"
            : "bg-white border-gray-200"
        } ${isArabic ? "text-right" : "text-left"}`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* Filter Header */}
        <div
          className={`flex items-center mb-4 sm:mb-6 justify-between ${
            isArabic ? "flex-row-reverse" : ""
          }`}
        >
          <h2
            className={`text-base sm:text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {isArabic ? "تصفية حسب" : "Filter By"}
          </h2>
          <button
            onClick={clearAllFilters}
            className="text-xs sm:text-sm text-[#B39E7A] cursor-pointer font-medium transition-colors hover:text-[#A08B6F]"
          >
            {isArabic ? "مسح الكل" : "Clear All"}
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className={`w-full flex items-center text-xs sm:text-sm font-medium mb-2 sm:mb-3 transition-colors ${
              isArabic ? "justify-between flex-row-reverse" : "justify-between"
            } ${
              isDarkMode
                ? "text-white hover:text-gray-300"
                : "text-gray-900 hover:text-gray-700"
            }`}
          >
            <span>{isArabic ? "الفئة" : "Category"}</span>
            <svg
              className={`w-3 h-3 sm:w-4 sm:h-4 transform transition-transform ${
                showCategoryDropdown ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {showCategoryDropdown && (
            <div className="space-y-1.5 sm:space-y-2">
              {CATEGORIES.map((category) => (
                <label
                  key={category}
                  className={`flex items-center cursor-pointer ${
                    isArabic
                      ? "flex-row-reverse justify-start"
                      : "justify-start"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={filters.category.includes(category)}
                    onChange={() =>
                      handleArrayFilterChange("category", category)
                    }
                    className="w-3 h-3 sm:w-4 sm:h-4 accent-[#C1B092]"
                  />
                  <span
                    className={`text-xs sm:text-sm ${isArabic ? "ml-2 sm:ml-3" : "ml-2 sm:ml-3"} ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {isArabic ? {
                      "Men": "رجال",
                      "Women": "نساء", 
                      "Kids": "أطفال",
                      "Accessories": "إكسسوارات",
                      "Electronics": "إلكترونيات",
                      "Home & Garden": "منزل وحديقة",
                      "Sports": "رياضة",
                      "Beauty": "جمال"
                    }[category] || category : category}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="mb-6 sm:mb-8">
          <h3
            className={`text-xs sm:text-sm font-medium mb-2 sm:mb-3 ${
              isArabic ? "text-right" : "text-left"
            } ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            {isArabic ? "السعر" : "Price"}
          </h3>
          <div className="px-1 sm:px-2">
            <input
              type="range"
              min="0"
              max="500"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handleFilterChange("priceRange", [0, parseInt(e.target.value)])
              }
              className="slider w-full cursor-pointer h-1.5 sm:h-2"
            />
            <div
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2 mt-2 ${
                isArabic ? "sm:flex-row-reverse" : ""
              }`}
            >
              <span
                className={`text-xs sm:text-sm text-[#B39E7A] border rounded-lg px-2 py-1 whitespace-nowrap ${
                  isDarkMode ? "bg-gray-700" : "bg-[#F6F6F6]"
                }`}
              >
                {isArabic
                  ? `الحد الأدنى: $${filters.priceRange[0]}`
                  : `Min: $${filters.priceRange[0]}`}
              </span>
              <span
                className={`text-xs sm:text-sm text-[#B39E7A] border rounded-lg px-2 py-1 whitespace-nowrap ${
                  isDarkMode ? "bg-gray-700" : "bg-[#F6F6F6]"
                }`}
              >
                {isArabic
                  ? `الحد الأقصى: $${filters.priceRange[1]}`
                  : `Max: $${filters.priceRange[1]}`}
              </span>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-6 sm:mb-8">
          <h3
            className={`text-xs sm:text-sm font-medium mb-2 sm:mb-3 ${
              isArabic ? "text-right" : "text-left"
            } ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            {isArabic ? "التقييم" : "Rating"}
          </h3>
          <div className="space-y-1.5 sm:space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className={`flex items-center cursor-pointer ${
                  isArabic ? "flex-row-reverse justify-start" : "justify-start"
                }`}
              >
                <input
                  type="checkbox"
                  checked={filters.rating.includes(rating.toString())}
                  onChange={() =>
                    handleArrayFilterChange("rating", rating.toString())
                  }
                  className="w-3 h-3 sm:w-4 sm:h-4 accent-[#C1B092]"
                />
                <span
                  className={`text-xs sm:text-sm ${isArabic ? "ml-2 sm:ml-3" : "ml-2 sm:ml-3"} ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {rating} {isArabic ? "نجوم" : "stars"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="mb-6 sm:mb-8">
          <h3
            className={`text-xs sm:text-sm font-medium mb-2 sm:mb-3 ${
              isArabic ? "text-right" : "text-left"
            } ${isDarkMode ? "text-white" : "text-gray-900"}`}
          >
            {isArabic ? "الماركة" : "Brand"}
          </h3>
          <div className="space-y-1.5 sm:space-y-2 max-h-40 sm:max-h-48 overflow-y-auto">
            {BRANDS.map((brand) => (
              <label
                key={brand}
                className={`flex items-center cursor-pointer ${
                  isArabic ? "flex-row-reverse justify-start ml-2 sm:ml-3" : "justify-start"
                }`}
              >
                <input
                  type="checkbox"
                  checked={filters.brand.includes(brand)}
                  onChange={() => handleArrayFilterChange("brand", brand)}
                  className="w-3 h-3 sm:w-4 sm:h-4 accent-[#C1B092]"
                />
                <span
                  className={`text-xs sm:text-sm ${isArabic ? "ml-2 sm:ml-3" : "ml-2 sm:ml-3"} ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
