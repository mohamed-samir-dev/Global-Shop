import ProductGrid from "@/src/components/ProductGrid";
import ProductList from "@/src/components/ProductList";
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
      <div className={filters.viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={filters.viewMode === 'grid' 
              ? "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse"
              : "bg-white border border-gray-200 rounded-lg p-6 animate-pulse"
            }
          >
            {filters.viewMode === 'grid' ? (
              <>
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </>
            ) : (
              <div className="flex gap-6">
                <div className="w-30 h-30 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            )}
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

  return filters.viewMode === 'grid' 
    ? <ProductGrid products={products} onAddToCart={handleAddToCart} />
    : <ProductList products={products} onAddToCart={handleAddToCart} />;
}