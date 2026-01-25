interface ContactHeroProps {
  isDarkMode: boolean;
}

export default function ContactHero({ isDarkMode }: ContactHeroProps) {
  return (
    <div className={`relative py-32 overflow-hidden ${isDarkMode ? 'bg-linear-to-br from-[#1a1f26] via-[#0F1419] to-[#1a1f26]' : 'bg-linear-to-br from-white via-gray-50 to-white'}`}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#B39E7A] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#B39E7A] rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="inline-block mb-4 px-6 py-2 rounded-full bg-[#B39E7A]/10 border border-[#B39E7A]/20">
          <span className="text-[#B39E7A] font-semibold">Contact Us</span>
        </div>
        <h1 className={`text-7xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Let&rsquo;s Start a <span className="text-[#B39E7A]">Conversation</span>
        </h1>
        <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Have questions? We&rsquo;re here to help. Reach out and we&rsquo;ll get back to you within 24 hours.
        </p>
      </div>
    </div>
  );
}
