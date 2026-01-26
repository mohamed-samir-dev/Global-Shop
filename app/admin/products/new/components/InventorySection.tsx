import { FormSectionProps } from "../types/productForm.types";

export const InventorySection = ({ formData, handleChange }: FormSectionProps) => (
  <div className="border-b pb-6">
    <h2 className="text-xl font-semibold mb-4">Inventory</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stock Quantity *
        </label>
        <input
          type="number"
          name="stock"
          required
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.stock}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SKU
        </label>
        <input
          type="text"
          name="sku"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.sku}
          onChange={handleChange}
          placeholder="Stock Keeping Unit"
        />
      </div>
    </div>
  </div>
);
