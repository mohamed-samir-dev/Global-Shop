import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Our Story',
  description: 'Learn about Global Shop\'s journey from 2020 to becoming a leading e-commerce platform. Discover our commitment to quality, fast shipping, and customer satisfaction.',
  openGraph: {
    title: 'About Global Shop - Our Story',
    description: 'Learn about our journey and commitment to quality products and customer satisfaction.',
    url: 'https://global-shop-iota.vercel.app/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
