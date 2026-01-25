import { User } from "@/types";
import { User as UserIcon, Mail, Shield, Calendar } from "lucide-react";
import { useTranslation } from "@/src/i18n/hooks/useTranslation";

interface AccountInfoProps {
  user: User;
}

export const AccountInfo = ({ user }: AccountInfoProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
        <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
        {t('profile.accountInfo.title')}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-linear-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20 p-4 sm:p-5 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg shrink-0">
              <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">{t('profile.accountInfo.fullName')}</p>
          </div>
          <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white ml-11 sm:ml-12 wrap-break-words">{user.name}</p>
        </div>

        <div className="bg-linear-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/20 p-4 sm:p-5 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-600 rounded-lg shrink-0">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">{t('profile.accountInfo.emailAddress')}</p>
          </div>
          <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white ml-11 sm:ml-12 truncate">{user.email}</p>
        </div>

        <div className="bg-linear-to-br from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/20 p-4 sm:p-5 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-600 rounded-lg shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">{t('profile.accountInfo.accountStatus')}</p>
          </div>
          <p className="text-base sm:text-lg font-semibold text-green-700 dark:text-green-400 ml-11 sm:ml-12">{t('profile.accountInfo.activeVerified')}</p>
        </div>

        <div className="bg-linear-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/20 p-4 sm:p-5 rounded-xl border border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-600 rounded-lg shrink-0">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">{t('profile.accountInfo.memberSince')}</p>
          </div>
          <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white ml-11 sm:ml-12">
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}
          </p>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{t('profile.accountInfo.userId')}</p>
        <p className="text-xs sm:text-sm font-mono text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 break-all">{user._id}</p>
      </div>
    </div>
  );
};
