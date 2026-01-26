'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useProducts } from './hooks/useProducts';
import { PageHeader, ProductsTable, EmptyState } from './components';

export default function AdminProductsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { products, isLoading: isProductsLoading, handleDelete } = useProducts(user?.isAdmin || false);

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading || isProductsLoading) {
    return <LoadingSpinner />;
  }

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader />
      {products.length === 0 ? (
        <EmptyState />
      ) : (
        <ProductsTable products={products} onDelete={handleDelete} />
      )}
    </div>
  );
}
