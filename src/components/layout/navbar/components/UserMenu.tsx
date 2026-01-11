import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  UserIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "@/i18n";

interface User {
  name: string;
  isAdmin?: boolean;
}

interface UserMenuProps {
  user: User | null;
  logout: () => void;
  isArabic: boolean;
  isDarkMode: boolean;
  isLoading?: boolean;
  isMobile?: boolean;
  isInMobileMenu?: boolean;
}

export const UserMenu = ({
  user,
  logout,
  isArabic,
  isDarkMode,
  isLoading = false,
  isMobile = false,
  isInMobileMenu = false,
}: UserMenuProps) => {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // If in mobile menu, render inline menu items instead of dropdown
  if (isInMobileMenu) {
    if (isLoading) {
      return (
        <div className="space-y-2">
          <div className={`h-8 rounded-lg bg-gray-300 animate-pulse`} />
          <div className={`h-8 rounded-lg bg-gray-300 animate-pulse`} />
        </div>
      );
    }

    return (
      <div className="space-y-1">
        {user ? (
          // Logged in state - Show user info and menu items
          <>
            <div className={`px-3 py-2 rounded-lg ${
              isDarkMode ? "bg-gray-700/30" : "bg-gray-100"
            }`}>
              <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}>
                {t("navbar.welcomeBack") as string}
              </p>
              <p className={`text-sm font-semibold truncate ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                {user.name}
              </p>
            </div>

            {user.isAdmin && (
              <Link
                href="/admin"
                className={`flex items-center ${
                  isArabic ? "space-x-reverse space-x-3" : "space-x-3"
                } px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Cog6ToothIcon className="h-4 w-4 shrink-0" />
                <span className="font-medium">
                  {t("navbar.adminPanel") as string}
                </span>
              </Link>
            )}

            <Link
              href="/profile"
              className={`flex items-center ${
                isArabic ? "space-x-reverse space-x-3" : "space-x-3"
              } px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <UserIcon className="h-4 w-4 shrink-0" />
              <span className="font-medium">
                {t("navbar.myProfile") as string}
              </span>
            </Link>

            <Link
              href="/orders"
              className={`flex items-center ${
                isArabic ? "space-x-reverse space-x-3" : "space-x-3"
              } px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <ClipboardDocumentListIcon className="h-4 w-4 shrink-0" />
              <span className="font-medium">
                {t("navbar.myOrders") as string}
              </span>
            </Link>

            <button
              onClick={logout}
              className={`flex items-center ${
                isArabic ? "space-x-reverse space-x-3" : "space-x-3"
              } w-full px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                isDarkMode
                  ? "text-red-400 hover:text-red-300 hover:bg-red-900/30"
                  : "text-red-600 hover:text-red-700 hover:bg-red-50"
              }`}
            >
              <ArrowRightOnRectangleIcon
                className={`h-4 w-4 shrink-0 ${isArabic ? "rotate-180" : ""}`}
              />
              <span>{t("navbar.logout") as string}</span>
            </button>
          </>
        ) : (
          // Not logged in state - Show login and register buttons
          <>
            <Link
              href="/login"
              className={`flex items-center ${
                isArabic ? "space-x-reverse space-x-3" : "space-x-3"
              } px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <ArrowLeftOnRectangleIcon
                className={`h-4 w-4 shrink-0 ${isArabic ? "rotate-180" : ""}`}
              />
              <span>{t("navbar.login") as string}</span>
            </Link>

            <Link
              href="/register"
              className={`flex items-center ${
                isArabic ? "space-x-reverse space-x-3" : "space-x-3"
              } px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <UserPlusIcon className="h-4 w-4 shrink-0" />
              <span>{t("navbar.register") as string}</span>
            </Link>
          </>
        )}
      </div>
    );
  }

  // Show loading state during hydration to prevent mismatch
  if (isLoading) {
    return (
      <div className="relative">
        <button
          className={`flex items-center ${
            isArabic ? "space-x-reverse space-x-2" : "space-x-2"
          } ${isMobile ? 'p-1.5' : 'p-2'} rounded-lg transition-all cursor-pointer ${
            isDarkMode
              ? "text-gray-300 hover:text-white hover:bg-gray-700"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
          disabled
        >
          <div className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} rounded-full bg-gray-300 animate-pulse`} />
          <ChevronDownIcon className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center ${
          isArabic ? "space-x-reverse space-x-2" : "space-x-2"
        } ${isMobile ? 'p-1.5' : 'p-2'} rounded-lg transition-all cursor-pointer ${
          isDarkMode
            ? "text-gray-300 hover:text-white hover:bg-gray-700"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
      >
        <UserCircleIcon className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'}`} />
        <ChevronDownIcon className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} ${isDropdownOpen ? 'rotate-180' : ''} transition-transform duration-200`} />
      </button>

      <div
        className={`absolute ${
          isArabic ? "left-0" : "right-0"
        } mt-2 w-48 sm:w-56 md:w-64 rounded-xl shadow-2xl transition-all duration-300 transform z-50 ${
          isDarkMode
            ? "bg-[#26292E] border border-gray-700"
            : "bg-white border border-gray-200"
        } ${
          isDropdownOpen 
            ? "opacity-100 visible translate-y-0" 
            : "opacity-0 invisible translate-y-2"
        }`}
      >
        {user ? (
          // Logged in state - Show user menu with logout
          <div className="py-2">
            <div
              className={`px-3 sm:px-4 py-2 sm:py-3 border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <p
                className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {t("navbar.welcomeBack") as string}
              </p>
              <p
                className={`text-sm sm:text-base font-semibold truncate ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {user.name}
              </p>
            </div>

            <div className="py-1">
              {user.isAdmin && (
                <Link
                  href="/admin"
                  className={`flex items-center cursor-pointer ${
                    isArabic ? "space-x-reverse space-x-2 sm:space-x-3" : "space-x-2 sm:space-x-3"
                  } px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-all duration-200 ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Cog6ToothIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                  <span className="font-medium">
                    {t("navbar.adminPanel") as string}
                  </span>
                </Link>
              )}

              <Link
                href="/profile"
                className={`flex items-center cursor-pointer ${
                  isArabic ? "space-x-reverse space-x-2 sm:space-x-3" : "space-x-2 sm:space-x-3"
                } px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-all duration-200 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                <span className="font-medium">
                  {t("navbar.myProfile") as string}
                </span>
              </Link>

              <Link
                href="/orders"
                className={`flex items-center cursor-pointer ${
                  isArabic ? "space-x-reverse space-x-2 sm:space-x-3" : "space-x-2 sm:space-x-3"
                } px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-all duration-200 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <ClipboardDocumentListIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                <span className="font-medium">
                  {t("navbar.myOrders") as string}
                </span>
              </Link>
            </div>

            <div
              className={`border-t ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <button
                onClick={logout}
                className={`flex items-center cursor-pointer ${
                  isArabic ? "space-x-reverse space-x-2 sm:space-x-3" : "space-x-2 sm:space-x-3"
                } w-full px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isDarkMode
                    ? "text-red-400 hover:text-red-300 hover:bg-red-900/30"
                    : "text-red-600 hover:text-red-700 hover:bg-red-50"
                }`}
              >
                <ArrowRightOnRectangleIcon
                  className={`h-4 w-4 sm:h-5 sm:w-5 shrink-0 ${isArabic ? "rotate-180" : ""}`}
                />
                <span>{t("navbar.logout") as string}</span>
              </button>
            </div>
          </div>
        ) : (
          // Not logged in state - Show login and register buttons
          <div className="py-2">
            <Link
              href="/login"
              className={`flex items-center cursor-pointer ${
                isArabic ? "space-x-reverse space-x-2 sm:space-x-3" : "space-x-2 sm:space-x-3"
              } px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <ArrowLeftOnRectangleIcon
                className={`h-4 w-4 sm:h-5 sm:w-5 shrink-0 ${isArabic ? "rotate-180" : ""}`}
              />
              <span>{t("navbar.login") as string}</span>
            </Link>

            <div
              className={`border-t my-1 ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            />

            <Link
              href="/register"
              className={`flex items-center cursor-pointer ${
                isArabic ? "space-x-reverse space-x-2 sm:space-x-3" : "space-x-2 sm:space-x-3"
              } px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <UserPlusIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              <span>{t("navbar.register") as string}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
