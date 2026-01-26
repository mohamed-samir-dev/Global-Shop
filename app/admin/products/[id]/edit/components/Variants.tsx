import { ProductFormData } from "../types";

interface Props {
  formData: ProductFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Variants({ formData, onChange }: Props) {
  return (
    <div className="border-b pb-6">
      <h2 className="text-xl font-semibold mb-4">Variants & Attributes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
          <input type="text" name="sizes" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.sizes} onChange={onChange} placeholder="S, M, L, XL" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Colors</label>
          <input type="text" name="colors" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.colors} onChange={onChange} placeholder="Red, Blue, Green" />
        </div>
      </div>
    </div>
  );
}
