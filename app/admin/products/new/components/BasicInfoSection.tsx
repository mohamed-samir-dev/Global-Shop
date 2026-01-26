import { FormSectionProps } from "../types/productForm.types";

export const BasicInfoSection = ({ formData, handleChange }: FormSectionProps) => (
  <div className="border-b pb-6">
    <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name (English) *
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name (Arabic)
        </label>
        <input
          type="text"
          name="nameAr"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.nameAr}
          onChange={handleChange}
          dir="rtl"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Short Description (English)
        </label>
        <input
          type="text"
          name="shortDescription"
          maxLength={200}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.shortDescription}
          onChange={handleChange}
          placeholder="Brief product summary (max 200 characters)"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Short Description (Arabic)
        </label>
        <input
          type="text"
          name="shortDescriptionAr"
          maxLength={200}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.shortDescriptionAr}
          onChange={handleChange}
          placeholder="وصف مختصر للمنتج (200 حرف كحد أقصى)"
          dir="rtl"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Description (English) *
        </label>
        <textarea
          name="description"
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Description (Arabic)
        </label>
        <textarea
          name="descriptionAr"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.descriptionAr}
          onChange={handleChange}
          dir="rtl"
        />
      </div>
    </div>
  </div>
);
