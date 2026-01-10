'use client';

import { useTheme } from '@/context/ThemeContext';
import { Filters, FilterChangeHandler } from "../types";
import { SORT_OPTIONS } from "../constants";
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
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <ResultsInfo filters={filters} />
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>View:</span>
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
            Sort by:
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
            {SORT_OPTIONS.map((option) => (
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