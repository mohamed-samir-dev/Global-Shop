"use client";

import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/i18n";

export function AboutUs() {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">
        {String(t("footer.aboutUs.title"))}
      </h3>
      <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-400"}`}>
        {String(t("footer.aboutUs.description"))}
      </p>
    </div>
  );
}