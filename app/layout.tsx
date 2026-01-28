import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { I18nProvider } from "@/components/I18nProvider";
import ReduxProvider from "@/components/ReduxProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/layout";
import { Toaster } from "react-hot-toast";
import NextAuthProvider from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://global-shop-iota.vercel.app'),
  title: {
    default: 'Global Shop - Premium E-Commerce Store',
    template: '%s | Global Shop'
  },
  description: 'Discover premium quality products at Global Shop. Shop the latest trends in fashion, electronics, home decor, and more with fast shipping and secure checkout.',
  keywords: ['e-commerce', 'online shopping', 'premium products', 'fashion', 'electronics', 'home decor', 'global shop'],
  authors: [{ name: 'Mohammed-Samier' }],
  creator: 'Mohammed-Samier',
  publisher: 'Global Shop',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://global-shop-iota.vercel.app',
    title: 'Global Shop - Premium E-Commerce Store',
    description: 'Discover premium quality products at Global Shop. Shop the latest trends with fast shipping and secure checkout.',
    siteName: 'Global Shop',
    images: [{
      url: 'https://global-shop-iota.vercel.app/images/android-chrome-512x512.png',
      width: 1200,
      height: 630,
      alt: 'Global Shop',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Shop - Premium E-Commerce Store',
    description: 'Discover premium quality products at Global Shop. Shop the latest trends with fast shipping and secure checkout.',
    images: ['https://global-shop-iota.vercel.app/images/android-chrome-512x512.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/images/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/images/android-chrome-512x512.png' },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://global-shop-iota.vercel.app" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ReduxProvider>
          <NextAuthProvider>
            <I18nProvider>
              <ThemeProvider>
                <AuthProvider>
                  <Navbar />
                  <main className="min-h-screen">
                    {children}
                  </main>
                  <Footer />
                  <Toaster 
                    position="top-right" 
                    toastOptions={{
                      className: 'text-sm sm:text-base',
                      style: {
                        padding: '12px 16px',
                        fontSize: '14px',
                      },
                      success: {
                        style: {
                          background: '#10B981',
                          color: 'white',
                        },
                      },
                      error: {
                        style: {
                          background: '#EF4444',
                          color: 'white',
                        },
                      },
                    }}
                  />
                </AuthProvider>
              </ThemeProvider>
            </I18nProvider>
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
