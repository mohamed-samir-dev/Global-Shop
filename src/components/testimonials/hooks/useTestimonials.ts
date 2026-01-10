import { useState, useEffect } from "react";
import { testimonialAPI } from "@/lib/api";
import { Testimonial } from "../types/types";

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialAPI.getTestimonials();
      setTestimonials(response.data);
    } catch (error: unknown) {
      console.error("Failed to fetch testimonials:", error);
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number; data: unknown } };
        console.error("Response status:", axiosError.response.status);
        console.error("Response data:", axiosError.response.data);
      } else if (error && typeof error === 'object' && 'request' in error) {
        console.error("No response received. Is the backend server running?");
      } else if (error && typeof error === 'object' && 'message' in error) {
        console.error("Error setting up request:", (error as Error).message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return {
    testimonials,
    loading,
    refetch: fetchTestimonials
  };
};