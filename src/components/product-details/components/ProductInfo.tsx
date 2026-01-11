import { Product } from '@/types';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
      {product.brand && (
        <p className="text-lg text-gray-600 mt-1">by {product.brand}</p>
      )}
      {product.shortDescription && (
        <p className="text-gray-600 mt-2">{product.shortDescription}</p>
      )}
    </div>
  );
};