"use client";
import "../globals.css";
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n';
import { useFilters } from "./hooks/useFilters";
import {
  PageHeader,
  FilterSidebar,
  SortControls,
  ProductsSection,
  ProductsStyles,
} from "./components";

export default function ProductsPage() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();
  const {
    filters,
    showMobileFilters,
    showCategoryDropdown,
    setShowMobileFilters,
    setShowCategoryDropdown,
    handleFilterChange,
    handleArrayFilterChange,
    clearAllFilters,
  } = useFilters();

  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`} dir={isArabic ? 'rtl' : 'ltr'}>
      <PageHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          <FilterSidebar
            filters={filters}
            showMobileFilters={showMobileFilters}
            showCategoryDropdown={showCategoryDropdown}
            setShowMobileFilters={setShowMobileFilters}
            setShowCategoryDropdown={setShowCategoryDropdown}
            handleFilterChange={handleFilterChange}
            handleArrayFilterChange={handleArrayFilterChange}
            clearAllFilters={clearAllFilters}
          />
          <div className="flex-1 min-w-0">
            <SortControls filters={filters} handleFilterChange={handleFilterChange} />
            <ProductsSection filters={filters} />
          </div>
        </div>
      </div>
      
      <ProductsStyles />
    </div>
  );
}
