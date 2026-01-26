import { ProductFormData } from "../types";
import { Product } from "@/src/types";

interface Props {
  formData: ProductFormData;
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => void;
  product: Product;
}

export default function AdminReview({ formData, onChange, product }: Props) {
  if (product.reviews && product.reviews.length > 0) return null;

  return (
    <div className="border-b pb-6">
      <h2 className="text-xl font-semibold mb-4">Add Admin Review (Optional)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
          <select name="adminReviewRating" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.adminReviewRating} onChange={onChange}>
            <option value="">Select Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Review Comment</label>
          <textarea name="adminReviewComment" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.adminReviewComment} onChange={onChange} placeholder="Write the first review for this product..." />
        </div>
      </div>
    </div>
  );
}
