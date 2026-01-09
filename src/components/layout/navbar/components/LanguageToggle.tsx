import { motion } from 'framer-motion';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

interface LanguageToggleProps {
  language: string;
  toggleLanguage: () => void;
  isArabic: boolean;
  isDarkMode: boolean;
}

export const LanguageToggle = ({ language, toggleLanguage, isArabic, isDarkMode }: LanguageToggleProps) => {
  return (
    <motion.button
      onClick={toggleLanguage}
      className={`flex items-center ${isArabic ? 'space-x-reverse space-x-1' : 'space-x-1'} px-3 py-2 text-sm font-medium cursor-pointer border rounded-lg transition-all ${
        isDarkMode 
          ? 'text-gray-300 hover:text-white border-gray-600 hover:border-gray-500' 
          : 'text-gray-600 hover:text-gray-900 border-gray-300 hover:border-gray-400'
      }`}
    >
      <GlobeAltIcon className="h-4 w-4" />
      <motion.span
        key={language}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {language}
      </motion.span>
    </motion.button>
  );
};