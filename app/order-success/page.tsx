import { Suspense } from 'react';
import OrderSuccessContent from './OrderSuccessContent';

const OrderSuccessPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
};

export default OrderSuccessPage;