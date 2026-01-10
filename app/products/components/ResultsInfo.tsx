'use client';

import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n';
import { useProducts } from "@/src/hooks/useProducts";
import { Filters } from "../types";

interface ResultsInfoProps {
  filters: Filters;
}

export default function ResultsInfo({ filters }: ResultsInfoProps) {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const { filteredCount } = useProducts({
    ...filters,
    searchQuery: "",
  });

  return (
    <p className={`text-sm ${
      isDarkMode ? 'text-gray-400' : 'text-gray-600'
    }`}>
      {t('shop.results.showing')} <span className="font-medium">{Math.min(filteredCount, 24)}</span>{" "}
      {t('shop.results.of')} <span className="font-medium">{filteredCount}</span> {t('shop.results.results')}
    </p>
  );
}