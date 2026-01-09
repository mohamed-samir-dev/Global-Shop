'use client';

import { useTheme } from '@/context/ThemeContext';

export default function LoadingSpinner() {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`flex justify-center items-center p-8 min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0F1419]' : 'bg-gray-50'
    }`}>
      <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
        isDarkMode ? 'border-blue-400' : 'border-blue-600'
      }`}></div>
    </div>
  );
}