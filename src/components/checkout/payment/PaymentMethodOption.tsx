import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { PaymentMethodType } from './types';

interface PaymentMethodOptionProps {
  id: string;
  value: PaymentMethodType;
  selected: boolean;
  onSelect: (value: PaymentMethodType) => void;
  icon: React.ReactNode;
  title: string;
  badge?: string;
  badgeColor: string;
  description: string;
  features: string[];
  borderColor: string;
  bgColor: string;
}

export const PaymentMethodOption = ({
  id,
  value,
  selected,
  onSelect,
  icon,
  title,
  badge,
  badgeColor,
  description,
  features,
  borderColor,
  bgColor
}: PaymentMethodOptionProps) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`border-3 rounded-xl p-4 sm:p-5 cursor-pointer transition-all ${
        selected 
          ? `${borderColor} ${bgColor} shadow-lg`
          : (isDarkMode ? 'border-slate-600 hover:border-green-300' : 'border-gray-200 hover:border-green-300')
      }`}
      onClick={() => onSelect(value)}
    >
      <div className="flex items-start">
        <input
          type="radio"
          id={id}
          name="payment"
          value={value}
          checked={selected}
          onChange={(e) => onSelect(e.target.value as PaymentMethodType)}
          className="mt-1 mr-3 sm:mr-4"
        />
        <label htmlFor={id} className="flex-1 cursor-pointer">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className={`flex items-center font-bold text-base sm:text-lg ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {icon}
              {title}
            </div>
            {badge && (
              <span className={`text-xs sm:text-sm font-semibold ${badgeColor}`}>{badge}</span>
            )}
          </div>
          <p className={`text-xs sm:text-sm mt-2 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}>{description}</p>
          <div className="mt-3 space-y-1">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle2 className={`w-3 h-3 sm:w-4 sm:h-4 mr-2 ${badgeColor.replace('text-', 'text-')}`} />
                <span className={`text-xs ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-700'
                }`}>{feature}</span>
              </div>
            ))}
          </div>
        </label>
      </div>
    </motion.div>
  );
};
