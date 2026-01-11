import { Product } from '@/types';

interface ProductMetaProps {
  product: Product;
}

export const ProductMeta = ({ product }: ProductMetaProps) => {
  const metaItems = [
    { label: 'SKU', value: product.sku },
    { label: 'Material', value: product.material },
    { label: 'Weight', value: product.weight },
    { label: 'Warranty', value: product.warranty },
    { label: 'Return Policy', value: product.returnPolicy },
  ].filter(item => item.value);

  if (metaItems.length === 0) return null;

  return (
    <div className="border-t pt-6 space-y-4">
      {metaItems.map((item) => (
        <div key={item.label} className="flex justify-between">
          <span className="text-gray-600">{item.label}:</span>
          <span className="font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  );
};