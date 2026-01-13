'use client';

import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface CheckoutProps {
  onLoginRequired?: () => void;
}

const CheckoutButton: React.FC<CheckoutProps> = ({ onLoginRequired }) => {
  const { proceedToCheckout, isLoading, total, itemCount } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = async () => {
    if (itemCount === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const result = await proceedToCheckout();

    if (result.requiresLogin) {
      // Guest user needs to login
      if (onLoginRequired) {
        onLoginRequired();
      } else {
        router.push('/login?redirect=checkout');
      }
      return;
    }

    if (!result.isValid) {
      // Show validation errors
      if (result.errors && result.errors.length > 0) {
        result.errors.forEach((error: { error?: string }) => {
          toast.error(error.error || 'Cart validation failed');
        });
      }
      return;
    }

    // Proceed to checkout page
    router.push('/checkout');
  };

  const isDisabled = isLoading || itemCount === 0;

  return (
    <div className="checkout-section">
      {!user && itemCount > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-blue-800 text-sm">
            🔒 You need to login to proceed to checkout
          </p>
        </div>
      )}
      
      {isLoading && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-green-800 text-sm">
            🔄 Loading your cart...
          </p>
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={isDisabled}
        className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
          isDisabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          `Checkout ($${total.toFixed(2)})`
        )}
      </button>
      
      {itemCount > 0 && (
        <p className="text-sm text-gray-600 mt-2 text-center">
          {itemCount} item{itemCount !== 1 ? 's' : ''} in cart
        </p>
      )}
    </div>
  );
};

export default CheckoutButton;