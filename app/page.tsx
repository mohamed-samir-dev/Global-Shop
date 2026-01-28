import { HomePage } from '@/components/home';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Home - Shop Premium Products',
  description: 'Welcome to Global Shop. Discover our curated collection of premium products including fashion, electronics, home decor, and more. Free shipping on orders over $100.',
  openGraph: {
    title: 'Global Shop - Shop Premium Products Online',
    description: 'Discover our curated collection of premium products with free shipping on orders over $100.',
    url: 'https://global-shop-iota.vercel.app',
    images: [{ url: 'https://global-shop-iota.vercel.app/images/android-chrome-512x512.png', width: 1200, height: 630, alt: 'Global Shop Home' }],
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Global Shop',
    url: 'https://global-shop-iota.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://global-shop-iota.vercel.app/products?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Global Shop',
    url: 'https://global-shop-iota.vercel.app',
    logo: 'https://global-shop-iota.vercel.app/images/android-chrome-512x512.png',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: 'https://global-shop-iota.vercel.app/contact',
    },
   
  };

  return (
    <>
      <Script
        id="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomePage />
    </>
  );
}