import { LucideIcon } from "lucide-react";

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

export interface QuickLink {
  href: string;
  label: string;
}

export interface CustomerService {
  href: string;
  label: string;
  icon?: LucideIcon;
}