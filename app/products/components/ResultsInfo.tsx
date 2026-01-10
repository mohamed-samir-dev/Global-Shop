'use client';

import { useTheme } from '@/context/ThemeContext';
import { useProducts } from "@/src/hooks/useProducts";
import { Filters } from "../types";

interface ResultsInfoProps {
  filters: Filters;
}

export default function ResultsInfo({ filters }: ResultsInfoProps) {
  const { isDarkMode } = useTheme();
  const { filteredCount } = useProducts({
    ...filters,
    searchQuery: "",
  });

  return (
    <p className={`text-sm ${
      isDarkMode ? 'text-gray-400' : 'text-gray-600'
    }`}>
      Showing <span className="font-medium">{Math.min(filteredCount, 24)}</span>{" "}
      of <span className="font-medium">{filteredCount}</span> results
    </p>
  );
}