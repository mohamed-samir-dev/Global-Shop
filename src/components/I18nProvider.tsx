"use client";
import { useEffect } from "react";
import "@/i18n/config";
interface I18nProviderProps {
  children: React.ReactNode;
}
export const I18nProvider = ({ children }: I18nProviderProps) => {
  useEffect(() => {}, []);
  return <>{children}</>;
};
