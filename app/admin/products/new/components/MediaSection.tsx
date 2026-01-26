import { ProductFormData } from "../types/productForm.types";

interface MediaSectionProps {
  formData: ProductFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageGalleryChange: (index: number, value: string) => void;
  addImageField: () => void;
  removeImageField: (index: number) => void;
}

export const MediaSection = ({
  formData,
  handleChange,
  handleImageGalleryChange,
  addImageField,
  removeImageField,
}: MediaSectionProps) => (
  <div className="border-b pb-6">
    <h2 className="text-xl font-semibold mb-4">Media</h2>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Main Image URL *
        </label>
        <input
          type="url"
          name="mainImage"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.mainImage}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image Gallery
        </label>
        {formData.imageGallery.map((img, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="url"
              placeholder="Image URL"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={img}
              onChange={(e) => handleImageGalleryChange(index, e.target.value)}
            />
            {formData.imageGallery.length > 1 && (
              <button
                type="button"
                onClick={() => removeImageField(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addImageField}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add Image
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Video URL
        </label>
        <input
          type="url"
          name="video"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.video}
          onChange={handleChange}
        />
      </div>
    </div>
  </div>
);
