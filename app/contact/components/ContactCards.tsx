interface ContactCardsProps {
  isDarkMode: boolean;
}

export default function ContactCards({ isDarkMode }: ContactCardsProps) {
  const cards = [
    { icon: '📧', title: 'Email', info: 'support@shophere.com' },
    { icon: '📞', title: 'Phone', info: '+1 (555) 123-4567' },
    { icon: '📍', title: 'Location', info: 'Cairo' },
    { icon: '⏰', title: 'Hours', info: 'Mon-Fri 9AM-6PM' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
      <div className="grid md:grid-cols-4 gap-6 mb-20">
        {cards.map((card) => (
          <div key={card.title} className={`p-8 rounded-2xl text-center ${isDarkMode ? 'bg-linear-to-br from-[#1a1f26] to-[#26292E] border border-[#3a3f47]' : 'bg-white shadow-xl'} hover:scale-105 transition-all duration-300`}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#B39E7A]/10 flex items-center justify-center">
              <span className="text-3xl">{card.icon}</span>
            </div>
            <h3 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{card.title}</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{card.info}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
