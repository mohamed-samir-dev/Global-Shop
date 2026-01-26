import { useState } from "react";
import { useRouter } from "next/navigation";
import { productAPI } from "@/src/lib/api";
import toast from "react-hot-toast";
import { ProductFormData } from "../types/productForm.types";

export const useProductForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    nameAr: "",
    shortDescription: "",
    shortDescriptionAr: "",
    description: "",
    descriptionAr: "",
    basePrice: "",
    discountType: "percentage",
    discountValue: "",
    currency: "EGP",
    mainImage: "",
    imageGallery: [""],
    video: "",
    stock: "",
    sku: "",
    category: "",
    categoryAr: "",
    subCategory: "",
    subCategoryAr: "",
    brand: "",
    brandAr: "",
    tags: "",
    tagsAr: "",
    sizes: "",
    colors: "",
    material: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    warranty: "",
    returnPolicy: "",
    specifications: "",
    specificationsAr: "",
    adminReviewRating: "",
    adminReviewComment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const basePrice = Number(formData.basePrice);
      const discountValue = Number(formData.discountValue) || 0;
      
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
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag),
        tagsAr: formData.tagsAr.split(",").map((tag) => tag.trim()).filter((tag) => tag),
        sizes: formData.sizes.split(",").map((size) => size.trim()).filter((size) => size),
        colors: formData.colors.split(",").map((color) => color.trim()).filter((color) => color),
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
        availability: Number(formData.stock) > 0 ? ("in_stock" as const) : ("out_of_stock" as const),
        averageRating: formData.adminReviewRating ? Number(formData.adminReviewRating) : 0,
        totalReviews: formData.adminReviewRating ? 1 : 0,
      };

      await productAPI.createProduct(productData);
      toast.success("Product created successfully");
      router.push("/admin/products");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || "Failed to create product"
          : "Failed to create product";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    handleImageGalleryChange,
    addImageField,
    removeImageField,
    handleSubmit,
  };
};
