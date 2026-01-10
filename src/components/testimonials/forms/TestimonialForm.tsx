"use client";

import { useState } from "react";
import { Star, X, CheckCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/i18n/hooks/useTranslation";
import { testimonialAPI } from "@/lib/api";

interface TestimonialFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function TestimonialForm({ isOpen, onClose, onSuccess }: TestimonialFormProps) {
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0) return;

    setIsSubmitting(true);
    try {
      await testimonialAPI.createTestimonial(formData);
      setShowSuccess(true);
      setTimeout(() => {
        setFormData({ name: "", email: "", rating: 0, comment: "" });
        setShowSuccess(false);
        onSuccess?.();
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Failed to submit testimonial:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 backdrop-blur-md  bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`w-full max-w-md rounded-lg p-8 text-center success-animation ${isDarkMode ? "bg-[#2A2D35]" : "bg-white"}`}>
          <div className="mb-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 checkmark-animation" />
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-[#0D0D0D]"}`}>
              {isArabic ? "شكراً لك!" : "Thank You!"}
            </h3>
            <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              {isArabic 
                ? "تم استلام تقييمك بنجاح. سيقوم فريق الإدارة بمراجعة رسالتك والموافقة عليها أو رفضها. نقدر وقتك وملاحظاتك القيمة."
                : "Your review has been successfully submitted. Our admin team will review your message and either approve or reject it. We appreciate your time and valuable feedback."
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 backdrop-blur-md  bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md rounded-lg p-6 max-h-[90vh] overflow-y-auto ${isDarkMode ? "bg-[#2A2D35]" : "bg-white"}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0D0D0D]"}`}>
            {isArabic ? "اترك تقييمك" : "Leave Your Review"}
          </h3>
          <button onClick={onClose} className={`p-1 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {isArabic ? "الاسم" : "Name"} *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode 
                  ? "bg-[#191C21] border-gray-600 text-white" 
                  : "bg-white border-gray-300 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {isArabic ? "البريد الإلكتروني" : "Email"} *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode 
                  ? "bg-[#191C21] border-gray-600 text-white" 
                  : "bg-white border-gray-300 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {isArabic ? "التقييم" : "Rating"} *
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="focus:outline-none"
                >
                  <Star
                    size={24}
                    className={`${
                      star <= formData.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : isDarkMode
                        ? "text-gray-600"
                        : "text-gray-300"
                    } hover:text-yellow-400 transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>



          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {isArabic ? "التعليق" : "Comment"} *
            </label>
            <textarea
              required
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode 
                  ? "bg-[#191C21] border-gray-600 text-white" 
                  : "bg-white border-gray-300 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder={isArabic ? "شاركنا تجربتك..." : "Share your experience..."}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || formData.rating === 0}
            className="w-full bg-[#0D0D0D] text-white py-2.5 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting 
              ? (isArabic ? "جاري الإرسال..." : "Submitting...") 
              : (isArabic ? "إرسال التقييم" : "Submit Review")
            }
          </button>
        </form>
      </div>
    </div>
  );
}