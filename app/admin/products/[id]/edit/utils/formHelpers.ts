import { Product } from "@/src/types";
import { ProductFormData } from "../types";

export const productToFormData = (productData: Product): ProductFormData => ({
  name: productData.name || "",
  nameAr: productData.nameAr || "",
  shortDescription: productData.shortDescription || "",
  shortDescriptionAr: productData.shortDescriptionAr || "",
  description: productData.description || "",
  descriptionAr: productData.descriptionAr || "",
  basePrice: (productData.basePrice || productData.price || 0).toString(),
  discountType: productData.discount?.type || "percentage",
  discountValue: (productData.discount?.value || 0).toString(),
  currency: productData.currency || "USD",
  mainImage: productData.mainImage || productData.image || "",
  imageGallery: productData.imageGallery || [""],
  video: productData.video || "",
  stock: (productData.stock || productData.countInStock || 0).toString(),
  sku: productData.sku || "",
  category: productData.category || "",
  categoryAr: productData.categoryAr || "",
  subCategory: productData.subCategory || "",
  subCategoryAr: productData.subCategoryAr || "",
  brand: productData.brand || "",
  brandAr: productData.brandAr || "",
  tags: productData.tags?.join(", ") || "",
  tagsAr: productData.tagsAr?.join(", ") || "",
  sizes: productData.sizes?.join(", ") || "",
  colors: productData.colors?.join(", ") || "",
  material: productData.material || "",
  weight: productData.weight || "",
  length: productData.dimensions?.length || "",
  width: productData.dimensions?.width || "",
  height: productData.dimensions?.height || "",
  warranty: productData.warranty || "",
  returnPolicy: productData.returnPolicy || "",
  specifications: productData.specifications
    ? Object.entries(productData.specifications)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")
    : "",
  specificationsAr: productData.specificationsAr
    ? Object.entries(productData.specificationsAr)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")
    : "",
  adminReviewRating: "",
  adminReviewComment: "",
});

export const formDataToProduct = (formData: ProductFormData, userId: string, userName: string, userEmail: string, product: Product): Partial<Product> => {
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
      value: Number(formData.discountValue) || 0,
    },
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
  };

  if (formData.adminReviewRating && (!product.reviews || product.reviews.length === 0)) {
    productData.reviews = [
      {
        _id: new Date().getTime().toString(),
        user: { _id: userId, name: userName, email: userEmail },
        rating: Number(formData.adminReviewRating),
        comment: formData.adminReviewComment,
        date: new Date().toISOString(),
      },
    ];
    productData.averageRating = Number(formData.adminReviewRating);
    productData.totalReviews = 1;
  }

  return productData;
};
