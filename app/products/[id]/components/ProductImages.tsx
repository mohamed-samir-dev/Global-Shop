import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/types';
import { ZoomIn   } from 'lucide-react';
import ImageModal from './ImageModal';

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
}: ProductImagesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const images = product.imageGallery && product.imageGallery.length > 0 
    ? product.imageGallery.filter(Boolean) as string[]
    : [product.mainImage || product.image].filter(Boolean) as string[];

  const currentImage = images[activeImageIndex] || images[0];

  return (
    <>
      <div className="flex space-x-4">
        {/* Sub Images - Vertical Stack */}
        {images.length > 1 && (
          <div className="flex flex-col space-y-2 w-20">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImageIndex === index ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image 
                  src={image || '/placeholder-image.jpg'} 
                  alt={`${product.name} ${index + 1}`} 
                  width={80}
                  height={80}
                  className="w-full h-full object-cover" 
                />
              </button>
            ))}
          </div>
        )}
        
        {/* Main Image */}
        <div className="relative flex-1 aspect-square bg-white rounded-2xl overflow-hidden shadow-lg max-w-md group">
         
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute bottom-4 right-4 z-10 p-2 bg-white bg-opacity-80 rounded-full shadow-lg hover:bg-opacity-100 transition-opacity"
          >
            <ZoomIn    className="w-5 h-5 text-gray-600 cursor-pointer" />
          </button>
          <Image
            src={currentImage || '/placeholder-image.jpg'}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      </div>
      
      <ImageModal
        isOpen={isModalOpen}
        images={images}
        currentIndex={activeImageIndex}
        onClose={() => setIsModalOpen(false)}
        onNavigate={setActiveImageIndex}
      />
    </>
  );
}