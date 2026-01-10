"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import TestimonialForm from "../forms/TestimonialForm";
import { useTestimonials } from "../hooks/useTestimonials";
import { LoadingState } from "../states/LoadingState";
import { SectionHeader } from "./SectionHeader";
import { EmptyState } from "../states/EmptyState";
import { TestimonialsCarousel } from "./TestimonialsCarousel";
import { SubscriptionSection } from "./SubscriptionSection";

export default function TestimonialsSection() {
  const { isDarkMode } = useTheme();
  const { testimonials, loading, refetch } = useTestimonials();
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <section
        className={`py-12 ${isDarkMode ? "bg-[#191C21]" : "bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader onAddReview={() => setIsFormOpen(true)} />

          {testimonials.length === 0 ? (
            <EmptyState />
          ) : (
            <TestimonialsCarousel testimonials={testimonials} />
          )}
        </div>

        <TestimonialForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSuccess={refetch}
        />
      </section>

      <SubscriptionSection />
    </>
  );
}
