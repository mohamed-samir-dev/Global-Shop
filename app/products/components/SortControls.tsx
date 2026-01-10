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
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <ResultsInfo filters={filters} />
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 font-medium">View:</span>
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => handleFilterChange("viewMode", "grid")}
              className={`p-2 ${filters.viewMode === 'grid' ? 'bg-[#B39E7A] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => handleFilterChange("viewMode", "list")}
              className={`p-2 ${filters.viewMode === 'list' ? 'bg-[#B39E7A] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label
            htmlFor="sort"
            className="text-sm text-gray-700 font-medium"
          >
            Sort by:
          </label>
          <select
            id="sort"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="px-3 py-2 text-sm border accent-[#C1B092]"
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