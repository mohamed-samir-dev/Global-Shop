import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authAPI } from "@/lib/api";
import toast from "react-hot-toast";
import { RegisterFormData, registerSchema } from "../types";
import { useTranslation } from "@/i18n/hooks/useTranslation";
import { BackendAuthResponse } from "@/types";

export const useRegister = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      dateOfBirth: "",
      agreeToTerms: false,
    },
  });

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      const payload = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
      };

      console.log("Sending registration data:", payload);

      const response = await authAPI.register(payload);
      // Backend returns flat structure: { _id, name, email, phone, dateOfBirth, role, token }
      const backendResponse = response.data as unknown as BackendAuthResponse;
      const { token, role, ...userData } = backendResponse;
      const user = {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        isAdmin: role === "admin",
      };
      login(token, user);
      toast.success(String(t("auth.messages.registrationSuccess")));
      router.push("/");
    } catch (error: unknown) {
      console.error("Registration error:", error);

      // Type guard to check if error has response property
      const axiosError = error as {
        response?: {
          data?: {
            errors?: string[];
            missing?: Record<string, boolean>;
            message?: string;
          };
        };
      };
      console.error("Error response:", axiosError.response?.data);

      if (axiosError.response?.data?.errors) {
        const errorMessages = axiosError.response.data.errors.join(", ");
        toast.error(`Validation failed: ${errorMessages}`);
      } else if (axiosError.response?.data?.missing) {
        const missingFields = Object.entries(axiosError.response.data.missing)
          .filter(([, isMissing]) => isMissing)
          .map(([field]) => field)
          .join(", ");
        toast.error(`Missing required fields: ${missingFields}`);
      } else {
        toast.error(
          axiosError.response?.data?.message || "Registration failed"
        );
      }
    }
  };

  return {
    form,
    handleSubmit,
    isLoading: form.formState.isSubmitting,
  };
};
