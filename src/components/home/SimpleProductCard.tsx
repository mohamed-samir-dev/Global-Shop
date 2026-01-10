"use client";

import { useTheme } from "@/context/ThemeContext";
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

  const displayPrice = product.finalPrice || product.basePrice;
  const hasDiscount = product.discount && product.discount.value > 0;

  return (
    <div className="group relative">
      {/* Product Image */}
      <div
        className={`relative aspect-square overflow-hidden border-2 rounded-lg mb-3 ${
          isDarkMode ? "border-gray-600" : "border-gray-200"
        }`}
      >
        <Image
          src={product.mainImage}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div>
        <h3
          className={`font-semibold text-sm mb-2 line-clamp-2 leading-tight ${
            isDarkMode ? "text-white" : "text-[#0D0D0D]"
          }`}
        >
          {product.name}
        </h3>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span
              className={`font-bold text-lg ${
                isDarkMode ? "text-white" : "text-[#0D0D0D]"
              }`}
            >
              ${displayPrice}
            </span>
            {hasDiscount && (
              <span className="text-gray-500 line-through text-sm">
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
          className={`w-full py-2.5 px-4 rounded-full text-sm flex items-center justify-center gap-2 transition
    ${
      product.stock > 0
        ? "bg-[#0D0D0D] text-white cursor-pointer hover:opacity-90"
        : "bg-gray-200 text-gray-500 cursor-not-allowed pointer-events-none"
    }
  `}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
