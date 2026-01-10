"use client";

import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/i18n";
import { socialLinks } from "../constants";

export function SocialMedia() {
  const { isDarkMode } = useTheme();
  const { t, isArabic } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">
        {String(t("footer.socialMedia.title"))}
      </h3>
      <div className={`flex gap-4 ${isArabic ? "flex-row-reverse" : ""}`}>
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            aria-label={social.label}
            className={`p-2 rounded-full transition-all hover:scale-110 ${
              isDarkMode 
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white" 
                : "bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
            }`}
          >
            <social.icon className="h-5 w-5" />
          </a>
        ))}
      </div>
      <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-400"}`}>
        {String(t("footer.socialMedia.followUs"))}
      </p>
    </div>
  );
}