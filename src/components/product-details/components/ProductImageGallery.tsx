import Image from 'next/image';
import { Product } from '@/types';

interface ProductImageGalleryProps {
  product: Product;
  selectedImage: string;
  onImageSelect: (image: string) => void;
}

export const ProductImageGallery = ({ 
  product, 
  selectedImage, 
  onImageSelect 
}: ProductImageGalleryProps) => {
  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={selectedImage}
          alt={product.name}
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>
      
      {product.imageGallery && product.imageGallery.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => onImageSelect(product.mainImage)}
            className={`aspect-square rounded-lg overflow-hidden border-2 ${
              selectedImage === product.mainImage ? 'border-blue-500' : 'border-gray-200'
            }`}
          >
            <Image 
              src={product.mainImage} 
              alt="" 
              width={150} 
              height={150} 
              className="w-full h-full object-cover" 
            />
          </button>
          {product.imageGallery.map((img, index) => (
            <button
              key={index}
              onClick={() => onImageSelect(img)}
              className={`aspect-square rounded-lg overflow-hidden border-2 ${
                selectedImage === img ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              <Image 
                src={img} 
                alt="" 
                width={150} 
                height={150} 
                className="w-full h-full object-cover" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};