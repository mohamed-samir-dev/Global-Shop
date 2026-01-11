import { Product } from '@/types';

interface ProductVideoProps {
  product: Product;
}

export const ProductVideo = ({ product }: ProductVideoProps) => {
  if (!product.video) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Video</h2>
      <div className="aspect-video">
        <video
          src={product.video}
          controls
          className="w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
};