"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession, signOut } from "next-auth/react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sync NextAuth session with AuthContext
  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
      return;
    }

    if (session?.user) {
      // User logged in via Google OAuth - fetch from backend
      const syncGoogleUser = async () => {
        if (session.user.token) {
          try {
            // User has backend token, create user object
            const googleUser: User = {
              _id: session.user.email || "",
              name: session.user.name || "User",
              email: session.user.email || "",
              isAdmin: session.user.isAdmin || false,
            };
            setUser(googleUser);
            setToken(session.user.token);
            
            localStorage.setItem("token", session.user.token);
            localStorage.setItem("user", JSON.stringify(googleUser));
          } catch (error) {
            console.error("Error syncing Google user:", error);
          }
        }
        setIsLoading(false);
      };
      syncGoogleUser();
    } else {
      loadAuthState();
    }
  }, [session, status]);

  const loadAuthState = () => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser && storedUser !== "undefined") {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && "role" in parsedUser && !("isAdmin" in parsedUser)) {
          parsedUser.isAdmin = parsedUser.role === "admin";
          delete parsedUser.role;
          localStorage.setItem("user", JSON.stringify(parsedUser));
        }
        setToken(storedToken);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error loading auth state:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  };

  const login = (newToken: string, newUser: User) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(newUser));
    }
    setToken(newToken);
    setUser(newUser);
  };

  const logout = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    setToken(null);
    setUser(null);
    
    // Sign out from NextAuth if session exists
    if (session) {
      await signOut({ redirect: false });
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
