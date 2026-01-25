import { Clock, Truck, Shield, Package } from 'lucide-react';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';

export const ShippingInfo = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <div className={`rounded-2xl shadow-lg p-4 sm:p-6 border ${
      isDarkMode ? 'bg-linear-to-r from-blue-900/20 to-purple-900/20 border-blue-800' : 'bg-linear-to-r from-blue-50 to-purple-50 border-blue-100'
    }`}>
      <h3 className={`text-base sm:text-lg font-bold mb-4 flex items-center ${
        isDarkMode ? 'text-white' : 'text-gray-800'
      }`}>
        <Package className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
        {t('checkout.shipping2.title')}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        <div className="flex items-start">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-blue-600 shrink-0 mt-1" />
          <div>
            <p className={`font-semibold text-xs sm:text-sm ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{t('checkout.shipping2.deliveryTime')}</p>
            <p className={`text-xs ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}>{t('checkout.shipping2.deliveryLabel')}</p>
          </div>
        </div>
        <div className="flex items-start">
          <Truck className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-green-600 shrink-0 mt-1" />
          <div>
            <p className={`font-semibold text-xs sm:text-sm ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{t('checkout.shipping2.freeShipping')}</p>
            <p className={`text-xs ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}>{t('checkout.shipping2.freeShippingDesc')}</p>
          </div>
        </div>
        <div className="flex items-start">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-purple-600 shrink-0 mt-1" />
          <div>
            <p className={`font-semibold text-xs sm:text-sm ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{t('checkout.shipping2.secure')}</p>
            <p className={`text-xs ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}>{t('checkout.shipping2.secureDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
