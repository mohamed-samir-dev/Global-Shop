'use client';

import Link from "next/link";
import { useTheme } from '@/context/ThemeContext';

export default function PageHeader() {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`py-8 ${
      isDarkMode 
        ? 'bg-gray-800' 
        : 'bg-[#EBEBE9]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={`text-4xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Products</h1>
        <nav className={`text-sm ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <Link href="/" className={`transition-colors ${
            isDarkMode 
              ? 'hover:text-white' 
              : 'hover:text-gray-900'
          }`}>
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className={`font-medium ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Shop</span>
        </nav>
      </div>
    </div>
  );
}
