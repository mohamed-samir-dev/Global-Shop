import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authAPI } from "@/lib/api";
import toast from "react-hot-toast";
import { LoginFormData } from "../types";
import { useTranslation } from "@/i18n/hooks/useTranslation";
import { BackendAuthResponse } from "@/types";

export const useLogin = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await authAPI.login(data);
      // Backend returns flat structure: { _id, name, email, role, token }
      const backendResponse = response.data as unknown as BackendAuthResponse;
      const { token, role, ...userData } = backendResponse;
      const user = {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        isAdmin: role === "admin",
      };
      login(token, user);
      toast.success(String(t("auth.messages.loginSuccess")));
      router.push("/");
    } catch (error: unknown) {
      const errorMessage =
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
          ? String(error.response.data.message)
          : String(t("auth.messages.invalidCredentials"));
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return {
    formData,
    isLoading,
    showPassword,
    rememberMe,
    error,
    setShowPassword,
    setRememberMe,
    handleSubmit,
    handleChange,
  };
};
