'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import CheckoutService from '@/services/checkoutService';
import Link from 'next/link';
import Image from 'next/image';

interface OrderItem {
  name: string;
  quantity: number;
  priceAtPurchase: number;
  product?: {
    mainImage?: string;
  };
}

interface Order {
  _id: string;
  orderNumber: string;
  createdAt: string;
  status: string;
  isPaid: boolean;
  totalPrice: number;
  orderItems: OrderItem[];
}

const OrdersPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const { t, isArabic } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadOrders();
  }, [user, currentPage]);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      setError('');
      const result = await CheckoutService.getUserOrders(currentPage, 10);
      setOrders(result.orders || []);
      setTotalPages(result.totalPages || 1);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-700';
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: t('orders.statuses.pending'),
      processing: t('orders.statuses.processing'),
      shipped: t('orders.statuses.shipped'),
      delivered: t('orders.statuses.delivered'),
      cancelled: t('orders.statuses.cancelled'),
    };
    return statusMap[status.toLowerCase()] || status;
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-3 border-gray-300 border-t-blue-600 mx-auto mb-3"></div>
          <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>{t('orders.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 px-4 ${isArabic ? 'rtl' : 'ltr'} ${
      isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>{t('orders.title')}</h1>
          <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>{t('orders.subtitle')}</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className={`border rounded-lg p-4 mb-6 ${
            isDarkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
          }`}>
            <p className={isDarkMode ? 'text-red-400' : 'text-red-700'}>{error}</p>
          </div>
        )}

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className={`rounded-xl shadow-sm border p-12 text-center ${
            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
          }`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
              isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
            }`}>
              <svg className={`w-10 h-10 ${
                isDarkMode ? 'text-slate-400' : 'text-gray-400'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className={`text-xl font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>{t('orders.noOrders')}</h2>
            <p className={`mb-6 ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}>{t('orders.noOrdersDesc')}</p>
            <Link 
              href="/products"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {t('orders.startShopping')}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className={`rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${
                isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
              }`}>
                {/* Order Header */}
                <div className={`px-6 py-4 border-b ${
                  isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-slate-400' : 'text-gray-600'
                        }`}>{t('orders.orderNumber')}</p>
                        <p className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>{order.orderNumber}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-slate-400' : 'text-gray-600'
                        }`}>{t('orders.date')}</p>
                        <p className={`font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {new Date(order.createdAt).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US')}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-slate-400' : 'text-gray-600'
                        }`}>{t('orders.total')}</p>
                        <p className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>${order.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {order.isPaid ? t('orders.paid') : t('orders.unpaid')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-3 mb-4">
                    {order.orderItems.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        {item.product?.mainImage ? (
                          <Image 
                            src={item.product.mainImage} 
                            alt={item.name}
                            width={60}
                            height={60}
                            className="w-15 h-15 object-cover rounded-lg"
                          />
                        ) : (
                          <div className={`w-15 h-15 rounded-lg flex items-center justify-center ${
                            isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
                          }`}>
                            <svg className={`w-6 h-6 ${
                              isDarkMode ? 'text-slate-400' : 'text-gray-400'
                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>{item.name}</p>
                          <p className={`text-sm ${
                            isDarkMode ? 'text-slate-400' : 'text-gray-600'
                          }`}>{t('orders.qty')} {item.quantity}</p>
                        </div>
                        <p className={`font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>${(item.priceAtPurchase * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                    {order.orderItems.length > 3 && (
                      <p className={`text-sm pt-2 ${
                        isDarkMode ? 'text-slate-400' : 'text-gray-600'
                      }`}>
                        +{order.orderItems.length - 3} {t('orders.moreItems')}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className={`flex gap-3 pt-4 border-t ${
                    isDarkMode ? 'border-slate-700' : 'border-gray-200'
                  }`}>
                    <Link 
                      href={`/order-success?orderId=${order._id}`}
                      className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      {t('orders.viewDetails')}
                    </Link>
                    {order.status === 'delivered' && (
                      <button className={`flex-1 text-center px-4 py-2 rounded-lg transition-colors font-medium ${
                        isDarkMode 
                          ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}>
                        {t('orders.reorder')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                isDarkMode
                  ? 'border-slate-600 text-slate-300 hover:bg-slate-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t('orders.previous')}
            </button>
            <span className={`px-4 py-2 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              {t('orders.page')} {currentPage} {t('orders.of')} {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg border font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                isDarkMode
                  ? 'border-slate-600 text-slate-300 hover:bg-slate-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t('orders.next')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
