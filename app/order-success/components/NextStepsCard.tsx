interface NextStepsCardProps {
  isDarkMode: boolean;
  t: (key: string) => string;
}

export default function NextStepsCard({ isDarkMode, t }: NextStepsCardProps) {
  return (
    <div className={`rounded-xl border p-6 ${
      isDarkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
    }`}>
      <h3 className={`font-semibold mb-3 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>{t('orderSuccess.whatsNext')}</h3>
      <ul className={`space-y-2 text-sm ${
        isDarkMode ? 'text-slate-300' : 'text-gray-700'
      }`}>
        <li className="flex gap-2">
          <svg className="w-5 h-5 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{t('orderSuccess.emailConfirmation')}</span>
        </li>
        <li className="flex gap-2">
          <svg className="w-5 h-5 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{t('orderSuccess.trackingInfo')}</span>
        </li>
        <li className="flex gap-2">
          <svg className="w-5 h-5 text-blue-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{t('orderSuccess.deliveryTime')}</span>
        </li>
      </ul>
    </div>
  );
}
