'use client';

import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsHydrated(true), 0);
    return () => clearTimeout(timer);
  }, []);
  
  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  }, [i18n]);

  const changeLanguage = useCallback((lang: string) => {
    i18n.changeLanguage(lang);
  }, [i18n]);

  // Return a safe translation function that handles SSR
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safeT = useCallback((key: string, options?: any): string => {
    if (!isHydrated) {
      // Return English fallbacks during SSR
      const fallbacks: Record<string, string> = {
        'navbar.home': 'Home',
        'navbar.shop': 'Shop',
        'navbar.about': 'About',
        'navbar.contact': 'Contact',
        'navbar.searchPlaceholder': 'Search products...',
        'subscription.title': 'Stay Updated with Our Latest Offers',
        'subscription.description': 'Subscribe to our newsletter and be the first to know about exclusive deals, new arrivals, and special promotions.',
        'subscription.emailPlaceholder': 'Enter your email address',
        'subscription.subscribe': 'Subscribe',
        'subscription.subscribing': 'Subscribing...',
        'shop.results.showing': 'Showing',
        'shop.results.of': 'of',
        'shop.results.results': 'results'
      };
      return fallbacks[key] || String(key);
    }
    return String(t(key, options));
  }, [t, isHydrated]);

  return {
    t: safeT,
    language: isHydrated ? i18n.language : 'en',
    toggleLanguage,
    changeLanguage,
    isArabic: isHydrated ? i18n.language === 'ar' : false,
    isReady: i18n.isInitialized && isHydrated
  };
};