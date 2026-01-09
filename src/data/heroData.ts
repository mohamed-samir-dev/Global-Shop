export interface HeroSlide {
  titleKey: string;
  descriptionKey: string;
  image: string;
  buttonTextKey: string;
  buttonLink: string;
}

export const heroSlides = [
  {
    titleKey: 'home.hero.newSeasonArrivals',
    descriptionKey: 'home.hero.newSeasonDescription',
    image: "/images/hero--1.webp",
    buttonTextKey: 'home.hero.shopNow',
    buttonLink: "/products"
  },
  {
    titleKey: 'home.hero.premiumCollection',
    descriptionKey: 'home.hero.premiumDescription',
    image: "/images/hero--2.webp",
    buttonTextKey: 'home.hero.explore',
    buttonLink: "/products"
  },
  {
    titleKey: 'home.hero.summerSale',
    descriptionKey: 'home.hero.summerSaleDescription',
    image: "/images/hero--4.webp",
    buttonTextKey: 'home.hero.saveNow',
    buttonLink: "/sale"
  },
  {
    titleKey: 'home.hero.exclusiveDeals',
    descriptionKey: 'home.hero.exclusiveDealsDescription',
    image: "/images/hero--5.webp",
    buttonTextKey: 'home.hero.discover',
    buttonLink: "/deals"
  },
  {
    titleKey: 'home.hero.trendingNow',
    descriptionKey: 'home.hero.trendingDescription',
    image: "/images/hero--3.webp",
    buttonTextKey: 'home.hero.viewTrends',
    buttonLink: "/trending"
  }
];