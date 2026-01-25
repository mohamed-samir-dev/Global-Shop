import Link from 'next/link';

interface ActionButtonsProps {
  isDarkMode: boolean;
  t: (key: string) => string;
}

export default function ActionButtons({ isDarkMode, t }: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      <Link 
        href="/products"
        className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        {t('orderSuccess.continueShopping')}
      </Link>
      <Link 
        href="/orders"
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-colors font-medium border ${
          isDarkMode 
            ? 'bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {t('orderSuccess.viewOrders')}
      </Link>
    </div>
  );
}
