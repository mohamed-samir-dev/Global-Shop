import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';

interface CheckoutProgressProps {
  currentStep: number;
}

export const CheckoutProgress = ({ currentStep }: CheckoutProgressProps) => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-12 px-2 sm:px-0"
    >
      <div className="flex items-center justify-center">
        <div className="flex items-center">
          <motion.div 
            animate={{ scale: currentStep >= 1 ? 1 : 0.9 }}
            className={`relative ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold shadow-lg ${
              currentStep >= 1 ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' : (isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-600')
            }`}>
              {currentStep > 1 ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /> : '1'}
            </div>
            <span className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm font-medium whitespace-nowrap ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              {t('checkout.progress.shipping')}
            </span>
          </motion.div>
        </div>
        
        <motion.div 
          className={`w-16 sm:w-24 md:w-32 h-1 mx-2 sm:mx-3 md:mx-4 rounded-full overflow-hidden ${
            isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
          }`}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ width: '0%' }}
            animate={{ width: currentStep >= 2 ? '100%' : '0%' }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
        
        <div className="flex items-center">
          <motion.div 
            animate={{ scale: currentStep >= 2 ? 1 : 0.9 }}
            className={`relative ${currentStep >= 2 ? 'text-purple-600' : 'text-gray-400'}`}
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold shadow-lg ${
              currentStep >= 2 ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white' : (isDarkMode ? 'bg-slate-700' : 'bg-gray-200')
            }`}>
              2
            </div>
            <span className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm font-medium whitespace-nowrap ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              {t('checkout.progress.payment')}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
