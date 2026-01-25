import { User } from "@/types";
import { Mail, Shield } from "lucide-react";

interface ProfileHeaderProps {
  user: User;
  onEditClick: () => void;
  onLogout: () => void;
}

export const ProfileHeader = ({ user, onEditClick, onLogout }: ProfileHeaderProps) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden mb-6">
      <div className="relative h-48 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      
      <div className="relative px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5">
            <div className="relative">
              <div className="h-40 w-40 rounded-2xl bg-white p-2 shadow-2xl ring-4 ring-white">
                <div className="h-full w-full rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 flex items-center justify-center text-white text-5xl font-bold shadow-inner">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 h-8 w-8 rounded-full border-4 border-white shadow-lg"></div>
            </div>
            
            <div className="mt-6 sm:mt-0 sm:pb-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-1">{user.name}</h1>
              <p className="text-base text-gray-600 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified Account
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-0 flex gap-3">
            <button
              onClick={onEditClick}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Edit Profile
            </button>
            <button
              onClick={onLogout}
              className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
