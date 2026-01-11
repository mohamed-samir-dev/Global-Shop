import Link from 'next/link';
import { useTranslation } from '@/i18n';
import { useEffect, useState } from 'react';

interface NavigationLinksProps {
  isArabic: boolean;
  isDarkMode: boolean;
  isMobile?: boolean;
  isTablet?: boolean;
  onLinkClick?: () => void;
}

export const NavigationLinks = ({ isArabic, isDarkMode, isMobile = false, isTablet = false, onLinkClick }: NavigationLinksProps) => {
  const { t, isReady } = useTranslation();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);
  
  const links = [
    { href: '/', label: t('navbar.home') },
    { href: '/products', label: t('navbar.shop') },
    { href: '/about', label: t('navbar.about') },
    { href: '/contact', label: t('navbar.contact') }
  ];

  // Only reverse for Arabic when NOT in mobile mode (keep original order in mobile menu switcher)
  const displayLinks = (mounted && isReady && isArabic && !isMobile) ? [...links].reverse() : links;

  const containerClass = isMobile 
    ? 'space-y-1' 
    : isTablet
    ? `flex items-center gap-4`
    : `hidden lg:flex items-center justify-center gap-8`;

  const linkClass = isMobile
    ? `flex items-center px-3 py-2.5 text-base font-medium rounded-lg transition-colors cursor-pointer ${
        isDarkMode 
          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`
    : isTablet
    ? `text-sm md:text-base font-medium transition-colors cursor-pointer ${
        isDarkMode 
          ? 'text-gray-300 hover:text-white' 
          : 'text-gray-600 hover:text-gray-900'
      }`
    : `text-sm md:text-base lg:text-lg font-medium transition-colors cursor-pointer ${
        isDarkMode 
          ? 'text-gray-300 hover:text-white' 
          : 'text-gray-600 hover:text-gray-900'
      }`;

  return (
    <div className={containerClass}>
      {displayLinks.map((link) => (
        <Link key={link.href} href={link.href} className={linkClass} onClick={onLinkClick}>
          {String(link.label)}
        </Link>
      ))}
    </div>
  );
};