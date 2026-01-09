'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function Cart() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
        </div>
        
        {/* Empty Cart State */}
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <ShoppingCartIcon className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <a
            href="/products"
            className="inline-block bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
}