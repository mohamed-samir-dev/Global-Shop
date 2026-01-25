import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';

interface WalletDetailsFormProps {
  walletPhone: string;
  setWalletPhone: React.Dispatch<React.SetStateAction<string>>;
}

export const WalletDetailsForm = ({ walletPhone, setWalletPhone }: WalletDetailsFormProps) => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className={`mt-4 sm:mt-6 p-4 sm:p-6 rounded-xl border-2 ${
        isDarkMode ? 'bg-slate-700 border-purple-700' : 'bg-white border-purple-200'
      }`}
    >
      <h3 className={`text-base sm:text-lg font-semibold mb-4 ${
        isDarkMode ? 'text-white' : 'text-gray-800'
      }`}>{t('checkout.payment.wallet.walletDetails')}</h3>
      <div>
        <label className={`block text-sm font-medium mb-2 ${
          isDarkMode ? 'text-slate-300' : 'text-gray-700'
        }`}>{t('checkout.payment.wallet.mobileNumber')}</label>
        <input
          type="tel"
          placeholder={t('checkout.payment.wallet.mobilePlaceholder')}
          value={walletPhone}
          onChange={(e) => setWalletPhone(e.target.value)}
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:border-purple-500 ${
            isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
          }`}
          maxLength={11}
        />
        <p className={`text-xs mt-2 ${
          isDarkMode ? 'text-slate-400' : 'text-gray-600'
        }`}>{t('checkout.payment.wallet.mobileHint')}</p>
      </div>
    </motion.div>
  );
};
