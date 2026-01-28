import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmed - Thank You',
  description: 'Your order has been successfully placed. Thank you for shopping with Global Shop.',
  robots: { index: false, follow: false },
};

export default function OrderSuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
