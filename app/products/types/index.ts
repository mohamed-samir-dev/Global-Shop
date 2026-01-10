export type Filters = {
  category: string[];
  priceRange: [number, number];
  rating: string[];
  brand: string[];
  size: string[];
  availability: string;
  discount: boolean;
  sortBy: string;
  viewMode: 'grid' | 'list';
};

export type FilterChangeHandler = (
  filterType: string,
  value: string | [number, number] | boolean
) => void;

export type ArrayFilterChangeHandler = (filterType: string, value: string) => void;