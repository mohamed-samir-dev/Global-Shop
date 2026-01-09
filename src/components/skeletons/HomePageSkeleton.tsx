'use client';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTheme } from '@/context/ThemeContext';

export default function HomePageSkeleton() {
  const { isDarkMode } = useTheme();

  return (
    <SkeletonTheme baseColor={isDarkMode ? "#2a2a2a" : "#ebebeb"} highlightColor={isDarkMode ? "#3a3a3a" : "#f5f5f5"}>
      <div className={`min-h-screen ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`}>
        {/* Hero Section Skeleton */}
        <div className={`${isDarkMode ? 'bg-[#191C21]' : 'bg-[#F1F1F0]'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-20">
            <div className="flex flex-col lg:flex-row items-center justify-between min-h-[500px]">
              <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                <Skeleton height={60} width="80%" className="mb-6" />
                <Skeleton height={24} width="90%" className="mb-4" />
                <Skeleton height={24} width="70%" className="mb-8" />
                <Skeleton height={48} width={200} />
              </div>
              <div className="hidden lg:block lg:w-1/2">
                <Skeleton height={384} width={600} />
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <Skeleton height={4} width={32} />
            <Skeleton height={4} width={8} />
            <Skeleton height={4} width={8} />
          </div>
        </div>

        {/* Promo Banner Skeleton */}
        <div className={`py-8 sm:py-12 ${isDarkMode ? 'bg-[#232323]' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton height={36} width={300} className="mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <Skeleton height={200} className="mb-4" />
                  <Skeleton height={24} width="80%" className="mb-2" />
                  <Skeleton height={20} width="60%" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}