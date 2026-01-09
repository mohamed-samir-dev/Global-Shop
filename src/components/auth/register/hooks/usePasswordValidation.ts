import { useMemo } from 'react';
import zxcvbn from 'zxcvbn';

export const usePasswordValidation = (password: string, confirmPassword: string) => {
  const validation = useMemo(() => {
    if (!password) {
      return {
        canSubmit: false,
        isStrongPassword: false,
      };
    }

    // Check password strength using zxcvbn
    const strengthAnalysis = zxcvbn(password);
    const isGoodPassword = strengthAnalysis.score >= 2; // Fair or better
    
    // Check if passwords match
    const passwordsMatch = password && confirmPassword && password === confirmPassword;
    
    // Can submit if password is good and passwords match
    const canSubmit = isGoodPassword && passwordsMatch;
    
    return {
      canSubmit,
      isStrongPassword: strengthAnalysis.score >= 3,
    };
  }, [password, confirmPassword]);

  return validation;
};