'use client';

import { useParams } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useProductDetail } from './hooks/useProductDetail';
import { calculateDiscount } from './utils/productHelpers';
import {
  Breadcrumb,
  ProductImages,
  ProductInfo,
  ProductNotFound,
} from './components';

export default function ProductDetailPage() {
  const params = useParams();
  const {
    product,
    isLoading,
    selectedQuantity,
    isWishlisted,
    activeImageIndex,
    setActiveImageIndex,
    handleAddToCart,
    handleWishlistToggle,
    updateQuantity,
  } = useProductDetail(params.id as string);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return <ProductNotFound />;
  }

  const { hasDiscount, discountPercentage } = calculateDiscount(product);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb productName={product.name} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ProductImages
            product={product}
            activeImageIndex={activeImageIndex}
            setActiveImageIndex={setActiveImageIndex}
            hasDiscount={hasDiscount}
            discountPercentage={discountPercentage}
          />
          
          <ProductInfo
            product={product}
            selectedQuantity={selectedQuantity}
            isWishlisted={isWishlisted}
            hasDiscount={hasDiscount}
            onQuantityChange={updateQuantity}
            onAddToCart={handleAddToCart}
            onWishlistToggle={handleWishlistToggle}
          />
        </div>
      </div>
    </div>
  );
}