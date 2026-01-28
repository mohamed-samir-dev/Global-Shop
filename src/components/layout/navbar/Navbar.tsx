'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n';
import { useAppSelector } from '@/hooks/redux';
import { useWishlist } from '@/hooks/useWishlist';
import DarkModeToggle from '@/components/DarkModeToggle';
import { NavbarSkeleton } from '@/components/skeletons';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';
import { 
  Logo, 
  SearchBar, 
  NavigationLinks, 
  LanguageToggle, 
  UserMenu 
} from './components';

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { language, toggleLanguage, isArabic } = useTranslation();
  const cartItemCount = useAppSelector(state => state.cart.itemCount);
  const { wishlistCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  if (isLoading) {
    return <NavbarSkeleton />;
  }

  return (
    <nav className={`${
      isDarkMode 
        ? 'bg-[#191C21] text-white border-gray-700' 
        : 'bg-white text-gray-900 border-gray-200'
    } border-b sticky top-0 z-50 transition-all duration-300 ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout (lg and up) */}
        <div className={`hidden lg:flex items-center h-16 gap-8 ${isArabic ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <div className={`flex items-center min-w-fit ${isArabic ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
            <Logo isArabic={isArabic} isDarkMode={isDarkMode} />
          </div>

          {/* Search */}
          <div className="flex flex-1 max-w-md">
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isArabic={isArabic}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Navigation Links */}
          <NavigationLinks 
            isArabic={isArabic} 
            isDarkMode={isDarkMode} 
          />

          {/* Actions */}
          <div className={`flex items-center ${isArabic ? 'flex-row-reverse space-x-reverse space-x-4 mr-auto' : 'space-x-4 ml-auto'}`}>
            <LanguageToggle 
              language={language}
              toggleLanguage={toggleLanguage}
              isArabic={isArabic}
              isDarkMode={isDarkMode}
            />

            <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />

            {/* Wishlist */}
            <Link href="/wishlist" aria-label="Wishlist" className={`p-2 rounded-lg transition-all relative cursor-pointer ${
              isDarkMode 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              <HeartIcon className="h-5 w-5" />
            </Link>

            {/* Shopping Cart */}
            <Link href="/cart" aria-label="Shopping Cart" className={`p-2 rounded-lg transition-all relative cursor-pointer ${
              isDarkMode 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              <ShoppingCartIcon className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className={`absolute -top-1 ${isArabic ? '-left-1' : '-right-1'} bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium`}>
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>

            <UserMenu 
              user={user}
              logout={logout}
              isArabic={isArabic}
              isDarkMode={isDarkMode}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Tablet Layout (md to lg) - Two Rows */}
        <div className="hidden md:block lg:hidden">
          {/* First Row: Logo and Icons */}
          <div className={`flex items-center justify-between h-14 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center ${isArabic ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
              <Logo isArabic={isArabic} isDarkMode={isDarkMode} />
            </div>
            
            <div className={`flex items-center ${isArabic ? 'flex-row-reverse space-x-reverse space-x-3' : 'space-x-3'}`}>
              <LanguageToggle 
                language={language}
                toggleLanguage={toggleLanguage}
                isArabic={isArabic}
                isDarkMode={isDarkMode}
              />
              <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
              <Link href="/wishlist" aria-label="Wishlist" className={`p-2 rounded-lg transition-all relative cursor-pointer ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <HeartIcon className="h-4 w-4" />
              </Link>
              <Link href="/cart" aria-label="Shopping Cart" className={`p-2 rounded-lg transition-all relative cursor-pointer ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                <ShoppingCartIcon className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <span className={`absolute -top-1 ${isArabic ? '-left-1' : '-right-1'} bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium text-[10px]`}>
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </Link>
              <UserMenu 
                user={user}
                logout={logout}
                isArabic={isArabic}
                isDarkMode={isDarkMode}
                isLoading={isLoading}
              />
            </div>
          </div>
          
          {/* Second Row: Search and Navigation Links */}
          <div className={`flex items-center justify-between h-12 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className="flex-1 max-w-sm">
              <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isArabic={isArabic}
                isDarkMode={isDarkMode}
              />
            </div>
            <NavigationLinks 
              isArabic={isArabic} 
              isDarkMode={isDarkMode}
              isTablet={true}
            />
          </div>
        </div>

        {/* Mobile Layout (below md) */}
        <div className={`md:hidden flex items-center justify-between h-14 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
            <Logo isArabic={isArabic} isDarkMode={isDarkMode} />
          </div>
          
          <div className={`flex items-center ${isArabic ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2'}`}>
            {/* User Avatar with Dropdown - Hidden on screens 300px and below */}
            <div className="min-[301px]:block hidden">
              <UserMenu 
                user={user}
                logout={logout}
                isArabic={isArabic}
                isDarkMode={isDarkMode}
                isLoading={isLoading}
                isMobile={true}
              />
            </div>
            
            <Link href="/wishlist" aria-label="Wishlist" className={`p-1.5 rounded-lg transition-all relative cursor-pointer ${
              isDarkMode 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              <HeartIcon className="h-4 w-4" />
            </Link>
            
            <Link href="/cart" aria-label="Shopping Cart" className={`p-1.5 rounded-lg transition-all relative cursor-pointer ${
              isDarkMode 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              <ShoppingCartIcon className="h-4 w-4" />
              {cartItemCount > 0 && (
                <span className={`absolute -top-0.5 ${isArabic ? '-left-0.5' : '-right-0.5'} bg-red-500 text-white text-[10px] rounded-full h-3.5 w-3.5 flex items-center justify-center font-medium`}>
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-5 w-5" />
                ) : (
                  <Bars3Icon className="h-5 w-5" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className={`md:hidden border-t ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="px-4 pt-3 pb-3 space-y-3">
                {/* Mobile Search */}
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <SearchBar 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    isArabic={isArabic}
                    isDarkMode={isDarkMode}
                    isMobile={true}
                  />
                </motion.div>
                
                {/* Mobile Navigation Links */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <NavigationLinks 
                    isArabic={isArabic} 
                    isDarkMode={isDarkMode} 
                    isMobile={true}
                    onLinkClick={() => setIsMobileMenuOpen(false)}
                  />
                </motion.div>
                
                {/* User Menu for screens 300px and below */}
                <motion.div 
                  className={`max-[300px]:block hidden pt-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <UserMenu 
                    user={user}
                    logout={logout}
                    isArabic={isArabic}
                    isDarkMode={isDarkMode}
                    isLoading={isLoading}
                    isMobile={true}
                    isInMobileMenu={true}
                  />
                </motion.div>
                
                {/* Mobile Actions */}
                <motion.div 
                  className={`flex items-center justify-center gap-4 pt-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <LanguageToggle 
                    language={language}
                    toggleLanguage={() => {
                      toggleLanguage();
                      setIsMobileMenuOpen(false);
                    }}
                    isArabic={isArabic}
                    isDarkMode={isDarkMode}
                  />
                  <DarkModeToggle 
                    isDarkMode={isDarkMode} 
                    onToggle={() => {
                      toggleDarkMode();
                      setIsMobileMenuOpen(false);
                    }} 
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}