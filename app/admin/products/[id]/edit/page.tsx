"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import { useProductEdit } from "./hooks/useProductEdit";
import BasicInformation from "./components/BasicInformation";
import Pricing from "./components/Pricing";
import Media from "./components/Media";
import Inventory from "./components/Inventory";
import Categories from "./components/Categories";
import Variants from "./components/Variants";
import AdminReview from "./components/AdminReview";
import AdditionalDetails from "./components/AdditionalDetails";

export default function EditProductPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const {
    product, formData, isSubmitting, isLoading: isProductLoading,
    handleSubmit, handleChange, handleImageGalleryChange,
    addImageField, removeImageField,
  } = useProductEdit(params.id as string, user?._id);

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push("/");
    }
  }, [user, isLoading, router]);

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
        <form onSubmit={(e) => handleSubmit(e, user)} className="space-y-8">
          <BasicInformation formData={formData} onChange={handleChange} />
          <Pricing formData={formData} onChange={handleChange} />
          <Media
            formData={formData}
            onChange={handleChange}
            onImageGalleryChange={handleImageGalleryChange}
            onAddImage={addImageField}
            onRemoveImage={removeImageField}
          />
          <Inventory formData={formData} onChange={handleChange} />
          <Categories formData={formData} onChange={handleChange} />
          <Variants formData={formData} onChange={handleChange} />
          <AdminReview formData={formData} onChange={handleChange} product={product} />
          <AdditionalDetails formData={formData} onChange={handleChange} />

          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Update Product"}
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
