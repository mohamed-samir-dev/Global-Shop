import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n';
import { LoginFormProps } from '../types';

interface LoginFormComponentProps extends LoginFormProps {
  formData: { email: string; password: string };
  showPassword: boolean;
  rememberMe: boolean;
  error?: string | object;
  onShowPasswordToggle: () => void;
  onRememberMeChange: (checked: boolean) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginForm = ({
  formData,
  showPassword,
  rememberMe,
  isLoading,
  error,
  onSubmit,
  onShowPasswordToggle,
  onRememberMeChange,
  onChange,
}: LoginFormComponentProps) => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          name="email"
          type="email"
          required
          className={`w-full px-4 py-3 rounded-md transition-colors ${
            isDarkMode 
              ? 'bg-[#373C40] text-white placeholder-gray-400 border border-gray-600' 
              : 'bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300'
          }`}
          placeholder={String(t('auth.login.emailPlaceholder'))}
          value={formData.email}
          onChange={onChange}
        />
      </div>
      
      <div className="relative">
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          required
          className={`w-full px-4 py-3 rounded-md transition-colors ${
            isDarkMode 
              ? 'bg-[#373C40] text-white placeholder-gray-400 border border-gray-600' 
              : 'bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300'
          }`}
          placeholder={String(t('auth.login.passwordPlaceholder'))}
          value={formData.password}
          onChange={onChange}
        />
        <button
          type="button"
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${
            isDarkMode 
              ? 'text-gray-400 hover:text-white' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={onShowPasswordToggle}
        >
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {error && (
        <div className={`text-sm text-center rounded-md px-3 py-2 ${
          isDarkMode 
            ? 'text-red-400 bg-red-900/20 border border-red-800/30' 
            : 'text-red-600 bg-red-50 border border-red-200'
        }`}>
          {(() => {
            const errorString = typeof error === 'string' ? error : 'An error occurred';
            return errorString.toLowerCase().includes('invalid') && (errorString.toLowerCase().includes('email') || errorString.toLowerCase().includes('password')) 
              ? String(t('auth.messages.invalidCredentials'))
              : errorString;
          })()}
        </div>
      )}
      
      <div className="flex items-center justify-start">
        <label className="flex items-center cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => onRememberMeChange(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-4 h-4 rounded border-2 transition-all duration-200 ${
              rememberMe 
                ? 'bg-[#C7AB6C] border-[#C7AB6C]' 
                : isDarkMode 
                  ? 'border-gray-400 group-hover:border-[#C7AB6C]' 
                  : 'border-gray-300 group-hover:border-[#C7AB6C]'
            }`}>
              {rememberMe && (
                <svg className="w-3 h-3 text-black absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          <span className={`text-sm ml-3 transition-colors ${
            isDarkMode 
              ? 'text-gray-300 group-hover:text-white' 
              : 'text-gray-600 group-hover:text-gray-800'
          }`}>{String(t('auth.login.rememberMe'))}</span>
        </label>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-[#C6A96D] cursor-pointer hover:bg-[#96753C] text-black font-medium rounded-full transition-colors disabled:opacity-50"
      >
        {isLoading ? String(t('auth.login.signingIn')) : String(t('auth.login.loginButton'))}
      </button>
    </form>
  );
};