'use client';

import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export default function DarkModeToggle({ isDarkMode, onToggle }: DarkModeToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className={`relative p-2 rounded-lg border cursor-pointer transition-all overflow-hidden group ${
        isDarkMode 
          ? 'border-gray-600 hover:border-gray-500' 
          : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
        animate={{
          backgroundColor: isDarkMode 
            ? 'rgba(59, 130, 246, 0.1)' 
            : 'rgba(251, 191, 36, 0.1)'
        }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div
        className="relative w-5 h-5"
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Sun Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: isDarkMode ? 0 : 1,
            scale: isDarkMode ? 0.3 : 1,
            rotate: isDarkMode ? 90 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <SunIcon className="w-5 h-5 text-yellow-500" />
        </motion.div>
        
        {/* Moon Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: isDarkMode ? 1 : 0,
            scale: isDarkMode ? 1 : 0.3,
            rotate: isDarkMode ? 0 : -90,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <MoonIcon className="w-5 h-5 text-blue-400" />
        </motion.div>
      </motion.div>
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 0, opacity: 0.5 }}
        whileTap={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(251, 191, 36, 0.3)'
        }}
      />
    </motion.button>
  );
}