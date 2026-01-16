
export const CATEGORIES = [
  "Men",
  "Women",
  "Kids",
  "Accessories",
  "Electronics",
  "Home & Garden",
  "Sports",
  "Beauty",
];

export const BRANDS = [
  "Nike",
  "Adidas",
  "Jordan",
  "Puma",
  "Reebok",
  "New Balance",
  "Under Armour",
  "Apple",
  "Samsung",
  "Sony",
  "Canon",
  "Levi's",
  "Zara",
  "H&M",
  "Uniqlo",
  "Gucci",
  "Louis Vuitton",
  "Prada",
  "Versace",
  "Ralph Lauren",
];

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "newest", label: "Newest First" },
  { value: "bestselling", label: "Best Selling" },
];

export const DEFAULT_FILTERS = {
  category: [] as string[],
  priceRange: [0, 500] as [number, number],
  rating: [] as string[],
  brand: [] as string[],
  size: [] as string[],
  availability: "All",
  discount: false,
  sortBy: "featured",
  viewMode: "grid" as const,
};