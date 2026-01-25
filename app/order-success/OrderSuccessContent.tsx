'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import CheckoutService from '@/services/checkoutService';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { Order } from './types';
import LoadingState from './components/LoadingState';
import OrderNotFound from './components/OrderNotFound';
import SuccessHeader from './components/SuccessHeader';
import OrderItemsList from './components/OrderItemsList';
import ShippingAddressCard from './components/ShippingAddressCard';
import OrderSummaryCard from './components/OrderSummaryCard';
import NextStepsCard from './components/NextStepsCard';
import ActionButtons from './components/ActionButtons';

const OrderSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t, isArabic } = useTranslation();

  const loadOrder = useCallback(async (orderId: string) => {
    try {
      const result = await CheckoutService.getOrder(orderId);
      setOrder(result.order);
    } catch (error) {
      console.error('Error loading order:', error);
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const orderId = searchParams.get('orderId');
    if (!orderId) {
      router.push('/');
      return;
    }

    loadOrder(orderId);
  }, [user, searchParams, loadOrder, router]);

  if (isLoading) return <LoadingState isDarkMode={isDarkMode} />;
  if (!order) return <OrderNotFound isDarkMode={isDarkMode} />;

  return (
    <div className={`min-h-screen py-8 px-4 ${isArabic ? 'rtl' : 'ltr'} ${
      isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto">
        <SuccessHeader isDarkMode={isDarkMode} orderNumber={order.orderNumber} t={t} />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <OrderItemsList isDarkMode={isDarkMode} items={order.orderItems} t={t} />
            <ShippingAddressCard isDarkMode={isDarkMode} address={order.shippingAddress} t={t} />
          </div>

          <div className="space-y-6">
            <OrderSummaryCard isDarkMode={isDarkMode} order={order} t={t} />
            <NextStepsCard isDarkMode={isDarkMode} t={t} />
          </div>
        </div>

        <ActionButtons isDarkMode={isDarkMode} t={t} />
      </div>
    </div>
  );
};

export default OrderSuccessContent;
