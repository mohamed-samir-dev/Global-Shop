import Image from 'next/image';
import { ProductImageProps } from '../types';
import { getProductImageUrl, isValidImageUrl } from '../utils';

export const ProductImage = ({ product }: ProductImageProps) => {
  const imageUrl = getProductImageUrl(product);
  const isValid = isValidImageUrl(imageUrl);

  return (
    <div className="w-full h-48 border border-gray-200 rounded-lg mb-3 bg-gray-50 relative overflow-hidden">
     
      {isValid ? (
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 384px) 100vw, 384px"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
          📦
        </div>
      )}
    </div>
  );
};