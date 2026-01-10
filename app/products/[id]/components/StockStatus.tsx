import { getStockStatus } from '../utils/productHelpers';

interface StockStatusProps {
  countInStock: number;
}

export default function StockStatus({ countInStock }: StockStatusProps) {
  const stockInfo = getStockStatus(countInStock);

  return (
    <div className="flex items-center space-x-3">
      <div className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${stockInfo.className}`}>
        <div className={`w-2 h-2 rounded-full ${stockInfo.dotClassName}`}></div>
        <span>{stockInfo.text}</span>
      </div>
    </div>
  );
}