import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products - Browse Our Collection',
  description: 'Browse our extensive collection of premium products. Filter by category, price, and more. Find the perfect items with fast shipping and secure checkout.',
  keywords: ['products', 'shop', 'buy online', 'e-commerce products', 'online store'],
  openGraph: {
    title: 'Shop Products - Global Shop',
    description: 'Browse our extensive collection of premium products with fast shipping.',
    url: 'https://global-shop-iota.vercel.app/products',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
