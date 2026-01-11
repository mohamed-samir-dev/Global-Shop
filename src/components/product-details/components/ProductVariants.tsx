import { Product } from '@/types';

interface ProductVariantsProps {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  onSizeSelect: (size: string) => void;
  onColorSelect: (color: string) => void;
}

export const ProductVariants = ({ 
  product, 
  selectedSize, 
  selectedColor, 
  onSizeSelect, 
  onColorSelect 
}: ProductVariantsProps) => {
  return (
    <>
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
          <div className="flex space-x-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => onSizeSelect(size)}
                className={`px-4 py-2 border rounded-md ${
                  selectedSize === size
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.colors && product.colors.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
          <div className="flex space-x-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => onColorSelect(color)}
                className={`px-4 py-2 border rounded-md ${
                  selectedColor === color
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};