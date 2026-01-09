import { useMemo } from 'react';
import zxcvbn from 'zxcvbn';
import { useTranslation } from '@/i18n';
import { CheckCircleIcon, ExclamationTriangleIcon, LightBulbIcon } from '@heroicons/react/24/outline';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

export const PasswordStrengthIndicator = ({ password, className = '' }: PasswordStrengthIndicatorProps) => {
  const { t } = useTranslation();
  const analysis = useMemo(() => {
    if (!password) return null;
    return zxcvbn(password);
  }, [password]);

  if (!analysis) return null;

  const getStrengthColor = (score: number) => {
    switch (score) {
      case 0: return { text: 'text-red-500', bg: 'bg-red-500', border: 'border-red-200' };
      case 1: return { text: 'text-orange-500', bg: 'bg-orange-500', border: 'border-orange-200' };
      case 2: return { text: 'text-yellow-500', bg: 'bg-yellow-500', border: 'border-yellow-200' };
      case 3: return { text: 'text-blue-500', bg: 'bg-blue-500', border: 'border-blue-200' };
      case 4: return { text: 'text-green-500', bg: 'bg-green-500', border: 'border-green-200' };
      default: return { text: 'text-gray-400', bg: 'bg-gray-400', border: 'border-gray-200' };
    }
  };

  const getStrengthText = (score: number) => {
    switch (score) {
      case 0: return String(t('auth.register.veryWeak'));
      case 1: return String(t('auth.register.weak'));
      case 2: return String(t('auth.register.fair'));
      case 3: return String(t('auth.register.good'));
      case 4: return String(t('auth.register.strong'));
      default: return '';
    }
  };

  // Function to translate zxcvbn feedback messages
  const translateFeedback = (message: string) => {
    const feedbackMap: { [key: string]: string } = {
      // Warnings
      'Sequences like abc or 6543 are easy to guess': String(t('auth.register.passwordFeedback.warnings.straightRow')),
      'Short keyboard patterns are easy to guess': String(t('auth.register.passwordFeedback.warnings.keyboardPattern')),
      'Repeats like "aaa" are easy to guess': String(t('auth.register.passwordFeedback.warnings.simpleRepeat')),
      'Repeated patterns like "abcabcabc" are only slightly harder to guess': String(t('auth.register.passwordFeedback.warnings.extendedRepeat')),
      'This is a top-10 common password': String(t('auth.register.passwordFeedback.warnings.topTen')),
      'This is a top-100 common password': String(t('auth.register.passwordFeedback.warnings.topHundred')),
      'This is a common password': String(t('auth.register.passwordFeedback.warnings.common')),
      'This is similar to a commonly used password': String(t('auth.register.passwordFeedback.warnings.similarToCommon')),
      'A word by itself is easy to guess': String(t('auth.register.passwordFeedback.warnings.wordByItself')),
      'Names and surnames by themselves are easy to guess': String(t('auth.register.passwordFeedback.warnings.namesByThemselves')),
      'Common names and surnames are easy to guess': String(t('auth.register.passwordFeedback.warnings.commonNames')),
      'Recent years are easy to guess': String(t('auth.register.passwordFeedback.warnings.recentYears')),
      'Dates are often easy to guess': String(t('auth.register.passwordFeedback.warnings.dates')),
      'Your password was exposed by a data breach on the Internet': String(t('auth.register.passwordFeedback.warnings.pwned')),
      
      // Suggestions
      'Add another word or two. Uncommon words are better.': String(t('auth.register.passwordFeedback.suggestions.anotherWord')),
      'Avoid sequences': String(t('auth.register.passwordFeedback.suggestions.sequences')),
      'Avoid predictable letter substitutions like "@" for "a"': String(t('auth.register.passwordFeedback.suggestions.l33t')),
      'Avoid reversed spellings of common words': String(t('auth.register.passwordFeedback.suggestions.reverseWords')),
      'Use a mix of uppercase and lowercase letters, not all uppercase': String(t('auth.register.passwordFeedback.suggestions.allUppercase')),
      'Capitalize some, but not all letters': String(t('auth.register.passwordFeedback.suggestions.capitalization')),
      'Avoid dates and years that are associated with you': String(t('auth.register.passwordFeedback.suggestions.dates')),
      'Avoid recent years': String(t('auth.register.passwordFeedback.suggestions.recentYears')),
      'Avoid years that are associated with you': String(t('auth.register.passwordFeedback.suggestions.associatedYears')),
      'Avoid repeated words and characters': String(t('auth.register.passwordFeedback.suggestions.repeated')),
      'Use a longer keyboard pattern with more turns': String(t('auth.register.passwordFeedback.suggestions.longerKeyboardPattern')),
      'Use multiple words, avoid common phrases': String(t('auth.register.passwordFeedback.suggestions.useWords')),
      'You can create strong passwords without using symbols, numbers, or uppercase letters': String(t('auth.register.passwordFeedback.suggestions.noNeed')),
      'If you use this password elsewhere, you should change it': String(t('auth.register.passwordFeedback.suggestions.pwned'))
    };

    return feedbackMap[message] || message;
  };

  const colors = getStrengthColor(analysis.score);
  const strengthText = getStrengthText(analysis.score);
  const isStrong = analysis.score >= 3;

  return (
    <div className={`mt-2 sm:mt-3 ${className}`}>
      {/* Strength Indicator */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <span className="text-xs sm:text-sm font-medium text-gray-300">
            {String(t('auth.register.passwordStrength'))}
          </span>
          <div className="flex items-center space-x-1 sm:space-x-2">
            {isStrong && <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />}
            <span className={`text-xs sm:text-sm font-semibold ${colors.text}`}>
              {strengthText}
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="flex space-x-1 mb-2 sm:mb-3">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`h-1.5 sm:h-2 flex-1 rounded-full transition-all duration-500 ease-out ${
                level <= analysis.score 
                  ? `${colors.bg} shadow-sm` 
                  : 'bg-gray-700'
              }`}
            />
          ))}
        </div>

        {/* Feedback Messages */}
        {(analysis.feedback.warning || analysis.feedback.suggestions.length > 0) && (
          <div className="space-y-2">
            {analysis.feedback.warning && (
              <div className={`flex items-start space-x-2 p-2 sm:p-3 rounded-md sm:rounded-lg bg-orange-500/10 ${colors.border} border`}>
                <ExclamationTriangleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-black mt-0.5 shrink-0" />
                <p className="text-xs sm:text-sm text-black leading-relaxed">
                  {translateFeedback(analysis.feedback.warning)}
                </p>
              </div>
            )}
            
            {analysis.feedback.suggestions.length > 0 && (
              <div className="space-y-2">
                {analysis.feedback.suggestions.slice(0, 2).map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 sm:p-3 rounded-md sm:rounded-lg bg-blue-500/10 border border-blue-200/20">
                    <LightBulbIcon className="w-3 h-3 sm:w-4 sm:h-4 text-black mt-0.5 shrink-0" />
                    <p className="text-xs sm:text-sm text-black leading-relaxed">
                      {translateFeedback(suggestion)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};