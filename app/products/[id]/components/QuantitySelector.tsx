interface QuantitySelectorProps {
  quantity: number;
  maxQuantity: number;
  onQuantityChange: (quantity: number) => void;
}

export default function QuantitySelector({
  quantity,
  maxQuantity,
  onQuantityChange,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    onQuantityChange(Math.max(1, quantity - 1));
  };

  const handleIncrement = () => {
    onQuantityChange(Math.min(maxQuantity, quantity + 1));
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium text-gray-700">Quantity:</span>
      <div className="flex items-center border border-gray-300 rounded-lg">
        <button
          onClick={handleDecrement}
          className="px-3 py-2 hover:bg-gray-100 transition-colors"
        >
          -
        </button>
        <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
          {quantity}
        </span>
        <button
          onClick={handleIncrement}
          className="px-3 py-2 hover:bg-gray-100 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}