'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/hooks/useCart';
import CheckoutService, { ShippingAddress, CheckoutValidation } from '@/services/checkoutService';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckoutProgress } from '@/components/checkout/CheckoutProgress';
import { ShippingForm } from '@/components/checkout/ShippingForm';
import { PaymentForm } from '@/components/checkout/PaymentForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useTranslation } from '@/i18n/hooks/useTranslation';

const CheckoutPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const { itemCount, clearCart } = useCart();
  const { t, isArabic } = useTranslation();
  
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState<CheckoutValidation | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [notes, setNotes] = useState('');
  const [governorate, setGovernorate] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=checkout');
      return;
    }
    
    if (itemCount === 0) {
      toast.error(t('checkout.messages.emptyCart'));
      router.push('/cart');
      return;
    }

    validateCheckout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, itemCount]);

  const validateCheckout = async () => {
    setIsLoading(true);
    try {
      const result = await CheckoutService.validateCheckout();
      setValidation(result);
      
      if (!result.isValid) {
        toast.error(t('checkout.messages.reviewCart'));
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
      router.push('/cart');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['fullName', 'address', 'city', 'postalCode', 'country', 'phone'];
    const missingFields = requiredFields.filter(field => 
      !shippingAddress[field as keyof ShippingAddress]
    );
    
    if (missingFields.length > 0) {
      toast.error(t('checkout.messages.fillRequired'));
      return;
    }
    
    setCurrentStep(2);
  };

  const handleOrderSubmit = async () => {
    if (!validation?.isValid) {
      toast.error(t('checkout.messages.resolveIssues'));
      return;
    }

    setIsLoading(true);
    try {
      const orderResult = await CheckoutService.createOrder(
        shippingAddress,
        paymentMethod,
        notes
      );

      if (orderResult.success) {
        const paymentResult = {
          id: `pay_${Date.now()}`,
          status: 'completed',
          update_time: new Date().toISOString(),
          email_address: user?.email || '',
          transaction_id: `txn_${Date.now()}`
        };

        await CheckoutService.processPayment(orderResult.order._id, paymentResult);
        await clearCart();
        toast.success(t('checkout.messages.orderSuccess'));
        router.push(`/order-success?orderId=${orderResult.order._id}`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !validation) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-slate-900' : 'bg-linear-to-br from-blue-50 to-indigo-100'
      }`}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-6 sm:py-8 md:py-12 ${isArabic ? 'rtl' : 'ltr'} ${
      isDarkMode ? 'bg-slate-900' : 'bg-linear-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {t('checkout.title')}
          </h1>
          <p className={`text-sm sm:text-base ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{t('checkout.subtitle')}</p>
        </motion.div>
        
        <CheckoutProgress currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-10 sm:mt-10 md:mt-16">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <ShippingForm
                  shippingAddress={shippingAddress}
                  setShippingAddress={setShippingAddress}
                  governorate={governorate}
                  setGovernorate={setGovernorate}
                  onSubmit={handleAddressSubmit}
                />
              )}

              {currentStep === 2 && (
                <PaymentForm
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  notes={notes}
                  setNotes={setNotes}
                  isLoading={isLoading}
                  validation={validation}
                  onBack={() => setCurrentStep(1)}
                  onSubmit={handleOrderSubmit}
                />
              )}
            </AnimatePresence>
          </div>

          <OrderSummary validation={validation} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
