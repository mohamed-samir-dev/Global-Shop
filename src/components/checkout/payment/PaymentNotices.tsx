import { AlertCircle, Info } from 'lucide-react';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';

export const PaymentNotices = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <>
      <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl border-2 ${
        isDarkMode ? 'bg-amber-900/20 border-amber-700' : 'bg-amber-50 border-amber-300'
      }`}>
        <div className="flex items-start gap-2 sm:gap-3">
          <AlertCircle className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 ${
            isDarkMode ? 'text-amber-400' : 'text-amber-600'
          }`} />
          <div className="text-xs sm:text-sm">
            <p className={`font-bold mb-1 ${
              isDarkMode ? 'text-amber-300' : 'text-amber-800'
            }`}>{t('checkout.payment.experimentalNotice')}</p>
            <p className={isDarkMode ? 'text-amber-400' : 'text-amber-700'}>{t('checkout.payment.experimentalDesc')}</p>
          </div>
        </div>
      </div>
      
      <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl border ${
        isDarkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
      }`}>
        <div className="flex items-start gap-2 sm:gap-3">
          <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <p className={`font-semibold mb-1 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>{t('checkout.payment.securityInfo')}</p>
            <p className={`text-xs ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}>{t('checkout.payment.securityDesc')}</p>
          </div>
        </div>
      </div>
    </>
  );
};
