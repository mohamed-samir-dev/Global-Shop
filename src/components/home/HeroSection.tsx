'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n';

interface HeroSlide {
  titleKey: string;
  descriptionKey: string;
  image: string;
  buttonTextKey: string;
  buttonLink: string;
}

interface HeroSectionProps {
  slides: HeroSlide[];
}

export default function HeroSection({ slides }: HeroSectionProps) {
  const { isDarkMode } = useTheme();
  const { t, isArabic } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1);
    }
    if (isRightSwipe) {
      setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [slides.length]);

  return (
    <div 
      className={`relative overflow-hidden ${
        isDarkMode ? 'bg-[#191C21]' : 'bg-[#F1F1F0]'
      }`} 
      dir={isArabic ? 'rtl' : 'ltr'}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Mobile/Tablet Background Image */}
      <div className="lg:hidden absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].image}
              alt={String(t(slides[currentSlide].titleKey))}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-[500px] sm:min-h-[600px] lg:min-h-0">
          {/* Left Content */}
          <div className={`w-full lg:w-1/2 mb-8 lg:mb-0 flex flex-col justify-center items-center lg:items-start text-center lg:text-left ${
            isArabic ? 'lg:pr-14' : 'lg:pl-14'
          }`}>
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${
                  isDarkMode ? 'text-white' : 'lg:text-[#030303] text-white'
                } ${isArabic ? 'lg:text-right' : 'lg:text-left'}`}
              >
                {String(t(slides[currentSlide].titleKey))}
              </motion.h2>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`text-base sm:text-lg mb-6 sm:mb-8 px-4 lg:px-0 ${
                  isDarkMode ? 'text-gray-300' : 'lg:text-[#4E504C] text-gray-100'
                } ${isArabic ? 'lg:text-right' : 'lg:text-left'}`}
              >
                {String(t(slides[currentSlide].descriptionKey))}
              </motion.p>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={isArabic ? 'lg:text-right' : 'lg:text-left'}
              >
                <Link
                  href={slides[currentSlide].buttonLink}
                  className="inline-block bg-[#447EAE] text-white px-8 sm:px-12 py-3 rounded-full transition-colors font-semibold hover:bg-[#3a6b94] text-sm sm:text-base"
                >
                  {String(t(slides[currentSlide].buttonTextKey))}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Right Content - Hero Image (Desktop Only) */}
          <div className="hidden lg:flex lg:w-1/2 justify-center lg:justify-end">
            <div className="relative w-150 h-96 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slides[currentSlide].image}
                    alt={String(t(slides[currentSlide].titleKey))}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full ${
              index === currentSlide 
                ? 'bg-[#447EAE]' 
                : 'bg-white/60'
            }`}
            animate={{
              width: index === currentSlide ? 32 : 8,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}