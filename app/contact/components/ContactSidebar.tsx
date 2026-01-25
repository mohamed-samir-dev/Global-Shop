interface ContactSidebarProps {
  isDarkMode: boolean;
}

export default function ContactSidebar({ isDarkMode }: ContactSidebarProps) {
  const benefits = [
    { title: 'Quick Response', description: 'Get answers within 24 hours' },
    { title: 'Expert Support', description: 'Dedicated team ready to help' },
    { title: 'Personalized Care', description: 'Tailored solutions for you' }
  ];

  const hours = [
    { day: 'Monday - Friday', time: '9AM - 6PM', active: true },
    { day: 'Saturday', time: '10AM - 4PM', active: true },
    { day: 'Sunday', time: 'Closed', active: false }
  ];

  return (
    <div className="lg:col-span-2 space-y-6">
      <div className={`p-8 rounded-3xl ${isDarkMode ? 'bg-linear-to-br from-[#1a1f26] to-[#26292E] border border-[#3a3f47]' : 'bg-white shadow-xl'}`}>
        <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Why Reach Out?
        </h3>
        <div className="space-y-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#B39E7A]/10 flex items-center justify-center shrink-0 mt-1">
                <span className="text-[#B39E7A]">✓</span>
              </div>
              <div>
                <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{benefit.title}</h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`p-8 rounded-3xl ${isDarkMode ? 'bg-linear-to-br from-[#B39E7A]/10 to-[#B39E7A]/5 border border-[#B39E7A]/20' : 'bg-linear-to-br from-[#B39E7A]/10 to-[#B39E7A]/5 border border-[#B39E7A]/20'}`}>
        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Business Hours
        </h3>
        <div className="space-y-2">
          {hours.map((hour) => (
            <div key={hour.day} className="flex justify-between">
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
