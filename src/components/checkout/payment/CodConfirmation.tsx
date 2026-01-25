import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';

export const CodConfirmation = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className={`mt-4 sm:mt-6 p-4 sm:p-6 rounded-xl border-2 ${
        isDarkMode ? 'bg-slate-700 border-green-700' : 'bg-white border-green-200'
      }`}
    >
      <h3 className={`text-base sm:text-lg font-semibold mb-3 ${
        isDarkMode ? 'text-white' : 'text-gray-800'
      }`}>{t('checkout.payment.cod.title')}</h3>
      <p className={`text-xs sm:text-sm ${
        isDarkMode ? 'text-slate-300' : 'text-gray-600'
      }`}>{t('checkout.payment.codNotice')}</p>
    </motion.div>
  );
};
