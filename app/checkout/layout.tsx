import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout - Secure Payment',
  description: 'Complete your purchase with our secure checkout process. Multiple payment options available.',
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
