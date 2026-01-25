'use client';

import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/i18n/hooks/useTranslation';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/context/AuthContext';
import CartHeader from './components/CartHeader';
import EmptyCart from './components/EmptyCart';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';

export default function Cart() {
  const { isDarkMode } = useTheme();
  const { isArabic } = useTranslation();
  const { items, total, itemCount, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId, productName);
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const subtotal = total;
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + shipping + tax;
  
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + (shipping === 0 ? 2 : 5));
  
  const deliveryDateStr = estimatedDelivery.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className={`min-h-screen py-6 ${
      isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
    }`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CartHeader 
          isDarkMode={isDarkMode}
          isArabic={isArabic}
          itemCount={itemCount}
          total={total}
          subtotal={subtotal}
        />
        
        {items.length === 0 ? (
          <EmptyCart isDarkMode={isDarkMode} isArabic={isArabic} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.product._id}
                  item={item}
                  isDarkMode={isDarkMode}
                  isArabic={isArabic}
                  onRemove={handleRemoveItem}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))}
            </div>
            <OrderSummary
              isDarkMode={isDarkMode}
              isArabic={isArabic}
              itemCount={itemCount}
              itemsLength={items.length}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              finalTotal={finalTotal}
              deliveryDateStr={deliveryDateStr}
              user={user}
              onClearCart={handleClearCart}
            />
          </div>
        )}
      </div>
    </div>
  );
}
