"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, A11y } from "swiper/modules";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/i18n/hooks/useTranslation";
import { Testimonial } from "../types/types";
import { TestimonialCard } from "../ui/TestimonialCard";
import { NavigationButtons } from "../ui/NavigationButtons";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export const TestimonialsCarousel = ({ testimonials }: TestimonialsCarouselProps) => {
  const { isDarkMode } = useTheme();
  const { isArabic, language } = useTranslation();

  return (
    <>
      <Swiper
        key={`testimonials-${language}`}
        modules={[Navigation, Pagination, Keyboard, A11y]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          clickable: true,
          bulletClass: `swiper-pagination-bullet ${
            isDarkMode ? "swiper-bullet-dark" : "swiper-bullet-light"
          }`,
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="testimonials-swiper"
        dir={isArabic ? "rtl" : "ltr"}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial._id}>
            <TestimonialCard testimonial={testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
      <NavigationButtons />
    </>
  );
};