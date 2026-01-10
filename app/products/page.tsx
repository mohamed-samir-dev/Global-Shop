"use client";
import "../globals.css";
import { useTheme } from '@/context/ThemeContext';
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
    }`}>
      <PageHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
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
          
          <div className="flex-1">
            <SortControls
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
            <ProductsSection filters={filters} />
          </div>
        </div>
      </div>
      
      <ProductsStyles />
    </div>
  );
}
