'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { Product } from '@/types';
import { productAPI } from '@/lib/api';
import SimpleProductCard from './SimpleProductCard';

export default function FeaturedProducts() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await productAPI.getLatestProducts(8);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching latest products, falling back to all products:', error);
        try {
          const response = await productAPI.getProducts();
          const sortedProducts = response.data
            .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
            .slice(0, 8);
          setProducts(sortedProducts);
        } catch (fallbackError) {
          console.error('Error fetching products:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    console.log('Add to cart:', product.name);
  };

  if (loading) {
    return (
      <section className={`py-16 ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className={`h-8 w-64 mx-auto rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`}></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className={`h-80 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} animate-pulse`}></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 transition-colors duration-300 ${isDarkMode ? 'bg-[#191C21]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-10">
        <div className="mb-10">
          <h2 className={`text-3xl md:text-4xl font-bold transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          } ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'المنتجات المميزة' : 'Featured Products'}
          </h2>
         
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <SimpleProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}