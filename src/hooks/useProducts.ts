'use client';

import { useState, useEffect, useMemo } from 'react';
import { Product } from '@/types';
import { productAPI } from '@/lib/api';

interface Filters {
  category: string[];
  priceRange: [number, number];
  rating: string[];
  brand: string[];
  size: string[];
  availability: string;
  discount: boolean;
  sortBy: string;
  searchQuery: string;
}

export function useProducts(filters: Filters) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getProducts();
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(product =>
        filters.category.includes(product.category)
      );
    }

    // Price range filter
    filtered = filtered.filter(product => {
      const price = product.finalPrice || product.basePrice || product.price || 0;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Rating filter
    if (filters.rating.length > 0) {
      filtered = filtered.filter(product =>
        filters.rating.some(rating => 
          product.averageRating >= parseInt(rating)
        )
      );
    }

    // Brand filter
    if (filters.brand.length > 0) {
      filtered = filtered.filter(product =>
        product.brand && filters.brand.includes(product.brand)
      );
    }

    // Size filter
    if (filters.size.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes && product.sizes.some(size => filters.size.includes(size))
      );
    }

    // Availability filter
    if (filters.availability && filters.availability !== 'All') {
      const availabilityMap: { [key: string]: string } = {
        'In Stock': 'in_stock',
        'Out of Stock': 'out_of_stock',
        'Pre-order': 'pre_order'
      };
      filtered = filtered.filter(product =>
        product.availability === availabilityMap[filters.availability]
      );
    }

    // Discount filter
    if (filters.discount) {
      filtered = filtered.filter(product =>
        product.discount && product.discount.value > 0
      );
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = a.finalPrice || a.basePrice || a.price || 0;
          const priceB = b.finalPrice || b.basePrice || b.price || 0;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = a.finalPrice || a.basePrice || a.price || 0;
          const priceB = b.finalPrice || b.basePrice || b.price || 0;
          return priceB - priceA;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 'newest':
        filtered.sort((a, b) => 
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
        break;
      case 'bestselling':
        filtered.sort((a, b) => b.totalReviews - a.totalReviews);
        break;
      default:
        // Featured - keep original order or sort by rating
        filtered.sort((a, b) => b.averageRating - a.averageRating);
    }

    return filtered;
  }, [products, filters]);

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const categories = [...new Set(products.map(p => p.category))];
    const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
    const sizes = [...new Set(products.flatMap(p => p.sizes || []))];

    return { categories, brands, sizes };
  }, [products]);

  return {
    products: filteredProducts,
    loading,
    error,
    filterOptions,
    totalProducts: products.length,
    filteredCount: filteredProducts.length
  };
}