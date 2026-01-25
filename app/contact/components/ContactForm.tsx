interface ContactFormProps {
  isDarkMode: boolean;
  formData: { name: string; email: string; subject: string; message: string };
  setFormData: (data: { name: string; email: string; subject: string; message: string }) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  t: (key: string) => string;
}

export default function ContactForm({ isDarkMode, formData, setFormData, handleSubmit, isSubmitting, t }: ContactFormProps) {
  return (
    <div className={`p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl ${isDarkMode ? 'bg-linear-to-br from-[#1a1f26] to-[#26292E] border border-[#3a3f47]' : 'bg-white shadow-2xl'}`}>
      <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {t('contact.form.title')}
      </h2>
      <p className={`text-sm sm:text-base mb-6 sm:mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {t('contact.form.subtitle')}
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className={`block mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('contact.form.fullName')}
            </label>
            <input
              type="text"
              placeholder={t('contact.form.fullNamePlaceholder')}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={`w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-xl ${isDarkMode ? 'bg-[#0F1419] text-white border-[#3a3f47]' : 'bg-gray-50 text-gray-900 border-gray-200'} border-2 focus:outline-none focus:border-[#B39E7A] transition-colors`}
              required
            />
          </div>
          <div>
            <label className={`block mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('contact.form.email')}
            </label>
            <input
              type="email"
              placeholder={t('contact.form.emailPlaceholder')}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-xl ${isDarkMode ? 'bg-[#0F1419] text-white border-[#3a3f47]' : 'bg-gray-50 text-gray-900 border-gray-200'} border-2 focus:outline-none focus:border-[#B39E7A] transition-colors`}
              required
            />
          </div>
        </div>
        
        <div>
          <label className={`block mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('contact.form.subject')}
          </label>
          <input
            type="text"
            placeholder={t('contact.form.subjectPlaceholder')}
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
            className={`w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-xl ${isDarkMode ? 'bg-[#0F1419] text-white border-[#3a3f47]' : 'bg-gray-50 text-gray-900 border-gray-200'} border-2 focus:outline-none focus:border-[#B39E7A] transition-colors`}
            required
          />
        </div>
        
        <div>
          <label className={`block mb-1.5 sm:mb-2 text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('contact.form.message')}
          </label>
          <textarea
            placeholder={t('contact.form.messagePlaceholder')}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows={6}
            className={`w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-xl ${isDarkMode ? 'bg-[#0F1419] text-white border-[#3a3f47]' : 'bg-gray-50 text-gray-900 border-gray-200'} border-2 focus:outline-none focus:border-[#B39E7A] transition-colors resize-none`}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-linear-to-r from-[#B39E7A] to-[#9d8a68] hover:from-[#9d8a68] hover:to-[#8a7759] text-white text-sm sm:text-base font-bold py-4 sm:py-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('contact.form.sending') : t('contact.form.sendButton')}
        </button>
      </form>
    </div>
  );
}
