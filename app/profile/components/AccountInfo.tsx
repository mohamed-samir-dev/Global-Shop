import { User } from "@/types";
import { User as UserIcon, Mail, Shield, Calendar } from "lucide-react";

interface AccountInfoProps {
  user: User;
}

export const AccountInfo = ({ user }: AccountInfoProps) => {
  return (
    <div className="lg:col-span-2 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <UserIcon className="w-6 h-6 text-blue-600" />
        Account Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-5 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-600">Full Name</p>
          </div>
          <p className="text-lg font-semibold text-gray-900 ml-12">{user.name}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-5 rounded-xl border border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-600">Email Address</p>
          </div>
          <p className="text-lg font-semibold text-gray-900 ml-12 truncate">{user.email}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-5 rounded-xl border border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-600 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-600">Account Status</p>
          </div>
          <p className="text-lg font-semibold text-green-700 ml-12">Active & Verified</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-5 rounded-xl border border-orange-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-600 rounded-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-600">Member Since</p>
          </div>
          <p className="text-lg font-semibold text-gray-900 ml-12">
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}
          </p>
        </div>
      </div>

      <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-sm font-medium text-gray-600 mb-2">User ID</p>
        <p className="text-sm font-mono text-gray-800 bg-white px-3 py-2 rounded-lg border border-gray-300">{user._id}</p>
      </div>
    </div>
  );
};
