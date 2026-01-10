import ProductGrid from "@/src/components/ProductGrid";
import { useProducts } from "@/src/hooks/useProducts";
import { Product } from "@/src/types";
import { Filters } from "../types";

interface ProductsSectionProps {
  filters: Filters;
}

export default function ProductsSection({ filters }: ProductsSectionProps) {
  const { products, loading, error } = useProducts({
    ...filters,
    searchQuery: "",
  });

  const handleAddToCart = (product: Product) => {
    console.log("Adding to cart:", product);
    // TODO: Implement cart functionality
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse"
          >
            <div className="aspect-square bg-gray-200"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-3 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#B39E7A] text-white rounded-md hover:bg-[#A08B6F] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return <ProductGrid products={products} onAddToCart={handleAddToCart} />;
}