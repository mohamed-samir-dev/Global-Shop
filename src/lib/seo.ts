import { Metadata } from 'next';

const baseUrl = 'https://global-shop-iota.vercel.app';

export const seoConfig = {
  siteName: 'Global Shop',
  baseUrl,
  defaultTitle: 'Global Shop - Premium E-Commerce Store',
  defaultDescription: 'Discover premium quality products at Global Shop. Shop the latest trends with fast shipping and secure checkout.',
  defaultImage: '/images/hero--1.webp',
  twitterHandle: '@globalshop',
};

export function generateMetadata({
  title,
  description,
  image = seoConfig.defaultImage,
  url,
  noIndex = false,
}: {
  title: string;
  description: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
}): Metadata {
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: seoConfig.siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function generateProductJsonLd(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  brand?: string;
  sku?: string;
  availability?: string;
  rating?: number;
  reviewCount?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Global Shop',
    },
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/products/${product.sku}`,
      priceCurrency: product.currency || 'USD',
      price: product.price,
      availability: product.availability || 'https://schema.org/InStock',
    },
    aggregateRating: product.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviewCount || 0,
        }
      : undefined,
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}
