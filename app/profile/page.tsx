"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useProfile } from "./hooks/useProfile";
import { ProfileHeader } from "./components/ProfileHeader";
import { AccountInfo } from "./components/AccountInfo";
import { QuickStats } from "./components/QuickStats";
import { EditProfileModal } from "./components/EditProfileModal";
import { useTranslation } from "@/src/i18n/hooks/useTranslation";

export default function ProfilePage() {
  const { logout } = useAuth();
  const { isDarkMode } = useTheme();
  const { user, loading, error, stats, setUser, setError } = useProfile();
  const [showEditModal, setShowEditModal] = useState(false);
  const router = useRouter();
  const { t, isArabic } = useTranslation();

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
      }`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
      }`}>
        <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>{t('profile.failedToLoad')}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${isArabic ? 'rtl' : 'ltr'} ${
      isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto">
        {error && (
          <div className={`border-l-4 border-red-500 px-6 py-4 rounded-lg mb-6 shadow-sm ${
            isDarkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-700'
          }`}>
            <p className="font-medium">{error}</p>
          </div>
        )}

        <ProfileHeader 
          user={user} 
          onEditClick={() => setShowEditModal(true)}
          onLogout={() => {
            logout();
            router.push("/login");
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AccountInfo user={user} />
          <QuickStats stats={stats} />
        </div>
      </div>

      {showEditModal && (
        <EditProfileModal
          user={user}
          onClose={() => {
            setShowEditModal(false);
            setError(null);
          }}
          onUpdate={setUser}
          onError={setError}
        />
      )}
    </div>
  );
}
