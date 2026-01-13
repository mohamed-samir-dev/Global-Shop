import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const price = Number(item.product.finalPrice || item.product.basePrice) || 0;
    return total + (price * item.quantity);
  }, 0);
};

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload;
      console.log('cartSlice - addToCart action:', product.name, 'Quantity:', quantity);
      const existingItem = state.items.find(item => item.product._id === product._id);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity <= product.stock) {
          existingItem.quantity = newQuantity;
          console.log('cartSlice - Updated existing item quantity to:', existingItem.quantity);
        } else {
          existingItem.quantity = product.stock;
          console.log('cartSlice - Capped quantity at stock limit:', product.stock);
        }
      } else {
        const finalQuantity = Math.min(quantity, product.stock);
        state.items.push({ product, quantity: finalQuantity });
        console.log('cartSlice - Added new item with quantity:', finalQuantity);
      }
      
      state.total = calculateTotal(state.items);
      state.itemCount = calculateItemCount(state.items);
      console.log('cartSlice - New cart state - Items:', state.items.length, 'Total:', state.total, 'ItemCount:', state.itemCount);
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product._id !== action.payload);
      state.total = calculateTotal(state.items);
      state.itemCount = calculateItemCount(state.items);
    },
    
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product._id === productId);
      
      if (item && quantity > 0 && quantity <= item.product.stock) {
        item.quantity = quantity;
      }
      
      state.total = calculateTotal(state.items);
      state.itemCount = calculateItemCount(state.items);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;