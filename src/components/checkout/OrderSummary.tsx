import { motion } from 'framer-motion';
import { Package, Shield } from 'lucide-react';
import { CheckoutValidation } from '@/services/checkoutService';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';

interface OrderSummaryProps {
  validation: CheckoutValidation | null;
}

export const OrderSummary = ({ validation }: OrderSummaryProps) => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="lg:col-span-1"
    >
      <div className={`rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 border sticky top-4 ${
        isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'
      }`}>
        <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          <Package className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
          {t('checkout.summary.title')}
        </h3>
        
        {validation?.errors && validation.errors.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mb-4 p-4 border-2 rounded-xl ${
              isDarkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
            }`}
          >
            <h4 className={`text-sm font-bold mb-2 ${
              isDarkMode ? 'text-red-400' : 'text-red-800'
            }`}>{t('checkout.summary.cartIssues')}</h4>
            {validation.errors.map((error, index) => (
              <p key={index} className={`text-sm ${
                isDarkMode ? 'text-red-400' : 'text-red-600'
              }`}>
                • {error.message}
              </p>
            ))}
          </motion.div>
        )}
        
        {validation?.validItems && (
          <div className="space-y-3 mb-4 sm:mb-6 max-h-48 sm:max-h-64 overflow-y-auto">
            {validation.validItems.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex justify-between items-start pb-3 border-b ${
                  isDarkMode ? 'border-slate-600' : 'border-gray-100'
                }`}
              >
                <div className="flex-1">
                  <p className={`font-semibold text-sm ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{item.name}</p>
                  <p className={`text-xs mt-1 ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-500'
                  }`}>Qty: {item.quantity}</p>
                </div>
                <span className="font-bold text-sm sm:text-base text-blue-600">{item.itemTotal.toFixed(2)} EGP</span>
              </motion.div>
            ))}
          </div>
        )}
        
        {validation?.pricing && (
          <div className={`border-t-2 pt-4 space-y-3 ${
            isDarkMode ? 'border-slate-600' : 'border-gray-100'
          }`}>
            <div className={`flex justify-between text-sm ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}>
              <span>{t('checkout.summary.subtotal')}</span>
              <span className="font-semibold">{validation.pricing.subtotal.toFixed(2)} EGP</span>
            </div>
            <div className={`flex justify-between text-sm ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}>
              <span>{t('checkout.summary.tax')}</span>
              <span className="font-semibold">{validation.pricing.taxPrice.toFixed(2)} EGP</span>
            </div>
            <div className={`flex justify-between text-sm ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}>
              <span>{t('checkout.summary.shipping')}</span>
              <span className="font-semibold">
                {validation.pricing.shippingPrice === 0 ? (
                  <span className="text-green-600 font-bold">{t('checkout.summary.free')}</span>
                ) : (
                  `${validation.pricing.shippingPrice.toFixed(2)} EGP`
                )}
              </span>
            </div>
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className={`flex justify-between items-center font-bold text-lg sm:text-xl pt-4 border-t-2 ${
                isDarkMode ? 'border-slate-600' : 'border-gray-200'
              }`}
            >
              <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>{t('checkout.summary.total')}</span>
              <span className="text-xl sm:text-2xl bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {validation.pricing.totalPrice.toFixed(2)} EGP
              </span>
            </motion.div>
            <div className={`p-4 rounded-xl mt-4 border ${
              isDarkMode ? 'bg-linear-to-r from-blue-900/20 to-purple-900/20 border-blue-800' : 'bg-linear-to-r from-blue-50 to-purple-50 border-blue-100'
            }`}>
              <p className={`text-xs flex items-center ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>
                <Shield className="inline w-4 h-4 mr-2 text-blue-600" />
                <span className="font-semibold">{t('checkout.summary.secureCheckout')}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
