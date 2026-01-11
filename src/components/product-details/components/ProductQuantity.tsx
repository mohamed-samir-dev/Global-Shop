import { Product } from '@/types';

interface ProductQuantityProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const ProductQuantity = ({ product, quantity, onQuantityChange }: ProductQuantityProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onQuantityChange(quantity - 1)}
          className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          -
        </button>
        <span className="px-4 py-1 border border-gray-300 rounded-md">{quantity}</span>
        <button
          onClick={() => onQuantityChange(quantity + 1)}
          className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          +
        </button>
      </div>
    </div>
  );
};