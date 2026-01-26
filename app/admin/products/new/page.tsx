"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import { useProductForm } from "./hooks/useProductForm";
import {
  BasicInfoSection,
  PricingSection,
  MediaSection,
  InventorySection,
  CategoriesSection,
  VariantsSection,
  AdminReviewSection,
  AdditionalDetailsSection,
} from "./components";

export default function NewProductPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const {
    formData,
    isSubmitting,
    handleChange,
    handleImageGalleryChange,
    addImageField,
    removeImageField,
    handleSubmit,
  } = useProductForm();

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push("/");
    }
  }, [user, isLoading, router]);

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
          <BasicInfoSection formData={formData} handleChange={handleChange} />
          <PricingSection formData={formData} handleChange={handleChange} />
          <MediaSection
            formData={formData}
            handleChange={handleChange}
            handleImageGalleryChange={handleImageGalleryChange}
            addImageField={addImageField}
            removeImageField={removeImageField}
          />
          <InventorySection formData={formData} handleChange={handleChange} />
          <CategoriesSection formData={formData} handleChange={handleChange} />
          <VariantsSection formData={formData} handleChange={handleChange} />
          <AdminReviewSection formData={formData} handleChange={handleChange} />
          <AdditionalDetailsSection formData={formData} handleChange={handleChange} />

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