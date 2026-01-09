import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={192}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-green-600">${product.price}</span>
        <span className="text-sm text-gray-500">Stock: {product.countInStock}</span>
      </div>
      <Link
        href={`/products/${product._id}`}
        className="mt-4 block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
      >
        View Details
      </Link>
    </div>
  );
}