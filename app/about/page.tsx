'use client';

import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n/hooks/useTranslation';

export default function About() {
  const { isDarkMode } = useTheme();
  const { t, isArabic } = useTranslation();
  
  const timeline = [
    { year: '2020', title: t('about.timeline.founded'), desc: t('about.timeline.foundedDesc') },
    { year: '2021', title: t('about.timeline.customers'), desc: t('about.timeline.customersDesc') },
    { year: '2022', title: t('about.timeline.expansion'), desc: t('about.timeline.expansionDesc') },
    { year: '2023', title: t('about.timeline.products'), desc: t('about.timeline.productsDesc') },
    { year: '2024', title: t('about.timeline.leader'), desc: t('about.timeline.leaderDesc') }
  ];
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0F1419]' : 'bg-gray-50'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* Hero */}
      <div className={`py-20 ${isDarkMode ? 'bg-linear-to-b from-[#1a1f26] to-[#0F1419]' : 'bg-linear-to-b from-white to-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className={`text-6xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('about.hero.title')} <span className="text-[#B39E7A]">{t('about.hero.brand')}</span>
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('about.hero.subtitle')}
          </p>
        </div>
      </div>

   
      {/* Timeline */}
      <div className={`py-20 ${isDarkMode ? 'bg-[#1a1f26]' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className={`text-4xl font-bold text-center mb-16 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('about.timeline.title')}
          </h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${isDarkMode ? 'bg-[#B39E7A]' : 'bg-[#C1B092]'} hidden md:block`}></div>
            
            {timeline.map((item, idx) => (
              <div key={idx} className={`relative mb-12 md:mb-16 ${idx % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'}`}>
                <div className={`md:flex ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}>
                  {/* Content */}
                  <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-[#26292E]' : 'bg-gray-50'} hover:scale-105 transition-transform`}>
                      <div className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-[#B39E7A]' : 'text-[#8B7355]'}`}>
                        {item.year}
                      </div>
                      <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.title}
                      </h3>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  
                  {/* Center Dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                    <div className={`w-6 h-6 rounded-full border-4 ${isDarkMode ? 'bg-[#B39E7A] border-[#0F1419]' : 'bg-[#8B7355] border-white'}`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className={`text-4xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t('about.features.title')}
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className={`p-6 rounded-xl text-center ${isDarkMode ? 'bg-[#26292E]' : 'bg-white shadow-md'} hover:scale-105 transition-transform`}>
            <div className="text-5xl mb-4">✨</div>
            <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('about.features.quality')}</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('about.features.qualityDesc')}</p>
          </div>
          
          <div className={`p-6 rounded-xl text-center ${isDarkMode ? 'bg-[#26292E]' : 'bg-white shadow-md'} hover:scale-105 transition-transform`}>
            <div className="text-5xl mb-4">🚀</div>
            <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('about.features.shipping')}</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('about.features.shippingDesc')}</p>
          </div>
          
          <div className={`p-6 rounded-xl text-center ${isDarkMode ? 'bg-[#26292E]' : 'bg-white shadow-md'} hover:scale-105 transition-transform`}>
            <div className="text-5xl mb-4">💎</div>
            <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('about.features.prices')}</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('about.features.pricesDesc')}</p>
          </div>
          
          <div className={`p-6 rounded-xl text-center ${isDarkMode ? 'bg-[#26292E]' : 'bg-white shadow-md'} hover:scale-105 transition-transform`}>
            <div className="text-5xl mb-4">🔒</div>
            <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t('about.features.secure')}</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('about.features.secureDesc')}</p>
          </div>
        </div>
      </div>

     
    </div>
  );
}
