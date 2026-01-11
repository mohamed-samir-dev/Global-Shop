'use client';

import { Product } from '@/types';
import { useProductDetails } from './hooks/useProductDetails';
import {
  ProductImageGallery,
  ProductInfo,
  ProductRating,
  ProductPricing,
  ProductVariants,
  ProductQuantity,
  ProductActions,
  ProductMeta,
  ProductDescription,
  ProductSpecifications,
  ProductVideo,
  ProductReviews,
} from './components';

interface ProductDetailsProps {
  product: Product;
  onProductUpdate?: () => void;
}

export default function ProductDetails({ product, onProductUpdate }: ProductDetailsProps) {
  const {
    selectedImage,
    setSelectedImage,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    quantity,
    updateQuantity,
    finalPrice,
    hasDiscount,
  } = useProductDetails(product);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductImageGallery
          product={product}
          selectedImage={selectedImage}
          onImageSelect={setSelectedImage}
        />

        <div className="space-y-6">
          <ProductInfo product={product} />
          <ProductRating product={product} />
          <ProductPricing
            product={product}
            finalPrice={finalPrice}
            hasDiscount={hasDiscount}
          />
          <ProductVariants
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            onSizeSelect={setSelectedSize}
            onColorSelect={setSelectedColor}
          />
          <ProductQuantity
            product={product}
            quantity={quantity}
            onQuantityChange={updateQuantity}
          />
          <ProductActions product={product} />
          <ProductMeta product={product} />
        </div>
      </div>

      <ProductDescription product={product} />
      <ProductSpecifications product={product} />
      <ProductVideo product={product} />
      <ProductReviews product={product} onProductUpdate={onProductUpdate} />
    </div>
  );
}