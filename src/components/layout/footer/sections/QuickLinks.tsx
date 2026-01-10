"use client";

import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/i18n";
import Link from "next/link";
import { quickLinksData } from "../constants";

export function QuickLinks() {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">
        {String(t("footer.quickLinks.title"))}
      </h3>
      <ul className="space-y-3">
        {quickLinksData.map((link, index) => (
          <li key={index}>
            <Link 
              href={link.href}
              className={`text-sm transition-colors hover:text-[#C7AB6C] ${
                isDarkMode ? "text-gray-300" : "text-gray-400"
              }`}
            >
              {String(t(link.label))}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}