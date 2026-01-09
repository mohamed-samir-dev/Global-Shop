import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n';

interface PasswordRequirementsProps {
  password: string;
  confirmPassword: string;
  className?: string;
}

interface Requirement {
  labelKey: string;
  test: (password: string) => boolean;
  icon: 'check' | 'x';
}

export const PasswordRequirements = ({ password, confirmPassword, className = '' }: PasswordRequirementsProps) => {
  const { t } = useTranslation();
  
  const requirements: Requirement[] = [
    {
      labelKey: 'auth.passwordRequirements.atLeast8',
      test: (pwd) => pwd.length >= 8,
      icon: password.length >= 8 ? 'check' : 'x'
    },
    {
      labelKey: 'auth.passwordRequirements.uppercase',
      test: (pwd) => /[A-Z]/.test(pwd),
      icon: /[A-Z]/.test(password) ? 'check' : 'x'
    },
    {
      labelKey: 'auth.passwordRequirements.lowercase',
      test: (pwd) => /[a-z]/.test(pwd),
      icon: /[a-z]/.test(password) ? 'check' : 'x'
    },
    {
      labelKey: 'auth.passwordRequirements.number',
      test: (pwd) => /\d/.test(pwd),
      icon: /\d/.test(password) ? 'check' : 'x'
    },
    {
      labelKey: 'auth.passwordRequirements.specialChar',
      test: (pwd) => /[!@#$%^&*(),.?\":{}|<>]/.test(pwd),
      icon: /[!@#$%^&*(),.?\":{}|<>]/.test(password) ? 'check' : 'x'
    }
  ];

  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const passwordsDontMatch = password && confirmPassword && password !== confirmPassword;

  return (
    <div className={`mt-2 sm:mt-3 p-2 sm:p-3 bg-[#2A2F33] rounded-md sm:rounded-lg border border-gray-600 ${className}`}>
      <h4 className="text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">{String(t('auth.passwordRequirements.title'))}</h4>
      
      <div className="space-y-1 sm:space-y-1.5">
        {requirements.map((req, index) => {
          const isValid = req.test(password);
          return (
            <div key={index} className="flex items-center space-x-1.5 sm:space-x-2">
              <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center ${
                isValid ? 'bg-green-500' : 'bg-gray-600'
              }`}>
                {isValid ? (
                  <CheckIcon className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
                ) : (
                  <XMarkIcon className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-gray-400" />
                )}
              </div>
              <span className={`text-xs ${isValid ? 'text-green-400' : 'text-gray-400'}`}>
                {String(t(req.labelKey))}
              </span>
            </div>
          );
        })}
        
        {/* Password Match Indicator */}
        {(password || confirmPassword) && (
          <div className="flex items-center space-x-1.5 sm:space-x-2 pt-1 border-t border-gray-700">
            <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center ${
              passwordsMatch ? 'bg-green-500' : passwordsDontMatch ? 'bg-red-500' : 'bg-gray-600'
            }`}>
              {passwordsMatch ? (
                <CheckIcon className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
              ) : (
                <XMarkIcon className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" />
              )}
            </div>
            <span className={`text-xs ${
              passwordsMatch ? 'text-green-400' : passwordsDontMatch ? 'text-red-400' : 'text-gray-400'
            }`}>
              {String(t('auth.passwordRequirements.passwordsMatch'))}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};