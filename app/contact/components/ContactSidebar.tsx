interface ContactSidebarProps {
  isDarkMode: boolean;
  t: (key: string) => string;
}

export default function ContactSidebar({ isDarkMode, t }: ContactSidebarProps) {
  const benefits = [
    { title: t('contact.sidebar.quickResponse'), description: t('contact.sidebar.quickResponseDesc') },
    { title: t('contact.sidebar.expertSupport'), description: t('contact.sidebar.expertSupportDesc') },
    { title: t('contact.sidebar.personalizedCare'), description: t('contact.sidebar.personalizedCareDesc') }
  ];

  const hours = [
    { day: t('contact.sidebar.monday'), time: t('contact.sidebar.mondayTime'), active: true },
    { day: t('contact.sidebar.saturday'), time: t('contact.sidebar.saturdayTime'), active: true },
    { day: t('contact.sidebar.sunday'), time: t('contact.sidebar.sundayTime'), active: false }
  ];

  return (
    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
      <div className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl ${isDarkMode ? 'bg-linear-to-br from-[#1a1f26] to-[#26292E] border border-[#3a3f47]' : 'bg-white shadow-xl'}`}>
        <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('contact.sidebar.whyReachOut')}
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex items-start gap-2.5 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#B39E7A]/10 flex items-center justify-center shrink-0 mt-1">
                <span className="text-sm sm:text-base text-[#B39E7A]">✓</span>
              </div>
              <div>
                <h4 className={`text-sm sm:text-base font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{benefit.title}</h4>
                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl ${isDarkMode ? 'bg-linear-to-br from-[#B39E7A]/10 to-[#B39E7A]/5 border border-[#B39E7A]/20' : 'bg-linear-to-br from-[#B39E7A]/10 to-[#B39E7A]/5 border border-[#B39E7A]/20'}`}>
        <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('contact.sidebar.businessHours')}
        </h3>
        <div className="space-y-2">
          {hours.map((hour) => (
            <div key={hour.day} className="flex justify-between text-sm sm:text-base">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{hour.day}</span>
              <span className={`font-semibold ${hour.active ? (isDarkMode ? 'text-[#B39E7A]' : 'text-[#8B7355]') : (isDarkMode ? 'text-gray-400' : 'text-gray-500')}`}>
                {hour.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
