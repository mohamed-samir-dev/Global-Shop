'use client';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTheme } from '@/context/ThemeContext';

export default function NavbarSkeleton() {
  const { isDarkMode } = useTheme();

  return (
    <SkeletonTheme baseColor={isDarkMode ? "#2a2a2a" : "#ebebeb"} highlightColor={isDarkMode ? "#3a3a3a" : "#f5f5f5"}>
      <nav className={`${isDarkMode ? 'bg-[#191C21]' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} sticky top-0 z-50`} suppressHydrationWarning>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Skeleton height={32} width={120} />
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <Skeleton height={40} width="100%" />
            </div>
            <div className="hidden lg:flex items-center space-x-6">
              <Skeleton height={20} width={60} />
              <Skeleton height={20} width={60} />
              <Skeleton height={20} width={60} />
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton circle height={32} width={32} />
              <Skeleton circle height={32} width={32} />
              <Skeleton circle height={32} width={32} />
            </div>
          </div>
        </div>
      </nav>
    </SkeletonTheme>
  );
}