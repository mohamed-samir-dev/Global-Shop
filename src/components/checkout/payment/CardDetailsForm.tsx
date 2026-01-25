import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';
import { CardDetails } from './types';

interface CardDetailsFormProps {
  cardDetails: CardDetails;
  setCardDetails: React.Dispatch<React.SetStateAction<CardDetails>>;
}

export const CardDetailsForm = ({ cardDetails, setCardDetails }: CardDetailsFormProps) => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className={`mt-4 sm:mt-6 p-4 sm:p-6 rounded-xl border-2 ${
        isDarkMode ? 'bg-slate-700 border-blue-700' : 'bg-white border-blue-200'
      }`}
    >
      <h3 className={`text-base sm:text-lg font-semibold mb-4 ${
        isDarkMode ? 'text-white' : 'text-gray-800'
      }`}>{t('checkout.payment.card.cardInfo')}</h3>
      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-slate-300' : 'text-gray-700'
          }`}>{t('checkout.payment.card.cardNumber')}</label>
          <input
            type="text"
            placeholder={t('checkout.payment.card.cardNumberPlaceholder')}
            value={cardDetails.number}
            onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:border-blue-500 ${
              isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
            maxLength={19}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-slate-300' : 'text-gray-700'
          }`}>{t('checkout.payment.card.cardholderName')}</label>
          <input
            type="text"
            placeholder={t('checkout.payment.card.cardholderPlaceholder')}
            value={cardDetails.name}
            onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:border-blue-500 ${
              isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>{t('checkout.payment.card.expiryDate')}</label>
            <input
              type="text"
              placeholder={t('checkout.payment.card.expiryPlaceholder')}
              value={cardDetails.expiry}
              onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:border-blue-500 ${
                isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              maxLength={5}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>{t('checkout.payment.card.cvv')}</label>
            <input
              type="text"
              placeholder={t('checkout.payment.card.cvvPlaceholder')}
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:border-blue-500 ${
                isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              maxLength={4}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
