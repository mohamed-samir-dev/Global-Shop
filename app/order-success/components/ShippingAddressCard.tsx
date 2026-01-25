import { ShippingAddress } from '../types';

interface ShippingAddressCardProps {
  isDarkMode: boolean;
  address: ShippingAddress;
  t: (key: string) => string;
}

export default function ShippingAddressCard({ isDarkMode, address, t }: ShippingAddressCardProps) {
  return (
    <div className={`rounded-xl shadow-sm border ${
      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
    }`}>
      <div className={`px-6 py-4 border-b ${
        isDarkMode ? 'border-slate-700' : 'border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>{t('orderSuccess.shippingAddress')}</h2>
      </div>
      <div className="p-6">
        <div className={`space-y-1 ${
          isDarkMode ? 'text-slate-300' : 'text-gray-700'
        }`}>
          <p className={`font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>{address.fullName}</p>
          <p>{address.address}</p>
          <p>{address.city}, {address.postalCode}</p>
          <p>{address.country}</p>
          {address.phone && <p className={`pt-2 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}>{t('orderSuccess.phone')} {address.phone}</p>}
        </div>
      </div>
    </div>
  );
}
