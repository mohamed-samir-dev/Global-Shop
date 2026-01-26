import { ProductFormData } from "../types";

interface Props {
  formData: ProductFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function AdditionalDetails({ formData, onChange }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
          <input type="text" name="material" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.material} onChange={onChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
          <input type="text" name="weight" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.weight} onChange={onChange} placeholder="e.g., 1.5 kg" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
          <div className="grid grid-cols-3 gap-2">
            <input type="text" name="length" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.length} onChange={onChange} placeholder="Length" />
            <input type="text" name="width" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.width} onChange={onChange} placeholder="Width" />
            <input type="text" name="height" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.height} onChange={onChange} placeholder="Height" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Warranty</label>
          <input type="text" name="warranty" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.warranty} onChange={onChange} placeholder="e.g., 1 year warranty" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Return Policy</label>
          <input type="text" name="returnPolicy" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.returnPolicy} onChange={onChange} placeholder="e.g., 30-day return policy" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Specifications (English)</label>
          <textarea name="specifications" rows={6} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.specifications} onChange={onChange} placeholder="Enter specifications as key:value pairs, one per line:&#10;Processor: Intel Core i7&#10;RAM: 16GB&#10;Storage: 512GB SSD" />
          <p className="text-sm text-gray-500 mt-1">Enter each specification on a new line in format: Key: Value</p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Specifications (Arabic)</label>
          <textarea name="specificationsAr" rows={6} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.specificationsAr} onChange={onChange} dir="rtl" />
          <p className="text-sm text-gray-500 mt-1">أدخل كل مواصفة في سطر جديد بالصيغة: المفتاح: القيمة</p>
        </div>
      </div>
    </div>
  );
}
