import { PromoItem } from '../types';

export const defaultPromoItems: PromoItem[] = [
  {
    id: 'flash-sale',
    titleKey: 'home.promoBanner.flashSale',
    descriptionKey: 'home.promoBanner.flashSaleDesc',
    buttonTextKey: 'home.promoBanner.shopNow',
    imageUrl: '/images/card1.webp',
    imageAlt: 'Flash Sale',
    href: '/flash-sale'
  },
  {
    id: 'free-shipping',
    titleKey: 'home.promoBanner.freeShipping',
    descriptionKey: 'home.promoBanner.freeShippingDesc',
    buttonTextKey: 'home.promoBanner.shopNow',
    imageUrl: '/images/card2.webp',
    imageAlt: 'Free Shipping',
    href: '/free-shipping'
  },
  {
    id: 'special-offer',
    titleKey: 'home.promoBanner.specialOffer',
    descriptionKey: 'home.promoBanner.specialOfferDesc',
    buttonTextKey: 'home.promoBanner.shopNow',
    imageUrl: '/images/card3.webp',
    imageAlt: 'Special Offer',
    href: '/special-offers'
  }
];