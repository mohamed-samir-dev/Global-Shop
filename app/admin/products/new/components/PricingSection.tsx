import { FormSectionProps } from "../types/productForm.types";

export const PricingSection = ({ formData, handleChange }: FormSectionProps) => (
  <div className="border-b pb-6">
    <h2 className="text-xl font-semibold mb-4">Pricing</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Base Price *
        </label>
        <input
          type="number"
          name="basePrice"
          required
          min="0"
          step="0.01"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.basePrice}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Discount Type
        </label>
        <select
          name="discountType"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.discountType}
          onChange={handleChange}
        >
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed Amount</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Discount Value
        </label>
        <input
          type="number"
          name="discountValue"
          min="0"
          step="0.01"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.discountValue}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Currency
        </label>
        <select
          name="currency"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.currency}
          onChange={handleChange}
          disabled
        >
          <option value="EGP">EGP</option>
        </select>
      </div>
    </div>
  </div>
);
