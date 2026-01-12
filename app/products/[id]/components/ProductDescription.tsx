import { Product } from '@/types';

interface ProductDescriptionProps {
  product: Product;
}

export default function ProductDescription({ product }: ProductDescriptionProps) {
  return (
    <div className="">
      <h3 className="text-lg font-semibold mb-4">Description</h3>
      <div className="prose prose-gray max-w-none">
      {product.shortDescription && product.shortDescription !== product.description && (
          <div className="mb-5">
            <p className="text-sm">{product.shortDescription}</p>
          </div>
        )}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {product.description}
        </p>
        
      </div>
    </div>
  );
}