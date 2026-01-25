"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "./hooks/useProfile";
import { ProfileHeader } from "./components/ProfileHeader";
import { AccountInfo } from "./components/AccountInfo";
import { QuickStats } from "./components/QuickStats";
import { EditProfileModal } from "./components/EditProfileModal";
import { useTranslation } from "@/src/i18n/hooks/useTranslation";

export default function ProfilePage() {
  const { logout } = useAuth();
  const { user, loading, error, stats, setUser, setError } = useProfile();
  const [showEditModal, setShowEditModal] = useState(false);
  const router = useRouter();
  const { t, isArabic } = useTranslation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">{t('profile.failedToLoad')}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8 ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="max-w-6xl mx-auto">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg mb-6 shadow-sm">
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
