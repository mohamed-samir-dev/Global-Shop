interface PageNumberProps {
  page: number | string;
  isActive: boolean;
  isDarkMode: boolean;
  onClick: (page: number) => void;
}

export default function PageNumber({ page, isActive, isDarkMode, onClick }: PageNumberProps) {
  if (page === '...') {
    return (
      <div className={`flex items-center justify-center w-10 h-10 ${
        isDarkMode ? 'text-gray-500' : 'text-gray-400'
      }`}>
        <span>...</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => onClick(page as number)}
      className={`relative flex items-center justify-center cursor-pointer w-10 h-10 rounded-xl font-medium transition-all duration-300 ease-out transform ${
        isActive
          ? ' bg-[#B39E7A] text-white '
          : isDarkMode
          ? 'text-gray-300 hover:text-white '
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {isActive && (
        <div className="absolute inset-0 rounded-xl blur-sm opacity-50 animate-pulse" />
      )}
      <span className="relative z-10">{page}</span>
    </button>
  );
}