interface SuccessHeaderProps {
  isDarkMode: boolean;
  orderNumber: string;
  t: (key: string) => string;
}

export default function SuccessHeader({ isDarkMode, orderNumber, t }: SuccessHeaderProps) {
  return (
    <div className="text-center mb-8">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
        isDarkMode ? 'bg-green-900/20' : 'bg-green-100'
      }`}>
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className={`text-3xl font-bold mb-2 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>{t('orderSuccess.title')}</h1>
      <p className={`mb-4 ${
        isDarkMode ? 'text-slate-400' : 'text-gray-600'
      }`}>{t('orderSuccess.thankYou')}</p>
      <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg shadow-sm border ${
        isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
      }`}>
        <span className={`text-sm ${
          isDarkMode ? 'text-slate-400' : 'text-gray-600'
        }`}>{t('orderSuccess.orderNumber')}</span>
        <span className={`font-semibold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>{orderNumber}</span>
      </div>
    </div>
  );
}
