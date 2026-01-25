'use client';

import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { useState } from 'react';
import { contactService } from '@/services/contactService';
import ContactHero from './components/ContactHero';
import ContactCards from './components/ContactCards';
import ContactForm from './components/ContactForm';
import ContactSidebar from './components/ContactSidebar';
import SuccessModal from './components/SuccessModal';

export default function Contact() {
  const { isDarkMode } = useTheme();
  const { t, isArabic } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await contactService.sendMessage(formData);
      setShowModal(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0F1419]' : 'bg-gray-50'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <ContactHero isDarkMode={isDarkMode} t={t} />
      <ContactCards isDarkMode={isDarkMode} t={t} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 pb-12 sm:pb-16 lg:pb-20">
          <div className="lg:col-span-3">
            <ContactForm 
              isDarkMode={isDarkMode}
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              t={t}
            />
          </div>
          <ContactSidebar isDarkMode={isDarkMode} t={t} />
        </div>
      </div>

      {showModal && <SuccessModal isDarkMode={isDarkMode} onClose={() => setShowModal(false)} t={t} />}
    </div>
  );
}
