import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { productAPI } from "@/src/lib/api";
import { Product } from "@/src/types";
import toast from "react-hot-toast";
import { ProductFormData } from "../types";
import { productToFormData, formDataToProduct } from "../utils/formHelpers";

export const useProductEdit = (productId: string, userId?: string) => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "", nameAr: "", shortDescription: "", shortDescriptionAr: "",
    description: "", descriptionAr: "", basePrice: "", discountType: "percentage",
    discountValue: "", currency: "USD", mainImage: "", imageGallery: [""],
    video: "", stock: "", sku: "", category: "", categoryAr: "",
    subCategory: "", subCategoryAr: "", brand: "", brandAr: "",
    tags: "", tagsAr: "", sizes: "", colors: "", material: "",
    weight: "", length: "", width: "", height: "", warranty: "",
    returnPolicy: "", specifications: "", specificationsAr: "",
    adminReviewRating: "", adminReviewComment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (productId && userId) {
      fetchProduct(productId);
    }
  }, [productId, userId]);

  const fetchProduct = async (id: string) => {
    try {
      const response = await productAPI.getProduct(id);
      setProduct(response.data);
      setFormData(productToFormData(response.data));
    } catch {
      toast.error("Failed to fetch product details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, user: any) => {
    e.preventDefault();
    if (!product) return;

    setIsSubmitting(true);
    try {
      const productData = formDataToProduct(formData, user._id, user.name, user.email, product);
      await productAPI.updateProduct(product._id, productData);
      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return {
    product, formData, isSubmitting, isLoading,
    handleSubmit, handleChange, handleImageGalleryChange,
    addImageField, removeImageField,
  };
};
