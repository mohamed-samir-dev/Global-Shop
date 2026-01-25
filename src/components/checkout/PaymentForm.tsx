import { motion } from 'framer-motion';
import { CreditCard, Truck, Wallet, Lock } from 'lucide-react';
import { CheckoutValidation } from '@/services/checkoutService';
import { useState } from 'react';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { useTheme } from '@/context/ThemeContext';
import {
  PaymentMethodOption,
  CardDetailsForm,
  WalletDetailsForm,
  CodConfirmation,
  ShippingInfo,
  OrderNotes,
  PaymentNotices,
  CardDetails
} from './payment';

interface PaymentFormProps {
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  validation: CheckoutValidation | null;
  onBack: () => void;
  onSubmit: () => void;
}

export const PaymentForm = ({ 
  paymentMethod, 
  setPaymentMethod, 
  notes, 
  setNotes, 
  isLoading, 
  validation, 
  onBack, 
  onSubmit 
}: PaymentFormProps) => {
  const [cardDetails, setCardDetails] = useState<CardDetails>({ number: '', name: '', expiry: '', cvv: '' });
  const [walletPhone, setWalletPhone] = useState('');
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4 sm:space-y-6"
    >
      <div className={`rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border ${
        isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
          <div className="flex items-center">
            <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mr-2 sm:mr-3" />
            <h2 className={`text-xl sm:text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{t('checkout.payment.title')}</h2>
          </div>
          <div className={`flex items-center gap-2 text-xs ${
            isDarkMode ? 'text-slate-400' : 'text-gray-500'
          }`}>
            <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{t('checkout.payment.sslEncrypted')}</span>
          </div>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <PaymentMethodOption
            id="cod"
            value="cod"
            selected={paymentMethod === 'cod'}
            onSelect={(value) => setPaymentMethod(value)}
            icon={<Truck className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-600" />}
            title={t('checkout.payment.cod.title')}
            badge={t('checkout.payment.cod.noFees')}
            badgeColor="text-green-600"
            description={t('checkout.payment.cod.description')}
            features={[
              t('checkout.payment.cod.inspect'),
              t('checkout.payment.cod.trusted'),
              t('checkout.payment.cod.recommended')
            ]}
            borderColor={isDarkMode ? 'border-green-500' : 'border-green-500'}
            bgColor={isDarkMode ? 'bg-green-900/20' : 'bg-green-50'}
          />
          
          <PaymentMethodOption
            id="card"
            value="stripe"
            selected={paymentMethod === 'stripe'}
            onSelect={(value) => setPaymentMethod(value)}
            icon={<CreditCard className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />}
            title={t('checkout.payment.card.title')}
            badge={t('checkout.payment.card.secure')}
            badgeColor="text-blue-600"
            description={t('checkout.payment.card.description')}
            features={[
              t('checkout.payment.card.accepted'),
              t('checkout.payment.card.pci'),
              t('checkout.payment.card.secure3d')
            ]}
            borderColor={isDarkMode ? 'border-blue-500' : 'border-blue-500'}
            bgColor={isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}
          />
          
          <PaymentMethodOption
            id="wallet"
            value="wallet"
            selected={paymentMethod === 'wallet'}
            onSelect={(value) => setPaymentMethod(value)}
            icon={<Wallet className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-purple-600" />}
            title={t('checkout.payment.wallet.title')}
            badge={t('checkout.payment.wallet.fast')}
            badgeColor="text-purple-600"
            description={t('checkout.payment.wallet.description')}
            features={[
              t('checkout.payment.wallet.providers'),
              t('checkout.payment.wallet.instant'),
              t('checkout.payment.wallet.noCard')
            ]}
            borderColor={isDarkMode ? 'border-purple-500' : 'border-purple-500'}
            bgColor={isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50'}
          />
        </div>
        
        {paymentMethod === 'stripe' && (
          <CardDetailsForm cardDetails={cardDetails} setCardDetails={setCardDetails} />
        )}
        
        {paymentMethod === 'wallet' && (
          <WalletDetailsForm walletPhone={walletPhone} setWalletPhone={setWalletPhone} />
        )}
        
        {paymentMethod === 'cod' && <CodConfirmation />}
        
        <PaymentNotices />
      </div>
      
      <ShippingInfo />
      
      <OrderNotes
        notes={notes}
        setNotes={setNotes}
        isLoading={isLoading}
        validation={validation}
        onBack={onBack}
        onSubmit={onSubmit}
      />
    </motion.div>
  );
};
