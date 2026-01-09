'use client';

import { useTheme } from '@/context/ThemeContext';

export default function About() {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen py-12 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0F1419]' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-8 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>About SHOPHERE</h1>
          <p className={`text-lg mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Your trusted destination for quality products and exceptional shopping experience.
          </p>
        </div>
        
        <div className={`rounded-lg shadow-md p-8 transition-colors duration-300 ${
          isDarkMode ? 'bg-[#26292E]' : 'bg-white'
        }`}>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className={`text-2xl font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Our Story</h2>
              <p className={`mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Founded with a passion for bringing you the best products at competitive prices, 
                SHOPHERE has been serving customers worldwide with dedication and excellence.
              </p>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                We believe in quality, authenticity, and customer satisfaction above all else.
              </p>
            </div>
            
            <div>
              <h2 className={`text-2xl font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Our Mission</h2>
              <p className={`mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                To provide an exceptional online shopping experience with carefully curated 
                products, competitive pricing, and outstanding customer service.
              </p>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                We strive to make shopping convenient, secure, and enjoyable for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}