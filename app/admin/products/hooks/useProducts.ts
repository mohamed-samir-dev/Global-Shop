import { useState, useEffect } from 'react';
import { productAPI } from '@/lib/api';
import { Product } from '@/types';
import toast from 'react-hot-toast';

export const useProducts = (isAdmin: boolean) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin]);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getProducts();
      setProducts(response.data);
    } catch {
      toast.error('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.deleteProduct(id);
        setProducts(products.filter(p => p._id !== id));
        toast.success('Product deleted successfully');
      } catch {
        toast.error('Failed to delete product');
      }
    }
  };

  return { products, isLoading, handleDelete };
};
