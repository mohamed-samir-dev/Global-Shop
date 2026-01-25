import Image from 'next/image';
import { OrderItem } from '../types';

interface OrderItemsListProps {
  isDarkMode: boolean;
  items: OrderItem[];
  t: (key: string) => string;
}

export default function OrderItemsList({ isDarkMode, items, t }: OrderItemsListProps) {
  return (
    <div className={`rounded-xl shadow-sm border ${
      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
    }`}>
      <div className={`px-6 py-4 border-b ${
        isDarkMode ? 'border-slate-700' : 'border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>{t('orderSuccess.orderItems')}</h2>
      </div>
      <div className="p-6 space-y-4">
        {items.map((item: OrderItem, index: number) => (
          <div key={index} className={`flex gap-4 pb-4 border-b last:border-0 last:pb-0 ${
            isDarkMode ? 'border-slate-700' : 'border-gray-100'
          }`}>
            {item.product?.mainImage ? (
              <div className="relative">
                <Image 
                  src={item.product.mainImage} 
                  alt={item.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
            ) : (
              <div className={`w-20 h-20 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
              }`}>
                <svg className={`w-8 h-8 ${
                  isDarkMode ? 'text-slate-500' : 'text-gray-400'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold mb-1 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{item.name}</h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>{t('orderSuccess.qty')} {item.quantity} × ${item.priceAtPurchase.toFixed(2)}</p>
              {item.options && Object.keys(item.options).length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {Object.entries(item.options).map(([key, value]) => (
                    <span key={key} className={`text-xs px-2 py-1 rounded ${
                      isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {key}: {value}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="text-right">
              <p className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>${(item.priceAtPurchase * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
