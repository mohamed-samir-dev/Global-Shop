import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import { ShippingAddress } from '@/services/checkoutService';
import { EGYPT_GOVERNORATES } from '@/constants/checkout';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';

interface ShippingFormProps {
  shippingAddress: ShippingAddress;
  setShippingAddress: React.Dispatch<React.SetStateAction<ShippingAddress>>;
  governorate: string;
  setGovernorate: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => void;
}

export const ShippingForm = ({ 
  shippingAddress, 
  setShippingAddress, 
  governorate, 
  setGovernorate, 
  onSubmit 
}: ShippingFormProps) => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={`rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border ${
        isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'
      }`}
    >
      <div className="flex items-center mb-4 sm:mb-6">
        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 sm:mr-3" />
        <h2 className={`text-xl sm:text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>{t('checkout.shipping.title')}</h2>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${
            isDarkMode ? 'text-slate-300' : 'text-gray-700'
          }`}>
            {t('checkout.shipping.fullName')} *
          </label>
          <input
            type="text"
            required
            value={shippingAddress.fullName}
            onChange={(e) => setShippingAddress(prev => ({
              ...prev,
              fullName: e.target.value
            }))}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
              isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-black'
            }`}
            placeholder={t('checkout.shipping.fullNamePlaceholder')}
          />
        </div>
        
        <div>
          <label className={`block text-sm font-semibold mb-2 ${
            isDarkMode ? 'text-slate-300' : 'text-gray-700'
          }`}>
            {t('checkout.shipping.address')} *
          </label>
          <input
            type="text"
            required
            value={shippingAddress.address}
            onChange={(e) => setShippingAddress(prev => ({
              ...prev,
              address: e.target.value
            }))}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
              isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-black'
            }`}
            placeholder={t('checkout.shipping.addressPlaceholder')}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              {t('checkout.shipping.governorate')} *
            </label>
            <select
              required
              value={governorate}
              onChange={(e) => {
                setGovernorate(e.target.value);
                setShippingAddress(prev => ({ ...prev, city: e.target.value }));
              }}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
                isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-black'
              }`}
            >
              <option value="">{t('checkout.shipping.selectGovernorate')}</option>
              {EGYPT_GOVERNORATES.map(gov => (
                <option key={gov} value={gov}>{gov}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              {t('checkout.shipping.postalCode')} *
            </label>
            <input
              type="text"
              required
              value={shippingAddress.postalCode}
              onChange={(e) => setShippingAddress(prev => ({
                ...prev,
                postalCode: e.target.value
              }))}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
                isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-black'
              }`}
              placeholder={t('checkout.shipping.postalCodePlaceholder')}
            />
          </div>
        </div>
        
        <div>
          <label className={`block text-sm font-semibold mb-2 ${
            isDarkMode ? 'text-slate-300' : 'text-gray-700'
          }`}>
            {t('checkout.shipping.district')} *
          </label>
          <input
            type="text"
            required
            placeholder={t('checkout.shipping.districtPlaceholder')}
            value={shippingAddress.country}
            onChange={(e) => setShippingAddress(prev => ({
              ...prev,
              country: e.target.value
            }))}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
              isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-black'
            }`}
          />
        </div>
        
        <div>
          <label className={`block text-sm font-semibold mb-2 flex items-center ${
            isDarkMode ? 'text-slate-300' : 'text-gray-700'
          }`}>
            <Phone className="w-4 h-4 mr-2 text-blue-600" />
            {t('checkout.shipping.phone')} *
          </label>
          <input
            type="tel"
            required
            placeholder={t('checkout.shipping.phonePlaceholder')}
            value={shippingAddress.phone}
            onChange={(e) => setShippingAddress(prev => ({
              ...prev,
              phone: e.target.value
            }))}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:border-blue-500 transition-colors ${
              isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-black'
            }`}
          />
          <p className={`text-xs mt-2 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-500'
          }`}>{t('checkout.shipping.phoneHint')}</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-linear-to-r from-blue-600 to-blue-500 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          {t('checkout.shipping.continue')}
        </motion.button>
      </form>
    </motion.div>
  );
};
