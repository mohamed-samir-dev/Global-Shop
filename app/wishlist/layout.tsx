import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wishlist - Saved Items',
  description: 'View and manage your saved items. Add products to your wishlist and purchase them later.',
  robots: { index: false, follow: true },
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
