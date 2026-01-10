'use client';

import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n';
import { Filters, FilterChangeHandler } from "../types";
import ResultsInfo from "./ResultsInfo";
import { Grid, List } from "lucide-react";

interface SortControlsProps {
  filters: Filters;
  handleFilterChange: FilterChangeHandler;
}

export default function SortControls({
  filters,
  handleFilterChange,
}: SortControlsProps) {
  const { isDarkMode } = useTheme();
  const { isArabic, t } = useTranslation();
  
  const sortOptions = [
    { value: "featured", label: t('shop.sortOptions.featured') as string },
    { value: "price-low", label: t('shop.sortOptions.priceLow') as string },
    { value: "price-high", label: t('shop.sortOptions.priceHigh') as string },
    { value: "rating", label: t('shop.sortOptions.rating') as string },
    { value: "newest", label: t('shop.sortOptions.newest') as string },
    { value: "bestselling", label: t('shop.sortOptions.bestselling') as string },
  ];
  
  return (
    <div className={`flex flex-col gap-4 mb-6 ${isArabic ? 'sm:flex-row-reverse' : 'sm:flex-row'} sm:items-center sm:justify-between`}>
      <ResultsInfo filters={filters} />
      <div className={`flex items-center gap-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>{t('shop.controls.view') as string}</span>
          <div className={`flex border rounded-md overflow-hidden ${
            isDarkMode ? 'border-gray-600' : 'border-gray-300'
          }`}>
            <button
              onClick={() => handleFilterChange("viewMode", "grid")}
              className={`p-2 ${
                filters.viewMode === 'grid' 
                  ? 'bg-[#B39E7A] text-white' 
                  : isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => handleFilterChange("viewMode", "list")}
              className={`p-2 ${
                filters.viewMode === 'list' 
                  ? 'bg-[#B39E7A] text-white' 
                  : isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label
            htmlFor="sort"
            className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t('shop.controls.sortBy') as string}
          </label>
          <select
            id="sort"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className={`px-3 py-2 text-sm border accent-[#C1B092] ${
              isDarkMode 
                ? 'bg-gray-800 text-white border-gray-600'
                : 'bg-white text-black border-gray-300'
            }`}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}