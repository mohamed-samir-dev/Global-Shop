import { Order } from '../types';

interface OrderSummaryCardProps {
  isDarkMode: boolean;
  order: Order;
  t: (key: string) => string;
}

export default function OrderSummaryCard({ isDarkMode, order, t }: OrderSummaryCardProps) {
  return (
    <div className={`rounded-xl shadow-sm border top-4 ${
      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
    }`}>
      <div className={`px-6 py-4 border-b ${
        isDarkMode ? 'border-slate-700' : 'border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>{t('orderSuccess.summary')}</h2>
      </div>
      <div className="p-6">
        <div className={`space-y-3 mb-4 pb-4 border-b ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div className="flex justify-between text-sm">
            <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>{t('orderSuccess.subtotal')}</span>
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{order.subtotal.toFixed(2)} EGP</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>{t('orderSuccess.shipping')}</span>
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{order.shippingPrice.toFixed(2)} EGP</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>{t('orderSuccess.tax')}</span>
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{order.taxPrice.toFixed(2)} EGP</span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>{t('orderSuccess.discount')}</span>
              <span>-{order.discountAmount.toFixed(2)} EGP</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <span className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>{t('orderSuccess.total')}</span>
          <span className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>{order.totalPrice.toFixed(2)} EGP</span>
        </div>

        <div className={`space-y-3 pt-4 border-t ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div className="flex justify-between text-sm">
            <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>{t('orderSuccess.orderDate')}</span>
            <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>{t('orderSuccess.status')}</span>
            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
              isDarkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-700'
            }`}>
              {order.status}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>{t('orderSuccess.payment')}</span>
            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${order.isPaid ? (isDarkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-700') : (isDarkMode ? 'bg-yellow-900/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700')}`}>
              {order.isPaid ? t('orderSuccess.paid') : t('orderSuccess.pending')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
