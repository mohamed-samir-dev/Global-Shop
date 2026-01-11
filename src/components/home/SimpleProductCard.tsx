"use client";

import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/i18n/hooks/useTranslation";
import { Product } from "@/types";
import Image from "next/image";

interface SimpleProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function SimpleProductCard({
  product,
  onAddToCart,
}: SimpleProductCardProps) {
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();

  const displayPrice = product.finalPrice || product.basePrice;
  const hasDiscount = product.discount && product.discount.value > 0;

  return (
    <div className="group relative" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg mb-2 sm:mb-3">
        <Image
          src={product.mainImage}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3
          className={`font-semibold text-xs sm:text-sm lg:text-base mb-1 sm:mb-2 line-clamp-2 leading-tight ${
            isDarkMode ? "text-white" : "text-[#0D0D0D]"
          }`}
        >
          {product.name}
        </h3>

        <div className={`flex items-center mb-2 sm:mb-3 ${isArabic ? 'justify-end' : 'justify-start'}`}>
          <div className="flex items-baseline gap-1 sm:gap-2">
            <span
              className={`font-bold text-sm sm:text-base lg:text-lg ${
                isDarkMode ? "text-white" : "text-[#0D0D0D]"
              }`}
            >
              ${displayPrice}
            </span>
            {hasDiscount && (
              <span className="text-gray-500 line-through text-xs sm:text-sm">
                ${product.basePrice}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart(product);
          }}
          disabled={product.stock === 0}
          className={`w-full py-2 sm:py-2.5 px-2 sm:px-4 rounded-full text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 transition ${isArabic ? 'font-arabic' : ''}
    ${
      product.stock > 0
        ? "bg-[#0D0D0D] text-white cursor-pointer hover:opacity-90"
        : "bg-gray-200 text-gray-500 cursor-not-allowed pointer-events-none"
    }
  `}
        >
          {product.stock > 0 ? (isArabic ? "أضف إلى السلة" : "Add to Cart") : (isArabic ? "نفد المخزون" : "Out of Stock")}
        </button>
      </div>
    </div>
  );
}
