import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n';
import { LoginForm } from './LoginForm';
import { SocialLogin } from './SocialLogin';
import { useLogin } from '../hooks/useLogin';

export const LoginContainer = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const {
    formData,
    isLoading: formLoading,
    showPassword,
    rememberMe,
    error,
    setShowPassword,
    setRememberMe,
    handleSubmit,
    handleChange,
  } = useLogin();

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0F1419]' : 'bg-gray-50'
    }`} suppressHydrationWarning>
      <div className="max-w-md sm:max-w-lg lg:max-w-4xl w-full mx-auto">
        <div className={`p-4 sm:p-6 rounded-lg shadow-2xl transition-colors duration-300 ${
          isDarkMode ? 'bg-[#26292E]' : 'bg-white'
        }`} suppressHydrationWarning>
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="hidden lg:block shrink-0 w-80">
              <Image
                src="/images/login-image.webp"
                alt={t('auth.login.imageAlt') as string}
                width={400}
                height={400}
                className="w-full h-80 object-cover rounded-lg"
                unoptimized
              />
            </div>
            <div className={`hidden lg:block w-px h-80 mx-4 ${
              isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
            }`}></div>
            <div className="w-full lg:w-80 py-4">
              <h1 className={`text-2xl sm:text-3xl font-sans text-center mb-6 sm:mb-8 ${
                isDarkMode ? 'text-[#DDE2E5]' : 'text-gray-900'
              }`}>
                {t('auth.login.title') as string}
              </h1>
              
              <LoginForm
                formData={formData}
                showPassword={showPassword}
                rememberMe={rememberMe}
                isLoading={formLoading}
                error={error}
                onSubmit={handleSubmit}
                onShowPasswordToggle={() => setShowPassword(!showPassword)}
                onRememberMeChange={setRememberMe}
                onChange={handleChange}
              />
              
              <SocialLogin />
              
              <div className="mt-4 sm:mt-6 text-center">
                <Link href="/register" className={`text-sm cursor-pointer transition-colors ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-[#B5AC8B]' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}>
                  {t('auth.login.noAccount') as string}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};