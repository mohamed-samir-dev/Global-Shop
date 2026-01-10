import { Filters, FilterChangeHandler, ArrayFilterChangeHandler } from "../types";
import { CATEGORIES, BRANDS, AVAILABILITY_OPTIONS } from "../constants";

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
  return (
    <div className="lg:w-80 shrink-0">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium text-gray-900">Filters</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${
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
        } lg:block bg-white border border-gray-200 rounded-lg p-6 shadow-sm`}
      >
        {/* Filter Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Filter By</h2>
          <button
            onClick={clearAllFilters}
            className="text-sm text-[#B39E7A] cursor-pointer font-medium transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="w-full flex items-center justify-between text-sm font-medium text-gray-900 mb-3 hover:text-gray-700 transition-colors"
          >
            <span>Category</span>
            <svg
              className={`w-4 h-4 transform transition-transform ${
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
            <div className="space-y-2">
              {CATEGORIES.map((category) => (
                <label
                  key={category}
                  className="flex items-center cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.category.includes(category)}
                    onChange={() =>
                      handleArrayFilterChange("category", category)
                    }
                    className="w-4 h-4 accent-[#C1B092]"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Price</h3>
          <div className="px-2">
            <input
              type="range"
              min="0"
              max="500"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handleFilterChange("priceRange", [0, parseInt(e.target.value)])
              }
              className="slider w-full cursor-pointer"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-[#B39E7A] border bg-[#F6F6F6] rounded-lg px-2 py-1">
                Min: ${filters.priceRange[0]}
              </span>
              <span className="text-sm text-[#B39E7A] border bg-[#F6F6F6] rounded-lg px-2 py-1">
                Max: ${filters.priceRange[1]}
              </span>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Rating</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.rating.includes(rating.toString())}
                  onChange={() =>
                    handleArrayFilterChange("rating", rating.toString())
                  }
                  className="w-4 h-4 text-[#C1B092] accent-[#C1B092]"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  {rating} stars
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Brand</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {BRANDS.map((brand) => (
              <label
                key={brand}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.brand.includes(brand)}
                  onChange={() => handleArrayFilterChange("brand", brand)}
                  className="w-4 h-4 text-[#C1B092] accent-[#C1B092]"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </div>


        {/* Availability Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Availability
          </h3>
          <div className="space-y-2">
            {AVAILABILITY_OPTIONS.map((status) => (
              <label
                key={status}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="radio"
                  name="availability"
                  value={status}
                  checked={filters.availability === status}
                  onChange={(e) =>
                    handleFilterChange("availability", e.target.value)
                  }
                  className="w-4 h-4 text-[#C1B092] accent-[#C1B092]"
                />
                <span className="ml-3 text-sm text-gray-700">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Discount Filter */}
        <div className="mb-6">
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.discount}
              onChange={(e) =>
                handleFilterChange("discount", e.target.checked)
              }
              className="w-4 h-4 text-[#C1B092] accent-[#C1B092]"
            />
            <span className="ml-3 text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
              On Sale
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}