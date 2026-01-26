import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

interface ProductsTableProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export const ProductsTable = ({ products, onDelete }: ProductsTableProps) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Product
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Price
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Stock
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Category
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {products.map((product) => (
          <tr key={product._id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <Image
                  className="h-10 w-10 rounded-full object-cover"
                  src={product.image || '/placeholder-image.jpg'}
                  alt={product.name}
                  width={40}
                  height={40}
                />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {product.name}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {product.price} EGP
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {product.countInStock}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {product.category}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
              <Link
                href={`/admin/products/${product._id}/edit`}
                className="text-blue-600 hover:text-blue-900"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(product._id)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
