import Image from 'next/image';
import { Product } from '@/types';

interface ProductImagesProps {
  product: Product;
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
  hasDiscount: boolean;
  discountPercentage: number;
}

export default function ProductImages({
  product,
  activeImageIndex,
  setActiveImageIndex,
  hasDiscount,
  discountPercentage,
}: ProductImagesProps) {
  const images = [product.image].filter(Boolean);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
        {hasDiscount && (
          <div className="absolute top-4 left-4 z-10 bg-linear-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
            -{discountPercentage}% OFF
          </div>
        )}
        <Image
          src={product.image || '/placeholder-image.jpg'}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      
      {images.length > 1 && (
        <div className="flex space-x-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                activeImageIndex === index ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image src={image!} alt={`${product.name} ${index + 1}`} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}