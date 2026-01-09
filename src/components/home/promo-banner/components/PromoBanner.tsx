'use client';

import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n';
import { PromoBannerProps } from '../types';
import { defaultPromoItems } from '../data/promoItems';
import PromoCard from './PromoCard';

export default function PromoBanner({ items = defaultPromoItems, className = '' }: PromoBannerProps) {
  const { isDarkMode } = useTheme();
  const { t, isArabic } = useTranslation();

  return (
    <div className={`py-8 sm:py-12 ${isDarkMode ? 'bg-[#232323]' : 'bg-white'} ${className}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left ${isDarkMode ? 'text-white' : 'text-gray-900'} ${isArabic ? 'sm:text-right' : 'sm:text-left'}`}>
          {String(t('home.promoBanner.title'))}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {items.map((item) => (
            <PromoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}