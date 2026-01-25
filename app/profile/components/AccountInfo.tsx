import { User } from "@/types";
import { User as UserIcon, Mail, Shield, Calendar } from "lucide-react";
import { useTranslation } from "@/src/i18n/hooks/useTranslation";
import { useTheme } from "@/context/ThemeContext";

interface AccountInfoProps {
  user: User;
}

export const AccountInfo = ({ user }: AccountInfoProps) => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`lg:col-span-2 shadow-lg rounded-2xl p-4 sm:p-6 ${
      isDarkMode ? 'bg-slate-800' : 'bg-white'
    }`}>
      <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 ${
        isDarkMode ? 'text-white' : 'text-black'
      }`}>
        <UserIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${
          isDarkMode ? 'text-blue-400' : 'text-blue-600'
        }`} />
        {t('profile.accountInfo.title')}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className={`p-4 sm:p-5 rounded-xl border ${
          isDarkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg shrink-0">
              <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <p className={`text-xs sm:text-sm font-medium text-black ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>{t('profile.accountInfo.fullName')}</p>
          </div>
          <p className={`text-base sm:text-lg font-semibold ml-11 sm:ml-12 wrap-break-words ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>{user.name}</p>
        </div>

        <div className={`p-4 sm:p-5 rounded-xl border ${
          isDarkMode ? 'bg-purple-900/20 border-purple-800' : 'bg-purple-50 border-purple-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-600 rounded-lg shrink-0">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <p className={`text-xs sm:text-sm font-medium text-gray-600 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>{t('profile.accountInfo.emailAddress')}</p>
          </div>
          <p className={`text-base sm:text-lg font-semibold ml-11 sm:ml-12 truncate ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>{user.email}</p>
        </div>

        <div className={`p-4 sm:p-5 rounded-xl border ${
          isDarkMode ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-600 rounded-lg shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <p className={`text-xs sm:text-sm font-medium text-gray-600 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>{t('profile.accountInfo.accountStatus')}</p>
          </div>
          <p className={`text-base sm:text-lg font-semibold ml-11 sm:ml-12 ${
            isDarkMode ? 'text-green-400' : 'text-green-700'
          }`}>{t('profile.accountInfo.activeVerified')}</p>
        </div>

        <div className={`p-4 sm:p-5 rounded-xl border ${
          isDarkMode ? 'bg-orange-900/20 border-orange-800' : 'bg-orange-50 border-orange-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-600 rounded-lg shrink-0">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <p className={`text-xs sm:text-sm font-medium text-gray-600 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>{t('profile.accountInfo.memberSince')}</p>
          </div>
          <p className={`text-base sm:text-lg font-semibold ml-11 sm:ml-12 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}
          </p>
        </div>
      </div>

      <div className={`mt-4 sm:mt-6 p-4 sm:p-5 rounded-xl border ${
        isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-gray-50 border-gray-200'
      }`}>
        <p className={`text-xs sm:text-sm font-medium text-black ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>{t('profile.accountInfo.userId')}</p>
        <p className={`text-xs sm:text-sm font-mono px-3 py-2 rounded-lg border break-all ${
          isDarkMode ? 'text-white bg-slate-800 border-slate-600' : 'text-black bg-white border-gray-300'
        }`}>{user._id}</p>
      </div>
    </div>
  );
};
