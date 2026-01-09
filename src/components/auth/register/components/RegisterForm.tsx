import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n';
import { RegisterFormData } from '../types';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { usePasswordValidation } from '../hooks/usePasswordValidation';

interface RegisterFormProps {
  form: UseFormReturn<RegisterFormData>;
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isLoading: boolean;
}

export const RegisterForm = ({ form, onSubmit, isLoading }: RegisterFormProps) => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch } = form;
  const watchedPassword = watch('password', '');
  const watchedConfirmPassword = watch('confirmPassword', '');
  
  const { canSubmit } = usePasswordValidation(watchedPassword, watchedConfirmPassword);

  const inputClasses = `w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-md transition-colors ${
    isDarkMode 
      ? 'bg-[#373C40] text-white placeholder-gray-400 border border-gray-600' 
      : 'bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300'
  }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <input
            {...register('firstName')}
            className={inputClasses}
            placeholder={String(t('auth.register.firstNamePlaceholder'))}
          />
          {errors.firstName && (
            <p className={`text-xs mt-1 ${
              isDarkMode ? 'text-red-400' : 'text-red-600'
            }`}>{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <input
            {...register('lastName')}
            className={inputClasses}
            placeholder={String(t('auth.register.lastNamePlaceholder'))}
          />
          {errors.lastName && (
            <p className={`text-xs mt-1 ${
              isDarkMode ? 'text-red-400' : 'text-red-600'
            }`}>{errors.lastName.message}</p>
          )}
        </div>
      </div>
      
      <div>
        <input
          {...register('email')}
          type="email"
          className={inputClasses}
          placeholder={String(t('auth.register.emailPlaceholder'))}
        />
        {errors.email && (
          <p className={`text-xs mt-1 ${
            isDarkMode ? 'text-red-400' : 'text-red-600'
          }`}>{errors.email.message}</p>
        )}
      </div>
      
      <div>
        <input
          {...register('phone')}
          type="tel"
          className={inputClasses}
          placeholder={String(t('auth.register.phonePlaceholder'))}
        />
        {errors.phone && (
          <p className={`text-xs mt-1 ${
            isDarkMode ? 'text-red-400' : 'text-red-600'
          }`}>{errors.phone.message}</p>
        )}
      </div>
      
      <div>
        <input
          {...register('dateOfBirth')}
          type="date"
          className={inputClasses}
        />
        {errors.dateOfBirth && (
          <p className={`text-xs mt-1 ${
            isDarkMode ? 'text-red-400' : 'text-red-600'
          }`}>{errors.dateOfBirth.message}</p>
        )}
      </div>
      
      <div>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            className={`w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-2 sm:py-2.5 text-sm sm:text-base rounded-md border-2 transition-all duration-300 focus:outline-none ${
              isDarkMode 
                ? 'bg-[#373C40] text-white placeholder-gray-400' 
                : 'bg-gray-50 text-gray-900 placeholder-gray-500'
            } ${
              watchedPassword && watchedConfirmPassword && watchedPassword === watchedConfirmPassword
                ? 'border-green-500 focus:border-green-400'
                : watchedPassword && watchedConfirmPassword && watchedPassword !== watchedConfirmPassword
                ? 'border-red-500 focus:border-red-400'
                : 'border-transparent focus:border-[#C7AB6C]'
            }`}
            placeholder={String(t('auth.register.passwordPlaceholder'))}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
            onDrag={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
            autoComplete="new-password"
          />
          <button
            type="button"
            className={`absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 z-10 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-white' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5" /> : <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
        {errors.password && (
          <p className={`text-xs mt-1 animate-pulse ${
            isDarkMode ? 'text-red-400' : 'text-red-600'
          }`}>{errors.password.message}</p>
        )}
        
        {watchedPassword && (
          <PasswordStrengthIndicator password={watchedPassword} />
        )}
      </div>
      
      <div className="relative">
        <input
          {...register('confirmPassword')}
          type={showConfirmPassword ? 'text' : 'password'}
          className={`w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-2 sm:py-2.5 text-sm sm:text-base rounded-md border-2 transition-colors ${
            isDarkMode 
              ? 'bg-[#373C40] text-white placeholder-gray-400' 
              : 'bg-gray-50 text-gray-900 placeholder-gray-500'
          } ${
            watchedPassword && watchedConfirmPassword && watchedPassword === watchedConfirmPassword
              ? 'border-green-500 focus:border-green-400'
              : watchedPassword && watchedConfirmPassword && watchedPassword !== watchedConfirmPassword
              ? 'border-red-500 focus:border-red-400'
              : 'border-transparent focus:border-[#C7AB6C]'
          }`}
          placeholder={String(t('auth.register.confirmPasswordPlaceholder'))}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
          onDrag={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
          autoComplete="new-password"
        />
        <button
          type="button"
          className={`absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 z-10 ${
            isDarkMode 
              ? 'text-gray-400 hover:text-white' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5" /> : <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
        </button>
        {errors.confirmPassword && (
          <p className={`text-xs mt-1 ${
            isDarkMode ? 'text-red-400' : 'text-red-600'
          }`}>{errors.confirmPassword.message}</p>
        )}
      </div>
      
      <div className="flex items-start space-x-2 sm:space-x-3">
        <input
          {...register('agreeToTerms')}
          type="checkbox"
          className={`mt-0.5 sm:mt-1 w-4 h-4 text-[#C7AB6C] rounded focus:ring-[#C7AB6C] shrink-0 ${
            isDarkMode 
              ? 'bg-[#373C40] border-gray-600' 
              : 'bg-gray-50 border-gray-300'
          }`}
        />
        <label className={`text-xs sm:text-sm leading-relaxed ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {String(t('auth.register.agreeToTerms')).split(' ').slice(0, -4).join(' ')} <span className="text-[#C7AB6C] cursor-pointer hover:underline">{String(t('auth.register.termsOfService'))}</span> {String(t('auth.register.agreeToTerms')).includes('and') ? 'و' : 'and'} <span className="text-[#C7AB6C] cursor-pointer hover:underline">{String(t('auth.register.privacyPolicy'))}</span>
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className={`text-xs ${
          isDarkMode ? 'text-red-400' : 'text-red-600'
        }`}>{errors.agreeToTerms.message}</p>
      )}
      
      <button
        type="submit"
        disabled={isLoading || !canSubmit}
        className={`w-full py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-full transition-all duration-300 ${
          canSubmit && !isLoading
            ? 'bg-[#C7AB6C] hover:bg-[#96753C] text-black cursor-pointer transform hover:scale-[1.02]'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        } disabled:opacity-50`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            <span>{String(t('auth.register.creatingAccount'))}</span>
          </div>
        ) : (
          String(t('auth.register.createAccountButton'))
        )}
      </button>
    </form>
  );
};