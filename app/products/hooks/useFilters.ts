import { useState } from "react";
import { Filters } from "../types";
import { DEFAULT_FILTERS } from "../constants";

export const useFilters = () => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleFilterChange = (
    filterType: string,
    value: string | [number, number] | boolean
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleArrayFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: (
        prev[filterType as keyof typeof prev] as string[]
      ).includes(value)
        ? (prev[filterType as keyof typeof prev] as string[]).filter(
            (item) => item !== value
          )
        : [...(prev[filterType as keyof typeof prev] as string[]), value],
    }));
  };

  const clearAllFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return {
    filters,
    showMobileFilters,
    showCategoryDropdown,
    setShowMobileFilters,
    setShowCategoryDropdown,
    handleFilterChange,
    handleArrayFilterChange,
    clearAllFilters,
  };
};