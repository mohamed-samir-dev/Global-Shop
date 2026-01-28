'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function NotFound() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="text-center">
        <h1 className={`text-6xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          404
        </h1>
        <h2 className={`text-2xl font-semibold mb-4 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Page Not Found
        </h2>
        <p className={`mb-8 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[#B39E7A] text-white rounded-lg hover:bg-[#9A8566] transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className={`px-6 py-3 rounded-lg transition-colors ${
              isDarkMode
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-white text-gray-900 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
