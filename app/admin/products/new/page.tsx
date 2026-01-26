"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import { productAPI } from "@/src/lib/api";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import toast from "react-hot-toast";

export default function NewProductPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    nameAr: "",
    shortDescription: "",
    shortDescriptionAr: "",
    description: "",
    descriptionAr: "",

    // Pricing
    basePrice: "",
    discountType: "percentage",
    discountValue: "",
    currency: "EGP",

    // Media
    mainImage: "",
    imageGallery: [""],
    video: "",

    // Inventory
    stock: "",
    sku: "",

    // Categories & Organization
    category: "",
    categoryAr: "",
    subCategory: "",
    subCategoryAr: "",
    brand: "",
    brandAr: "",
    tags: "",
    tagsAr: "",

    // Variants & Attributes
    sizes: "",
    colors: "",

    // Additional Details
    material: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    warranty: "",
    returnPolicy: "",
    specifications: "",
    specificationsAr: "",

    // Admin Review
    adminReviewRating: "",
    adminReviewComment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const basePrice = Number(formData.basePrice);
      const discountValue = Number(formData.discountValue) || 0;
      
      // Calculate final price
      let finalPrice = basePrice;
      if (discountValue > 0) {
        if (formData.discountType === 'percentage') {
          finalPrice = basePrice - (basePrice * discountValue / 100);
        } else {
          finalPrice = basePrice - discountValue;
        }
      }

      const productData = {
        name: formData.name,
        nameAr: formData.nameAr,
        shortDescription: formData.shortDescription,
        shortDescriptionAr: formData.shortDescriptionAr,
        description: formData.description,
        descriptionAr: formData.descriptionAr,
        basePrice,
        discount: {
          type: formData.discountType as "percentage" | "fixed",
          value: discountValue,
        },
        finalPrice,
        currency: formData.currency,
        mainImage: formData.mainImage,
        imageGallery: formData.imageGallery.filter((img) => img.trim()),
        video: formData.video,
        stock: Number(formData.stock),
        sku: formData.sku,
        category: formData.category,
        categoryAr: formData.categoryAr,
        subCategory: formData.subCategory,
        subCategoryAr: formData.subCategoryAr,
        brand: formData.brand,
        brandAr: formData.brandAr,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        tagsAr: formData.tagsAr
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        sizes: formData.sizes
          .split(",")
          .map((size) => size.trim())
          .filter((size) => size),
        colors: formData.colors
          .split(",")
          .map((color) => color.trim())
          .filter((color) => color),
        material: formData.material,
        weight: formData.weight,
        dimensions: {
          length: formData.length,
          width: formData.width,
          height: formData.height,
        },
        warranty: formData.warranty,
        returnPolicy: formData.returnPolicy,
        specifications: formData.specifications
          ? Object.fromEntries(
              formData.specifications
                .split("\n")
                .map((line) => line.split(":"))
                .filter(([key, value]) => key && value)
                .map(([key, value]) => [key.trim(), value.trim()])
            )
          : {},
        specificationsAr: formData.specificationsAr
          ? Object.fromEntries(
              formData.specificationsAr
                .split("\n")
                .map((line) => line.split(":"))
                .filter(([key, value]) => key && value)
                .map(([key, value]) => [key.trim(), value.trim()])
            )
          : {},
        availability:
          Number(formData.stock) > 0
            ? ("in_stock" as const)
            : ("out_of_stock" as const),
        averageRating: formData.adminReviewRating
          ? Number(formData.adminReviewRating)
          : 0,
        totalReviews: formData.adminReviewRating ? 1 : 0,
      };

      await productAPI.createProduct(productData);
      toast.success("Product created successfully");
      router.push("/admin/products");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to create product"
          : "Failed to create product";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
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
    setFormData({ ...formData, imageGallery: [...formData.imageGallery, ""] });
  };

  const removeImageField = (index: number) => {
    const newGallery = formData.imageGallery.filter((_, i) => i !== index);
    setFormData({ ...formData, imageGallery: newGallery });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
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

          {/* Pricing */}
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

          {/* Media */}
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
                      onChange={(e) =>
                        handleImageGalleryChange(index, e.target.value)
                      }
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

          {/* Inventory */}
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

          {/* Categories & Organization */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">
              Categories & Organization
            </h2>
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

          {/* Variants & Attributes */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">
              Variants & Attributes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Sizes
                </label>
                <input
                  type="text"
                  name="sizes"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.sizes}
                  onChange={handleChange}
                  placeholder="S, M, L, XL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Colors
                </label>
                <input
                  type="text"
                  name="colors"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.colors}
                  onChange={handleChange}
                  placeholder="Red, Blue, Green"
                />
              </div>
            </div>
          </div>

          {/* Admin Review */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">
              Admin Review (Optional)
            </h2>
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

          {/* Additional Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material
                </label>
                <input
                  type="text"
                  name="material"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.material}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight
                </label>
                <input
                  type="text"
                  name="weight"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g., 1.5 kg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dimensions
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    name="length"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.length}
                    onChange={handleChange}
                    placeholder="Length"
                  />
                  <input
                    type="text"
                    name="width"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.width}
                    onChange={handleChange}
                    placeholder="Width"
                  />
                  <input
                    type="text"
                    name="height"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Height"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Warranty
                </label>
                <input
                  type="text"
                  name="warranty"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.warranty}
                  onChange={handleChange}
                  placeholder="e.g., 1 year warranty"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Policy
                </label>
                <input
                  type="text"
                  name="returnPolicy"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.returnPolicy}
                  onChange={handleChange}
                  placeholder="e.g., 30-day return policy"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Specifications (English)
                </label>
                <textarea
                  name="specifications"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.specifications}
                  onChange={handleChange}
                  placeholder="Enter specifications as key:value pairs, one per line:\nProcessor: Intel Core i7\nRAM: 16GB\nStorage: 512GB SSD"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter each specification on a new line in format: Key: Value
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Specifications (Arabic)
                </label>
                <textarea
                  name="specificationsAr"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.specificationsAr}
                  onChange={handleChange}
                  placeholder="أدخل المواصفات كأزواج مفتاح:قيمة، واحد في كل سطر:\nالمعالج: إنتل كور i7\nالذاكرة: 16 جيجابايت\nالتخزين: 512 جيجابايت SSD"
                  dir="rtl"
                />
                <p className="text-sm text-gray-500 mt-1">
                  أدخل كل مواصفة في سطر جديد بالصيغة: المفتاح: القيمة
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
