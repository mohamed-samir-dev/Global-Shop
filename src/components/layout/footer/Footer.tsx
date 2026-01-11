"use client";

import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/i18n";
import Link from "next/link";
import { AboutUs, CustomerService, QuickLinks, SocialMedia } from "./sections";

export function Footer() {
  const { isDarkMode } = useTheme();
  const { t, isArabic } = useTranslation();

  return (
    <footer className={`${isDarkMode ? "bg-[#1A1D23] text-white" : "bg-gray-900 text-white"} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${isArabic ? "text-right" : "text-left"}`}>
          {isArabic ? (
            <>
              <SocialMedia />
              <QuickLinks />
              <CustomerService />
              <AboutUs />
            </>
          ) : (
            <>
              <AboutUs />
              <CustomerService />
              <QuickLinks />
              <SocialMedia />
            </>
          )}
        </div>
        {/* Copyright Line */}
        <div className={`mt-12 pt-8 border-t ${isDarkMode ? "border-gray-700" : "border-gray-800"}`}>
          <div className={`flex flex-col md:flex-row justify-between items-center gap-4 ${isArabic ? "md:flex-row-reverse" : ""}`}>
            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-400"}`}>
              {String(t("footer.copyright", { year: new Date().getFullYear() }))}
            </p>
            <div className={`flex gap-6 ${isArabic ? "flex-row-reverse" : ""}`}>
              <Link href="/privacy" className={`text-sm transition-colors hover:text-[#C7AB6C] ${isDarkMode ? "text-gray-300" : "text-gray-400"}`}>
                {String(t("footer.legal.privacy"))}
              </Link>
              <Link href="/terms" className={`text-sm transition-colors hover:text-[#C7AB6C] ${isDarkMode ? "text-gray-300" : "text-gray-400"}`}>
                {String(t("footer.legal.terms"))}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}