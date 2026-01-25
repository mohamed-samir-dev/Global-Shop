import { Package, Heart } from "lucide-react";
import { useTranslation } from "@/src/i18n/hooks/useTranslation";

interface QuickStatsProps {
  stats: { orders: number; wishlist: number };
}

export const QuickStats = ({ stats }: QuickStatsProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">{t('profile.quickStats.title')}</h3>
        
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg shrink-0">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200">{t('profile.quickStats.orders')}</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.orders}</span>
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-red-600 rounded-lg shrink-0">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200">{t('profile.quickStats.wishlist')}</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">{stats.wishlist}</span>
          </div>
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
