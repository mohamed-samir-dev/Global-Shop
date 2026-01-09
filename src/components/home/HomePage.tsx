'use client';

import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import HeroSection from '@/components/home/HeroSection';
import PromoBanner from '@/components/home/PromoBanner';
import { heroSlides } from '@/data/heroData';

export default function HomePage() {
  const { isLoading } = useAuth();
  const { isDarkMode } = useTheme();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? '  bg-[#191C21]' : 'bg-gray-50'
    }`}>
      <HeroSection slides={heroSlides} />
      <PromoBanner />
    </div>
);
}