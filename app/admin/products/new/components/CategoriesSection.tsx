import { FormSectionProps } from "../types/productForm.types";

export const CategoriesSection = ({ formData, handleChange }: FormSectionProps) => (
  <div className="border-b pb-6">
    <h2 className="text-xl font-semibold mb-4">Categories & Organization</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Main Category (English) *
        </label>
        <input
          type="text"
          name="category"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.category}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Main Category (Arabic)
        </label>
        <input
          type="text"
          name="categoryAr"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.categoryAr}
          onChange={handleChange}
          dir="rtl"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sub-category (English)
        </label>
        <input
          type="text"
          name="subCategory"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.subCategory}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sub-category (Arabic)
        </label>
        <input
          type="text"
          name="subCategoryAr"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.subCategoryAr}
          onChange={handleChange}
          dir="rtl"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Brand (English)
        </label>
        <input
          type="text"
          name="brand"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.brand}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Brand (Arabic)
        </label>
        <input
          type="text"
          name="brandAr"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.brandAr}
          onChange={handleChange}
          dir="rtl"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags (English)
        </label>
        <input
          type="text"
          name="tags"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Comma-separated tags"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags (Arabic)
        </label>
        <input
          type="text"
          name="tagsAr"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.tagsAr}
          onChange={handleChange}
          placeholder="علامات مفصولة بفواصل"
          dir="rtl"
        />
      </div>
    </div>
  </div>
);
