'use client';

import { useTheme } from '@/context/ThemeContext';

export default function Contact() {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen py-12 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0F1419]' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Contact Us</h1>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Get in touch with our team. We're here to help!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className={`rounded-lg shadow-md p-8 transition-colors duration-300 ${
            isDarkMode ? 'bg-[#26292E]' : 'bg-white'
          }`}>
            <h2 className={`text-2xl font-semibold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Send us a message</h2>
            <form className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Name</label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                    isDarkMode 
                      ? 'bg-[#373C40] text-white placeholder-gray-400 border-gray-600 focus:ring-blue-500' 
                      : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300 focus:ring-gray-500'
                  }`}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Email</label>
                <input
                  type="email"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                    isDarkMode 
                      ? 'bg-[#373C40] text-white placeholder-gray-400 border-gray-600 focus:ring-blue-500' 
                      : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300 focus:ring-gray-500'
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Message</label>
                <textarea
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                    isDarkMode 
                      ? 'bg-[#373C40] text-white placeholder-gray-400 border-gray-600 focus:ring-blue-500' 
                      : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300 focus:ring-gray-500'
                  }`}
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-md transition-colors ${
                  isDarkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div className={`rounded-lg shadow-md p-8 transition-colors duration-300 ${
            isDarkMode ? 'bg-[#26292E]' : 'bg-white'
          }`}>
            <h2 className={`text-2xl font-semibold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Get in touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Email</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>support@shophere.com</p>
              </div>
              <div>
                <h3 className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Phone</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Address</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>123 Commerce Street<br />Business District<br />City, State 12345</p>
              </div>
              <div>
                <h3 className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Business Hours</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}