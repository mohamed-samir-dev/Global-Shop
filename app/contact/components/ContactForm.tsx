interface ContactFormProps {
  isDarkMode: boolean;
  formData: { name: string; email: string; subject: string; message: string };
  setFormData: (data: { name: string; email: string; subject: string; message: string }) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export default function ContactForm({ isDarkMode, formData, setFormData, handleSubmit, isSubmitting }: ContactFormProps) {
  return (
    <div className={`p-10 rounded-3xl ${isDarkMode ? 'bg-linear-to-br from-[#1a1f26] to-[#26292E] border border-[#3a3f47]' : 'bg-white shadow-2xl'}`}>
      <h2 className={`text-4xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Send us a Message
      </h2>
      <p className={`mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Fill out the form below and we&rsquo;ll get back to you shortly
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={`block mb-2 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={`w-full px-5 py-4 rounded-xl ${isDarkMode ? 'bg-[#0F1419] text-white border-[#3a3f47]' : 'bg-gray-50 text-gray-900 border-gray-200'} border-2 focus:outline-none focus:border-[#B39E7A] transition-colors`}
              required
            />
          </div>
          <div>
            <label className={`block mb-2 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full px-5 py-4 rounded-xl ${isDarkMode ? 'bg-[#0F1419] text-white border-[#3a3f47]' : 'bg-gray-50 text-gray-900 border-gray-200'} border-2 focus:outline-none focus:border-[#B39E7A] transition-colors`}
              required
            />
          </div>
        </div>
        
        <div>
          <label className={`block mb-2 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Subject
          </label>
          <input
            type="text"
            placeholder="How can we help you?"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
            className={`w-full px-5 py-4 rounded-xl ${isDarkMode ? 'bg-[#0F1419] text-white border-[#3a3f47]' : 'bg-gray-50 text-gray-900 border-gray-200'} border-2 focus:outline-none focus:border-[#B39E7A] transition-colors`}
            required
          />
        </div>
        
        <div>
          <label className={`block mb-2 text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Message
          </label>
          <textarea
            placeholder="Tell us more about your inquiry..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows={6}
            className={`w-full px-5 py-4 rounded-xl ${isDarkMode ? 'bg-[#0F1419] text-white border-[#3a3f47]' : 'bg-gray-50 text-gray-900 border-gray-200'} border-2 focus:outline-none focus:border-[#B39E7A] transition-colors resize-none`}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-linear-to-r from-[#B39E7A] to-[#9d8a68] hover:from-[#9d8a68] hover:to-[#8a7759] text-white font-bold py-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message →'}
        </button>
      </form>
    </div>
  );
}
