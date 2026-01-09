import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isArabic: boolean;
  isDarkMode: boolean;
  isMobile?: boolean;
}

export const SearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  isArabic, 
  isDarkMode,
  isMobile = false 
}: SearchBarProps) => {
  const { t, isReady } = useTranslation();
  
  return (
    <div className={`relative ${isMobile ? 'w-full' : 'w-full'}`}>
      <div className={`absolute inset-y-0 ${(isReady && isArabic) ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
        <MagnifyingGlassIcon className={`h-5 w-5 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`} />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`block w-full ${(isReady && isArabic) ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-text ${
          isDarkMode 
            ? 'border-gray-600 bg-[#26292E] text-white placeholder-gray-400' 
            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
        }`}
        placeholder={t('navbar.searchPlaceholder') as string}
        dir={(isReady && isArabic) ? 'rtl' : 'ltr'}
      />
    </div>
  );
};