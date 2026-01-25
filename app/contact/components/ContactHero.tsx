interface ContactHeroProps {
  isDarkMode: boolean;
  t: (key: string) => string;
}

export default function ContactHero({ isDarkMode, t }: ContactHeroProps) {
  return (
    <div className={`relative py-16 sm:py-24 lg:py-32 overflow-hidden ${isDarkMode ? 'bg-linear-to-br from-[#1a1f26] via-[#0F1419] to-[#1a1f26]' : 'bg-linear-to-br from-white via-gray-50 to-white'}`}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-[#B39E7A] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-[#B39E7A] rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-block mb-3 sm:mb-4 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#B39E7A]/10 border border-[#B39E7A]/20">
          <span className="text-[#B39E7A] text-sm sm:text-base font-semibold">{t('contact.hero.badge')}</span>
        </div>
        <h1 className={`text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('contact.hero.title')} <span className="text-[#B39E7A]">{t('contact.hero.highlight')}</span>
        </h1>
        <p className={`text-base sm:text-lg lg:text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {t('contact.hero.subtitle')}
        </p>
      </div>
    </div>
  );
}
