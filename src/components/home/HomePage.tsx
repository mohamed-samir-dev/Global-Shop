'use client';

import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { HomePageSkeleton } from '@/components/skeletons';
import HeroSection from '@/components/home/HeroSection';
import PromoBanner from '@/components/home/PromoBanner';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import { heroSlides } from '@/data/heroData';

export default function HomePage() {
  const { isLoading } = useAuth();
  const { isDarkMode } = useTheme();

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? '  bg-[#191C21]' : 'bg-gray-50'
    }`}>
      <HeroSection slides={heroSlides} />
      <PromoBanner />
      <FeaturedProducts />
    </div>
);
}