'use client';

import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n';
import { PromoItem } from '../types';

interface PromoCardProps {
  item: PromoItem;
}

export default function PromoCard({ item }: PromoCardProps) {
  const { isDarkMode } = useTheme();
  const { t, isArabic } = useTranslation();

  return (
    <div className={`flex items-center rounded-lg p-4 sm:p-6 ${isDarkMode ? 'bg-[#3A3A3A]' : 'bg-gray-50'} ${isArabic ? 'flex-row-reverse' : 'flex-row'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={`flex-1 ${isArabic ? 'pl-4' : 'pr-4'}`}>
        <h3 className={`text-base sm:text-xl lg:text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'} ${isArabic ? 'text-right' : 'text-left'}`}>
          {String(t(item.titleKey))}
        </h3>
        <p className={`text-xs sm:text-sm lg:text-lg mb-3 sm:mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} ${isArabic ? 'text-right' : 'text-left'}`}>
          {String(t(item.descriptionKey))}
        </p>
        <button 
          className="bg-[#020204] text-white px-2 sm:px-4 lg:px-6 py-1 sm:py-2 rounded-full hover:bg-gray-800 transition-colors text-xs sm:text-sm lg:text-base"
          aria-label={String(t(item.buttonTextKey))}
        >
          {String(t(item.buttonTextKey))}
        </button>
      </div>
      <div className="shrink-0">
        <Image 
          src={item.imageUrl} 
          alt={item.imageAlt} 
          width={128}
          height={128}
          className="w-20 h-20 sm:w-32 sm:h-32 object-cover" 
        />
      </div>
    </div>
  );
}