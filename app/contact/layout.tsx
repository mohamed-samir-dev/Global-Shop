import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch',
  description: 'Have questions? Contact Global Shop customer support. We\'re here to help with your orders, products, and any inquiries. Fast response guaranteed.',
  openGraph: {
    title: 'Contact Global Shop',
    description: 'Get in touch with our customer support team. We\'re here to help!',
    url: 'https://global-shop-iota.vercel.app/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
