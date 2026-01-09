export interface PromoItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  buttonTextKey: string;
  imageUrl: string;
  imageAlt: string;
  href?: string;
}

export interface PromoBannerProps {
  items?: PromoItem[];
  className?: string;
}