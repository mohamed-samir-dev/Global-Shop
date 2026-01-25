interface ContactCardsProps {
  isDarkMode: boolean;
  t: (key: string) => string;
}

export default function ContactCards({ isDarkMode, t }: ContactCardsProps) {
  const cards = [
    { icon: '📧', title: t('contact.cards.email'), info: t('contact.cards.emailInfo') },
    { icon: '📞', title: t('contact.cards.phone'), info: t('contact.cards.phoneInfo') },
    { icon: '📍', title: t('contact.cards.location'), info: t('contact.cards.locationInfo') },
    { icon: '⏰', title: t('contact.cards.hours'), info: t('contact.cards.hoursInfo') }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-12 lg:-mt-16 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
        {cards.map((card) => (
          <div key={card.title} className={`p-6 sm:p-8 rounded-2xl text-center ${isDarkMode ? 'bg-linear-to-br from-[#1a1f26] to-[#26292E] border border-[#3a3f47]' : 'bg-white shadow-xl'} hover:scale-105 transition-all duration-300`}>
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-[#B39E7A]/10 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl">{card.icon}</span>
            </div>
            <h3 className={`text-sm sm:text-base font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{card.title}</h3>
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{card.info}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
