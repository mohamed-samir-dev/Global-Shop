import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authAPI, wishlistAPI } from "@/src/lib/api";
import { User } from "@/types";

export const useProfile = () => {
  const { token, logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ orders: 0, wishlist: 0 });
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await authAPI.getUserProfile();
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        if (error && typeof error === 'object' && 'response' in error && (error as { response?: { status?: number } }).response?.status === 401) {
          logout();
          router.push("/login");
        } else {
          setError("Failed to load profile. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchStats = async () => {
      try {
        const wishlistRes = await wishlistAPI.getWishlist();
        setStats({ orders: 0, wishlist: wishlistRes.data?.items?.length || 0 });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchUserProfile();
    fetchStats();
  }, [token, router, logout]);

  return { user, loading, error, stats, setUser, setError };
};
