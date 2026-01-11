import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
  isDarkMode: boolean;
}

export default function PaginationButton({ direction, onClick, disabled, isDarkMode }: PaginationButtonProps) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ease-out ${
        disabled
          ? 'cursor-not-allowed opacity-40'
          : isDarkMode
          ? 'hover:bg-gray-700 hover:shadow-lg hover:scale-105 text-gray-300 hover:text-white'
          : 'hover:bg-gray-100 hover:shadow-lg hover:scale-105 text-gray-600 hover:text-gray-900'
      }`}
    >
      <Icon className={`w-5 h-5 transition-transform duration-200 ${
        direction === 'prev' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'
      }`} />
    </button>
  );
}