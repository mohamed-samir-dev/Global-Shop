import { useTheme } from "@/context/ThemeContext";

export const LoadingState = () => {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-16 ${isDarkMode ? "bg-[#191C21]" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-pulse">
            <div className={`h-8 w-64 mx-auto mb-4 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
            <div className={`h-4 w-96 mx-auto rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
          </div>
        </div>
      </div>
    </section>
  );
};