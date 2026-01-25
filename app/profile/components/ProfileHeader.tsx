import { User } from "@/types";
import { Mail, Shield } from "lucide-react";
import { useTranslation } from "@/src/i18n/hooks/useTranslation";
import { useTheme } from "@/context/ThemeContext";

interface ProfileHeaderProps {
  user: User;
  onEditClick: () => void;
  onLogout: () => void;
}

export const ProfileHeader = ({ user, onEditClick, onLogout }: ProfileHeaderProps) => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`shadow-xl rounded-2xl overflow-hidden mb-6 ${
      isDarkMode ? 'bg-slate-800' : 'bg-white'
    }`}>
      <div className="relative h-32 min-[800px]:h-48 bg-linear-to-r from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/20 to-transparent"></div>
      </div>
      
      <div className="relative px-4 min-[800px]:px-6 pb-6">
        <div className="flex flex-col min-[800px]:flex-row min-[800px]:items-end min-[800px]:justify-between -mt-16 min-[800px]:-mt-20 gap-4">
          <div className="flex flex-col min-[800px]:flex-row min-[800px]:items-end gap-4 min-[800px]:gap-5">
            <div className="relative mx-auto min-[800px]:mx-0 shrink-0">
              <div className={`h-32 w-32 min-[800px]:h-40 min-[800px]:w-40 rounded-2xl p-2 shadow-2xl ring-4 ${
                isDarkMode ? 'bg-slate-700 ring-slate-700' : 'bg-white ring-white'
              }`}>
                <div className="h-full w-full rounded-xl bg-linear-to-br from-blue-500 via-blue-600 to-indigo-700 flex items-center justify-center text-white text-4xl min-[800px]:text-5xl font-bold shadow-inner">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              </div>
              <div className={`absolute -bottom-2 -right-2 bg-green-500 h-6 w-6 min-[800px]:h-8 min-[800px]:w-8 rounded-full border-4 shadow-lg ${
                isDarkMode ? 'border-slate-800' : 'border-white'
              }`}></div>
            </div>
            
            <div className="min-[800px]:pb-2 text-center min-[800px]:text-left">
              <h1 className={`text-2xl min-[800px]:text-3xl lg:text-4xl font-bold mb-1 wrap-break-word ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{user.name}</h1>
              <p className={`text-sm min-[800px]:text-base flex items-center gap-2 justify-center min-[800px]:justify-start break-all ${
                isDarkMode ? 'text-slate-300' : 'text-gray-600'
              }`}>
                <Mail className="w-4 h-4 shrink-0" />
                <span className="truncate max-w-[250px] min-[800px]:max-w-none">{user.email}</span>
              </p>
              <div className="flex items-center gap-2 mt-2 justify-center min-[800px]:justify-start">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'
                }`}>
                  <Shield className="w-3 h-3 mr-1" />
                  {t('profile.header.verifiedAccount')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col min-[800px]:flex-row gap-3 w-full min-[800px]:w-auto shrink-0">
            <button
              onClick={onEditClick}
              className="w-full min-[800px]:w-auto px-4 min-[800px]:px-6 py-2.5 min-[800px]:py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm min-[800px]:text-base"
            >
              {t('profile.header.editProfile')}
            </button>
            <button
              onClick={onLogout}
              className={`w-full min-[800px]:w-auto px-4 min-[800px]:px-6 py-2.5 min-[800px]:py-3 border-2 rounded-xl font-medium transition-all shadow-md hover:shadow-lg text-sm min-[800px]:text-base ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}>
              {t('profile.header.logout')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
