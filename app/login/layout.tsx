import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Access Your Account',
  description: 'Login to your Global Shop account to view orders, manage wishlist, and enjoy personalized shopping.',
  robots: { index: false, follow: true },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
