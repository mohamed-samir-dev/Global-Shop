import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register - Create Account',
  description: 'Create your Global Shop account to enjoy exclusive benefits, track orders, and save your favorite items.',
  robots: { index: false, follow: true },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
