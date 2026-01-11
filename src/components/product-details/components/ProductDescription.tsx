import { Product } from '@/types';

interface ProductDescriptionProps {
  product: Product;
}

export const ProductDescription = ({ product }: ProductDescriptionProps) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
      <div className="prose max-w-none">
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>
    </div>
  );
};