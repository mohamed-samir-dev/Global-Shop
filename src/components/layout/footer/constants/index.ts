import { 
  FacebookIcon, 
  TwitterIcon, 
  InstagramIcon, 
  LinkedinIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon
} from "lucide-react";
import { SocialLink, CustomerService } from "../types";

export const socialLinks: SocialLink[] = [
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" }
];

export const customerServices: CustomerService[] = [
  { href: "/contact", label: "footer.customerService.contact", icon: PhoneIcon },
  { href: "/support", label: "footer.customerService.support", icon: MailIcon },
  { href: "/shipping", label: "footer.customerService.shipping", icon: MapPinIcon },
  { href: "/returns", label: "footer.customerService.returns" }
];

export const quickLinksData = [
  { href: "/shop/mens", label: "footer.quickLinks.mens" },
  { href: "/shop/womens", label: "footer.quickLinks.womens" },
  { href: "/shop/childrens", label: "footer.quickLinks.childrens" },
  { href: "/shop", label: "footer.quickLinks.shop" }
];