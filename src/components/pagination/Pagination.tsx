'use client';

import { useTheme } from '@/context/ThemeContext';
import { PaginationProps } from './types';
import { getVisiblePages } from './utils';
import { PaginationButton, PageNumber } from './components';

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const { isDarkMode } = useTheme();

  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex justify-center items-center gap-1 mt-12 mb-8">
      <PaginationButton
        direction="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        isDarkMode={isDarkMode}
      />

      <div className="flex items-center gap-1 mx-2">
        {visiblePages.map((page, index) => (
          <PageNumber
            key={page === '...' ? `dots-${index}` : page}
            page={page}
            isActive={page === currentPage}
            isDarkMode={isDarkMode}
            onClick={onPageChange}
          />
        ))}
      </div>

      <PaginationButton
        direction="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}