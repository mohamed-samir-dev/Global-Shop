import Link from 'next/link';

interface OrderNotFoundProps {
  isDarkMode: boolean;
}

export default function OrderNotFound({ isDarkMode }: OrderNotFoundProps) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      <div className={`text-center p-8 rounded-xl shadow-lg max-w-md ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
          isDarkMode ? 'bg-red-900/20' : 'bg-red-100'
        }`}>
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className={`text-xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>Order Not Found</h1>
        <p className={`mb-6 ${
          isDarkMode ? 'text-slate-400' : 'text-gray-600'
        }`}>We couldn&apos;t find this order.</p>
        <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Return Home
        </Link>
      </div>
    </div>
  );
}
