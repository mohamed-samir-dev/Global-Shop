import { useState } from "react";
import { User as UserIcon, Mail, Lock, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { authAPI } from "@/src/lib/api";
import { User } from "@/types";
import { z } from "zod";
import { useTranslation } from "@/src/i18n/hooks/useTranslation";
import { useTheme } from "@/context/ThemeContext";

const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

const PasswordRequirement = ({ met, text, isDarkMode }: { met: boolean; text: string; isDarkMode: boolean }) => (
  <div className="flex items-center gap-2 text-sm">
    {met ? (
      <CheckCircle2 className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className={`w-4 h-4 ${
        isDarkMode ? 'text-slate-600' : 'text-gray-300'
      }`} />
    )}
    <span className={met ? (isDarkMode ? 'text-green-400' : 'text-green-600') : (isDarkMode ? 'text-slate-400' : 'text-gray-500')}>{text}</span>
  </div>
);

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
  onUpdate: (user: User) => void;
  onError: (error: string) => void;
}

export const EditProfileModal = ({ user, onClose, onUpdate, onError }: EditProfileModalProps) => {
  const { t, isArabic } = useTranslation();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({ 
    name: user.name, 
    email: user.email, 
    currentPassword: "", 
    newPassword: "", 
    confirmPassword: "" 
  });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [isUpdating, setIsUpdating] = useState(false);

  const validatePassword = (password: string) => {
    if (!password) return true;
    try {
      passwordSchema.parse(password);
      return true;
    } catch {
      return false;
    }
  };

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    onError("");
    
    try {
      const updates: { name?: string; email?: string; currentPassword?: string; newPassword?: string } = {};
      
      if (formData.name !== user.name) updates.name = formData.name;
      if (formData.email !== user.email) updates.email = formData.email;
      
      if (formData.newPassword) {
        if (!validatePassword(formData.newPassword)) {
          onError("Password does not meet strength requirements");
          setIsUpdating(false);
          return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
          onError("New passwords do not match");
          setIsUpdating(false);
          return;
        }
        if (!formData.currentPassword) {
          onError("Current password is required to change password");
          setIsUpdating(false);
          return;
        }
        updates.currentPassword = formData.currentPassword;
        updates.newPassword = formData.newPassword;
      }
      
      if (Object.keys(updates).length === 0) {
        onClose();
        setIsUpdating(false);
        return;
      }
      
      await authAPI.updateProfile(updates);
      const response = await authAPI.getUserProfile();
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
      onError("Failed to update profile. Please check your current password.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={`fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4 ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className={`rounded-2xl shadow-2xl max-w-lg w-full p-4 sm:p-6 lg:p-8 max-h-[90vh] overflow-y-auto ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <h3 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>{t('profile.editModal.title')}</h3>
        
        <div className="space-y-4 sm:space-y-5">
          <div>
            <label className={`block text-xs sm:text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-slate-200' : 'text-gray-700'
            }`}>{t('profile.editModal.fullName')}</label>
            <div className="relative">
              <UserIcon className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                isDarkMode ? 'text-slate-500' : 'text-gray-400'
              }`} />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isArabic ? 'pr-10 sm:pr-11 pl-4' : 'pl-10 sm:pl-11 pr-4'} py-2.5 sm:py-3 ${
                  isDarkMode ? 'text-white bg-slate-700 border-slate-600' : 'text-gray-900 bg-white border-gray-300'
                }`}
                placeholder={t('profile.editModal.fullNamePlaceholder')}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs sm:text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-slate-200' : 'text-gray-700'
            }`}>{t('profile.editModal.emailAddress')}</label>
            <div className="relative">
              <Mail className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                isDarkMode ? 'text-slate-500' : 'text-gray-400'
              }`} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isArabic ? 'pr-10 sm:pr-11 pl-4' : 'pl-10 sm:pl-11 pr-4'} py-2.5 sm:py-3 ${
                  isDarkMode ? 'text-white bg-slate-700 border-slate-600' : 'text-gray-900 bg-white border-gray-300'
                }`}
                placeholder={t('profile.editModal.emailPlaceholder')}
              />
            </div>
          </div>

          <div className={`border-t pt-4 sm:pt-5 ${
            isDarkMode ? 'border-slate-600' : 'border-gray-200'
          }`}>
            <p className={`text-xs sm:text-sm font-semibold mb-3 sm:mb-4 ${
              isDarkMode ? 'text-slate-200' : 'text-gray-700'
            }`}>{t('profile.editModal.changePassword')}</p>
          </div>

          <div>
            <label className={`block text-xs sm:text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-slate-200' : 'text-gray-700'
            }`}>{t('profile.editModal.currentPassword')}</label>
            <div className="relative">
              <Lock className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                isDarkMode ? 'text-slate-500' : 'text-gray-400'
              }`} />
              <input
                type={showPasswords.current ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className={`w-full text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isArabic ? 'pr-10 sm:pr-11 pl-10 sm:pl-11' : 'pl-10 sm:pl-11 pr-10 sm:pr-11'} py-2.5 sm:py-3 ${
                  isDarkMode ? 'text-white bg-slate-700 border-slate-600' : 'text-gray-900 bg-white border-gray-300'
                }`}
                placeholder={t('profile.editModal.currentPasswordPlaceholder')}
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                className={`absolute ${isArabic ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {showPasswords.current ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className={`block text-xs sm:text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-slate-200' : 'text-gray-700'
            }`}>{t('profile.editModal.newPassword')}</label>
            <div className="relative">
              <Lock className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                isDarkMode ? 'text-slate-500' : 'text-gray-400'
              }`} />
              <input
                type={showPasswords.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => {
                  setFormData({ ...formData, newPassword: e.target.value });
                  validatePassword(e.target.value);
                }}
                className={`w-full text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isArabic ? 'pr-10 sm:pr-11 pl-10 sm:pl-11' : 'pl-10 sm:pl-11 pr-10 sm:pr-11'} py-2.5 sm:py-3 ${
                  isDarkMode ? 'text-white bg-slate-700 border-slate-600' : 'text-gray-900 bg-white border-gray-300'
                }`}
                placeholder={t('profile.editModal.newPasswordPlaceholder')}
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                className={`absolute ${isArabic ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {showPasswords.new ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
            {formData.newPassword && (
              <div className="mt-2 space-y-1">
                <PasswordRequirement met={formData.newPassword.length >= 8} text={t('profile.editModal.requirements.atLeast8')} isDarkMode={isDarkMode} />
                <PasswordRequirement met={/[A-Z]/.test(formData.newPassword)} text={t('profile.editModal.requirements.uppercase')} isDarkMode={isDarkMode} />
                <PasswordRequirement met={/[a-z]/.test(formData.newPassword)} text={t('profile.editModal.requirements.lowercase')} isDarkMode={isDarkMode} />
                <PasswordRequirement met={/[0-9]/.test(formData.newPassword)} text={t('profile.editModal.requirements.number')} isDarkMode={isDarkMode} />
                <PasswordRequirement met={/[^A-Za-z0-9]/.test(formData.newPassword)} text={t('profile.editModal.requirements.specialChar')} isDarkMode={isDarkMode} />
              </div>
            )}
          </div>

          <div>
            <label className={`block text-xs sm:text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-slate-200' : 'text-gray-700'
            }`}>{t('profile.editModal.confirmPassword')}</label>
            <div className="relative">
              <Lock className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
                isDarkMode ? 'text-slate-500' : 'text-gray-400'
              }`} />
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`w-full text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isArabic ? 'pr-10 sm:pr-11 pl-10 sm:pl-11' : 'pl-10 sm:pl-11 pr-10 sm:pr-11'} py-2.5 sm:py-3 ${
                  isDarkMode ? 'text-white bg-slate-700 border-slate-600' : 'text-gray-900 bg-white border-gray-300'
                }`}
                placeholder={t('profile.editModal.confirmPasswordPlaceholder')}
              />
              <button
                type="button"
                onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                className={`absolute ${isArabic ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {showPasswords.confirm ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
            {formData.confirmPassword && formData.newPassword && formData.confirmPassword !== formData.newPassword && (
              <p className={`mt-2 text-xs sm:text-sm ${
                isDarkMode ? 'text-red-400' : 'text-red-600'
              }`}>{t('profile.editModal.passwordsDoNotMatch')}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
          <button
            onClick={onClose}
            disabled={isUpdating}
            className={`w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-colors disabled:opacity-50 ${
              isDarkMode ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {t('profile.editModal.cancel')}
          </button>
          <button
            onClick={handleUpdateProfile}
            disabled={isUpdating}
            className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-lg"
          >
            {isUpdating ? t('profile.editModal.updating') : t('profile.editModal.saveChanges')}
          </button>
        </div>
      </div>
    </div>
  );
};
