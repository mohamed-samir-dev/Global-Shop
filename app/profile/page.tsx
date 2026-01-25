"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { authAPI } from "@/lib/api";
import { User } from "@/types";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user: authUser, token, logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  return null;
}
