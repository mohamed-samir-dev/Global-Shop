import { Plus, LogIn } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/i18n/hooks/useTranslation";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface SectionHeaderProps {
  onAddReview: () => void;
}

export const SectionHeader = ({ onAddReview }: SectionHeaderProps) => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const { user } = useAuth();
  const router = useRouter();

  const handleButtonClick = () => {
    if (user) {
      onAddReview();
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="text-center mb-12">
      <h2
        className={`text-3xl font-bold mb-4 ${
          isDarkMode ? "text-white" : "text-[#0D0D0D]"
        }`}
      >
        {t("testimonials.title") as string}
      </h2>
      <p
        className={`text-lg mb-6 ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {t("testimonials.description") as string}
      </p>
      
      <button
        onClick={handleButtonClick}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full cursor-pointer font-medium transition-all duration-300 ${
          isDarkMode
            ? "bg-[#2A2D35] text-white hover:bg-[#3A3D45] border border-gray-600"
            : "bg-white text-[#0D0D0D] hover:bg-gray-50 border border-gray-200 shadow-sm"
        }`}
      >
        {user ? <Plus size={18} /> : <LogIn size={18} />}
        {user 
          ? (t("testimonials.leaveReview") as string)
          : (t("testimonials.loginToReview") as string)
        }
      </button>
    </div>
  );
};