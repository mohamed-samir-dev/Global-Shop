"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/i18n";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export function SubscriptionSection() {
  const { isDarkMode } = useTheme();
  const { t, isArabic } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setEmail("");
    // You can add success notification here
  };

  return (
    <section className={`py-16  ${isDarkMode ? "bg-[#1A1D23]" : "bg-[#F3F3F3]"}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            {t("subscription.title") as string}
          </h2>
          
          <p className={`text-lg mb-10 max-w-2xl mx-auto  ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            {t("subscription.description") as string}
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className={`flex ${isArabic ? "flex-row-reverse" : ""} gap-3`}>
              <div className="flex-1 relative">
                <EnvelopeIcon className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  isArabic ? "right-3" : "left-3"
                } ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("subscription.emailPlaceholder") as string}
                  className={`w-full ${isArabic ? "pr-10 pl-4 text-right" : "pl-10 pr-4 "} py-3  rounded-full border transition-all focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? "bg-[#2A2D35] border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className={`px-10 py-3 cursor-pointer bg-black text-white font-medium rounded-full transition-all focus:outline-none  ${
                  isDarkMode ? "text-white" : ""
                } ${
                  isSubmitting || !email.trim()
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                whileHover={!isSubmitting && email.trim() ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting && email.trim() ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (t("subscription.subscribing") as string) : (t("subscription.subscribe") as string)}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}