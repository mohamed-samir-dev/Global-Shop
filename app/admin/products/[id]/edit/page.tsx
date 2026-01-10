'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { productAPI } from '@/src/lib/api';
import { Product } from '@/src/types';
import LoadingSpinner from '@/src/components/LoadingSpinner';
import toast from 'react-hot-toast';

export default function EditProductPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    nameAr: '',
    shortDescription: '',
    shortDescriptionAr: '',
    description: '',
    descriptionAr: '',
    
    // Pricing
    basePrice: '',
    discountType: 'percentage',
    discountValue: '',
    currency: 'USD',
    
    // Media
    mainImage: '',
    imageGallery: [''],
    video: '',
    
    // Inventory
    stock: '',
    sku: '',
    
    // Categories & Organization
    category: '',
    categoryAr: '',
    subCategory: '',
    subCategoryAr: '',
    brand: '',
    brandAr: '',
    tags: '',
    tagsAr: '',
    
    // Variants & Attributes
    sizes: '',
    colors: '',
    
    // Additional Details
    material: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    warranty: '',
    returnPolicy: '',
    specifications: '',
    specificationsAr: '',
    
    // Admin Review
    adminReviewRating: '',
    adminReviewComment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProductLoading, setIsProductLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (params.id && user && user.isAdmin) {
      fetchProduct(params.id as string);
    }
  }, [params.id, user]);

  const fetchProduct = async (id: string) => {
    try {
      const response = await productAPI.getProduct(id);
      const productData = response.data;
      setProduct(productData);
      setFormData({
        name: productData.name || '',
        nameAr: productData.nameAr || '',
        shortDescription: productData.shortDescription || '',
        shortDescriptionAr: productData.shortDescriptionAr || '',
        description: productData.description || '',
        descriptionAr: productData.descriptionAr || '',
        basePrice: (productData.basePrice || productData.price || 0).toString(),
        discountType: productData.discount?.type || 'percentage',
        discountValue: (productData.discount?.value || 0).toString(),
        currency: productData.currency || 'USD',
        mainImage: productData.mainImage || productData.image || '',
        imageGallery: productData.imageGallery || [''],
        video: productData.video || '',
        stock: (productData.stock || productData.countInStock || 0).toString(),
        sku: productData.sku || '',
        category: productData.category || '',
        categoryAr: productData.categoryAr || '',
        subCategory: productData.subCategory || '',
        subCategoryAr: productData.subCategoryAr || '',
        brand: productData.brand || '',
        brandAr: productData.brandAr || '',
        tags: productData.tags?.join(', ') || '',
        tagsAr: productData.tagsAr?.join(', ') || '',
        sizes: productData.sizes?.join(', ') || '',
        colors: productData.colors?.join(', ') || '',
        material: productData.material || '',
        weight: productData.weight || '',
        length: productData.dimensions?.length || '',
        width: productData.dimensions?.width || '',
        height: productData.dimensions?.height || '',
        warranty: productData.warranty || '',
        returnPolicy: productData.returnPolicy || '',
        specifications: productData.specifications ? 
          Object.entries(productData.specifications)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n') : '',
        specificationsAr: productData.specificationsAr ? 
          Object.entries(productData.specificationsAr)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n') : '',
        adminReviewRating: '',
        adminReviewComment: ''
      });
    } catch {
      toast.error('Failed to fetch product details');
    } finally {
      setIsProductLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    
    setIsSubmitting(true);

    try {
      const productData: Partial<Product> = {
        name: formData.name,
        nameAr: formData.nameAr,
        shortDescription: formData.shortDescription,
        shortDescriptionAr: formData.shortDescriptionAr,
        description: formData.description,
        descriptionAr: formData.descriptionAr,
        basePrice: Number(formData.basePrice),
        discount: {
          type: formData.discountType as "percentage" | "fixed",
          value: Number(formData.discountValue) || 0
        },
        currency: formData.currency,
        mainImage: formData.mainImage,
        imageGallery: formData.imageGallery.filter(img => img.trim()),
        video: formData.video,
        stock: Number(formData.stock),
        sku: formData.sku,
        category: formData.category,
        categoryAr: formData.categoryAr,
        subCategory: formData.subCategory,
        subCategoryAr: formData.subCategoryAr,
        brand: formData.brand,
        brandAr: formData.brandAr,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        tagsAr: formData.tagsAr.split(',').map(tag => tag.trim()).filter(tag => tag),
        sizes: formData.sizes.split(',').map(size => size.trim()).filter(size => size),
        colors: formData.colors.split(',').map(color => color.trim()).filter(color => color),
        material: formData.material,
        weight: formData.weight,
        dimensions: {
          length: formData.length,
          width: formData.width,
          height: formData.height
        },
        warranty: formData.warranty,
        returnPolicy: formData.returnPolicy,
        specifications: formData.specifications ? 
          Object.fromEntries(
            formData.specifications.split('\n')
              .map(line => line.split(':'))
              .filter(([key, value]) => key && value)
              .map(([key, value]) => [key.trim(), value.trim()])
          ) : {},
        specificationsAr: formData.specificationsAr ? 
          Object.fromEntries(
            formData.specificationsAr.split('\n')
              .map(line => line.split(':'))
              .filter(([key, value]) => key && value)
              .map(([key, value]) => [key.trim(), value.trim()])
          ) : {}
      };
      
      // Add admin review if provided and product doesn't have reviews yet
      if (formData.adminReviewRating && (!product.reviews || product.reviews.length === 0) && user) {
        productData.reviews = [{
          _id: new Date().getTime().toString(),
          user: {
            _id: user._id,
            name: user.name,
            email: user.email
          },
          rating: Number(formData.adminReviewRating),
          comment: formData.adminReviewComment,
          date: new Date().toISOString()
        }];
        productData.averageRating = Number(formData.adminReviewRating);
        productData.totalReviews = 1;
      }
      
      await productAPI.updateProduct(product._id, productData);
      toast.success('Product updated successfully');
      router.push('/admin/products');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update product';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageGalleryChange = (index: number, value: string) => {
    const newGallery = [...formData.imageGallery];
    newGallery[index] = value;
    setFormData({ ...formData, imageGallery: newGallery });
  };

  const addImageField = () => {
    setFormData({ ...formData, imageGallery: [...formData.imageGallery, ''] });
  };

  const removeImageField = (index: number) => {
    const newGallery = formData.imageGallery.filter((_, i) => i !== index);
    setFormData({ ...formData, imageGallery: newGallery });
  };

  if (isLoading || isProductLoading) {
    return <LoadingSpinner />;
  }

  if (!user || !user.isAdmin) {
    return null;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
      
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name (English) *</label>
                <input type="text" name="name" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name (Arabic)</label>
                <input type="text" name="nameAr" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.nameAr} onChange={handleChange} dir="rtl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Description (English)</label>
                <input type="text" name="shortDescription" maxLength={200} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.shortDescription} onChange={handleChange} placeholder="Brief product summary (max 200 characters)" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Description (Arabic)</label>
                <input type="text" name="shortDescriptionAr" maxLength={200} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.shortDescriptionAr} onChange={handleChange} dir="rtl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Description (English) *</label>
                <textarea name="description" required rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.description} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Description (Arabic)</label>
                <textarea name="descriptionAr" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.descriptionAr} onChange={handleChange} dir="rtl" />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Base Price *</label>
                <input type="number" name="basePrice" required min="0" step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.basePrice} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
                <select name="discountType" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.discountType} onChange={handleChange}>
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Value</label>
                <input type="number" name="discountValue" min="0" step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.discountValue} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select name="currency" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.currency} onChange={handleChange}>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">Media</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Image URL *</label>
                <input type="url" name="mainImage" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.mainImage} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image Gallery</label>
                {formData.imageGallery.map((img, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input type="url" placeholder="Image URL" className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={img} onChange={(e) => handleImageGalleryChange(index, e.target.value)} />
                    {formData.imageGallery.length > 1 && (
                      <button type="button" onClick={() => removeImageField(index)} className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Remove</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addImageField} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Add Image</button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Video URL</label>
                <input type="url" name="video" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.video} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
                <input type="number" name="stock" required min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.stock} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                <input type="text" name="sku" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.sku} onChange={handleChange} placeholder="Stock Keeping Unit" />
              </div>
            </div>
          </div>

          {/* Categories & Organization */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">Categories & Organization</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Category (English) *</label>
                <input type="text" name="category" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.category} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Category (Arabic)</label>
                <input type="text" name="categoryAr" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.categoryAr} onChange={handleChange} dir="rtl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sub-category (English)</label>
                <input type="text" name="subCategory" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.subCategory} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sub-category (Arabic)</label>
                <input type="text" name="subCategoryAr" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.subCategoryAr} onChange={handleChange} dir="rtl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand (English)</label>
                <input type="text" name="brand" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.brand} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand (Arabic)</label>
                <input type="text" name="brandAr" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.brandAr} onChange={handleChange} dir="rtl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (English)</label>
                <input type="text" name="tags" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.tags} onChange={handleChange} placeholder="Comma-separated tags" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (Arabic)</label>
                <input type="text" name="tagsAr" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.tagsAr} onChange={handleChange} dir="rtl" />
              </div>
            </div>
          </div>

          {/* Variants & Attributes */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">Variants & Attributes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
                <input type="text" name="sizes" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.sizes} onChange={handleChange} placeholder="S, M, L, XL" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Colors</label>
                <input type="text" name="colors" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.colors} onChange={handleChange} placeholder="Red, Blue, Green" />
              </div>
            </div>
          </div>

          {/* Admin Review */}
          {(!product.reviews || product.reviews.length === 0) && (
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">Add Admin Review (Optional)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
                  <select name="adminReviewRating" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.adminReviewRating} onChange={handleChange}>
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
          )}

          {/* Additional Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                <input type="text" name="material" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.material} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                <input type="text" name="weight" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.weight} onChange={handleChange} placeholder="e.g., 1.5 kg" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
                <div className="grid grid-cols-3 gap-2">
                  <input type="text" name="length" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.length} onChange={handleChange} placeholder="Length" />
                  <input type="text" name="width" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.width} onChange={handleChange} placeholder="Width" />
                  <input type="text" name="height" className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.height} onChange={handleChange} placeholder="Height" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Warranty</label>
                <input type="text" name="warranty" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.warranty} onChange={handleChange} placeholder="e.g., 1 year warranty" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Return Policy</label>
                <input type="text" name="returnPolicy" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.returnPolicy} onChange={handleChange} placeholder="e.g., 30-day return policy" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Specifications (English)</label>
                <textarea 
                  name="specifications" 
                  rows={6} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={formData.specifications} 
                  onChange={handleChange} 
                  placeholder="Enter specifications as key:value pairs, one per line:\nProcessor: Intel Core i7\nRAM: 16GB\nStorage: 512GB SSD"
                />
                <p className="text-sm text-gray-500 mt-1">Enter each specification on a new line in format: Key: Value</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Specifications (Arabic)</label>
                <textarea 
                  name="specificationsAr" 
                  rows={6} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={formData.specificationsAr} 
                  onChange={handleChange} 
                  dir="rtl"
                />
                <p className="text-sm text-gray-500 mt-1">أدخل كل مواصفة في سطر جديد بالصيغة: المفتاح: القيمة</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50">
              {isSubmitting ? 'Updating...' : 'Update Product'}
            </button>
            <button type="button" onClick={() => router.back()} className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}