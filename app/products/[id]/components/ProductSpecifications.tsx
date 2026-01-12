import { Product } from '@/src/types';

interface ProductSpecificationsProps {
  product: Product;
}

export default function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const specifications = [
    { label: 'Brand', value: product.brand },
    { label: 'Category', value: product.category },
    { label: 'SKU', value: product.sku },
    { label: 'Weight', value: product.weight },
    { label: 'Material', value: product.material },
    { label: 'Warranty', value: product.warranty },
    { label: 'Return Policy', value: product.returnPolicy },
    ...(product.dimensions ? [
      { label: 'Dimensions', value: `${product.dimensions.length} x ${product.dimensions.width} x ${product.dimensions.height}` }
    ] : []),
    ...(product.specifications ? Object.entries(product.specifications).map(([key, value]) => ({
      label: key,
      value: value
    })) : [])
  ].filter(spec => spec.value);

  if (specifications.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Specifications</h3>
        <p className="text-gray-500">No specifications available for this product.</p>
      </div>
    );
  }

  return (
    <div className="">
      <h3 className="text-lg font-semibold mb-4">Specifications</h3>
      <div className="space-y-3">
        {specifications.map((spec, index) => (
          <div key={index} className="flex justify-between items-start border-b border-gray-200 pb-2 last:border-b-0">
            <span className="font-medium text-gray-700 capitalize">{spec.label}:</span>
            <span className="text-gray-600 text-right max-w-xs">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}