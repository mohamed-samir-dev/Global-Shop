interface LoadingStateProps {
  isDarkMode: boolean;
}

export default function LoadingState({ isDarkMode }: LoadingStateProps) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-3 border-gray-300 border-t-blue-600 mx-auto mb-3"></div>
        <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>Loading order...</p>
      </div>
    </div>
  );
}
