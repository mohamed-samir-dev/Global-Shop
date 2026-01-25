import { Package, Heart } from "lucide-react";
import { useTranslation } from "@/src/i18n/hooks/useTranslation";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

interface QuickStatsProps {
  stats: { orders: number; wishlist: number };
}

export const QuickStats = ({ stats }: QuickStatsProps) => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className={`shadow-lg rounded-2xl p-4 sm:p-6 ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>{t('profile.quickStats.title')}</h3>
        
        <div className="space-y-3 sm:space-y-4">
          <Link href="/orders" className="block">
            <div className={`flex items-center justify-between p-3 sm:p-4 rounded-xl transition-colors cursor-pointer ${
              isDarkMode ? 'bg-blue-900/20 hover:bg-blue-900/30' : 'bg-blue-50 hover:bg-blue-100'
            }`}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg shrink-0">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className={`text-sm sm:text-base font-medium text-gray-700 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>{t('profile.quickStats.orders')}</span>
              </div>
              <span className={`text-xl sm:text-2xl font-bold ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>{stats.orders}</span>
            </div>
          </Link>

          <Link href="/wishlist" className="block">
            <div className={`flex items-center justify-between p-3 sm:p-4 rounded-xl transition-colors cursor-pointer ${
              isDarkMode ? 'bg-red-900/20 hover:bg-red-900/30' : 'bg-red-50 hover:bg-red-100'
            }`}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-red-600 rounded-lg shrink-0">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className={`text-sm sm:text-base font-medium text-gray-700 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>{t('profile.quickStats.wishlist')}</span>
              </div>
              <span className={`text-xl sm:text-2xl font-bold ${
                isDarkMode ? 'text-red-400' : 'text-red-600'
              }`}>{stats.wishlist}</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="bg-linear-to-br from-blue-600 to-indigo-700 shadow-lg rounded-2xl p-4 sm:p-6 text-white">
        <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">{t('profile.quickStats.needHelp')}</h3>
        <p className="text-xs sm:text-sm text-blue-100 mb-3 sm:mb-4">{t('profile.quickStats.supportDesc')}</p>
        <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-50 transition-colors">
          {t('profile.quickStats.contactSupport')}
        </button>
      </div>
    </div>
  );
};
