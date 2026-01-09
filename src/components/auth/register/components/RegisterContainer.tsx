import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n';
import { RegisterForm } from './RegisterForm';
import { SocialLogin } from '../../login/components/SocialLogin';
import { useRegister } from '../hooks/useRegister';

export const RegisterContainer = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const { form, handleSubmit, isLoading } = useRegister();

  return (
    <div className={`min-h-screen flex items-center justify-center py-4 sm:py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0F1419]' : 'bg-gray-50'
    }`}>
      <div className="max-w-md sm:max-w-lg md:max-w-xl w-full">
        <div className={`p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl transition-colors duration-300 ${
          isDarkMode ? 'bg-[#26292E]' : 'bg-white'
        }`}>
          <h1 className={`text-2xl sm:text-3xl font-sans text-center mb-4 sm:mb-6 ${
            isDarkMode ? 'text-[#DDE2E5]' : 'text-gray-900'
          }`}>
            {String(t('auth.register.title'))}
          </h1>
          
          <RegisterForm
            form={form}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          
          <SocialLogin />
          
          <div className="mt-4 sm:mt-6 text-center">
            <Link href="/login" className={`text-sm cursor-pointer transition-colors ${
              isDarkMode 
                ? 'text-gray-400 hover:text-[#B5AC8B]' 
                : 'text-gray-600 hover:text-blue-600'
            }`}>
              {String(t('auth.register.haveAccount'))}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};