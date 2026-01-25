interface SuccessModalProps {
  isDarkMode: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isDarkMode, onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`relative max-w-md w-full p-8 rounded-3xl ${isDarkMode ? 'bg-gradient-to-br from-[#1a1f26] to-[#26292E] border border-[#3a3f47]' : 'bg-white'} shadow-2xl transform transition-all`}>
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Message Sent Successfully!
          </h3>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Thank you for contacting us. We&rsquo;ll get back to you within 24 hours.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-[#B39E7A] to-[#9d8a68] hover:from-[#9d8a68] hover:to-[#8a7759] text-white font-semibold py-3 rounded-xl transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
