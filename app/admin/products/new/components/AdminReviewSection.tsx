import { FormSectionProps } from "../types/productForm.types";

export const AdminReviewSection = ({ formData, handleChange }: FormSectionProps) => (
  <div className="border-b pb-6">
    <h2 className="text-xl font-semibold mb-4">Admin Review (Optional)</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating (1-5)
        </label>
        <select
          name="adminReviewRating"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.adminReviewRating}
          onChange={handleChange}
        >
          <option value="">Select Rating</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Review Comment
        </label>
        <textarea
          name="adminReviewComment"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.adminReviewComment}
          onChange={handleChange}
          placeholder="Write the first review for this product..."
        />
      </div>
    </div>
  </div>
);
