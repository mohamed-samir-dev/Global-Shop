import { Product } from '@/types';

interface ProductSpecificationsProps {
  product: Product;
}

export const ProductSpecifications = ({ product }: ProductSpecificationsProps) => {
  const hasSpecifications = (product.specifications && Object.keys(product.specifications).length > 0) || 
                           (product.specificationsAr && Object.keys(product.specificationsAr).length > 0);

  if (!hasSpecifications) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
      <div className="bg-gray-50 rounded-lg p-6">
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">English</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-200 last:border-b-0">
                  <span className="font-medium text-gray-700">{key}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {product.specificationsAr && Object.keys(product.specificationsAr).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3" dir="rtl">العربية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="rtl">
              {Object.entries(product.specificationsAr).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-200 last:border-b-0">
                  <span className="font-medium text-gray-700">{key}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};